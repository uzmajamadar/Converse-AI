'use server'

import { client } from '@/lib/prisma'
import { extractEmailsFromString, extractURLfromString } from '@/lib/utils'
import { onRealTimeChat } from '../conversation'
import { clerkClient } from '@clerk/nextjs'
import { onMailer } from '../mailer'
import OpenAi from 'openai'
import fetch from 'node-fetch'
// Import Google Generative AI SDK
import { GoogleGenerativeAI } from '@google/generative-ai'

const openai = new OpenAi({
  apiKey: process.env.OPEN_AI_KEY,
})

// Gemini chat helper using @google/generative-ai
export const onStoreConversations = async (
  id: string,
  message: string,
  role: 'assistant' | 'user'
) => {
  await client.chatRoom.update({
    where: {
      id,
    },
    data: {
      message: {
        create: {
          message,
          role,
        },
      },
    },
  })
}

export const onGetCurrentChatBot = async (id: string) => {
  try {
    const chatbot = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        helpdesk: true,
        name: true,
        chatBot: {
          select: {
            id: true,
            welcomeMessage: true,
            icon: true,
            textColor: true,
            background: true,
            helpdesk: true,
          },
        },
      },
    })

    if (chatbot) {
      return chatbot
    }
  } catch (error) {
    console.log(error)
  }
}

let customerEmail: string | undefined

export const onAiChatBotAssistant = async (
  id: string,
  chat: { role: 'assistant' | 'user'; content: string }[],
  author: 'user',
  message: string
) => {
  try {
    const chatBotDomain = await client.domain.findUnique({
      where: { id },
      select: {
        name: true,
        filterQuestions: { where: { answered: null }, select: { question: true } },
      },
    })
    if (!chatBotDomain) throw new Error('No chatbot domain found');

    const extractedEmail = extractEmailsFromString(message)
    if (extractedEmail) customerEmail = extractedEmail[0]

    let chatRoomId: string | undefined = undefined;
    let customerId: string | undefined = undefined;

    if (customerEmail) {
      const checkCustomer = await client.domain.findUnique({
        where: { id },
        select: {
          User: { select: { clerkId: true } },
          name: true,
          customer: {
            where: { email: { startsWith: customerEmail } },
            select: {
              id: true,
              email: true,
              questions: true,
              chatRoom: { select: { id: true, live: true, mailed: true } },
            },
          },
        },
      })
      if (checkCustomer && !checkCustomer.customer.length) {
        const newCustomer = await client.domain.update({
          where: { id },
          data: {
            customer: {
              create: {
                email: customerEmail,
                questions: { create: chatBotDomain.filterQuestions },
                chatRoom: { create: {} },
              },
            },
          },
        })
        if (newCustomer) {
          console.log('new customer made')
          const response = {
            role: 'assistant',
            content: `Welcome aboard ${customerEmail.split('@')[0]}! I'm glad to connect with you. Is there anything you need help with?`,
          }
          return { response }
        }
      }
      if (checkCustomer && checkCustomer.customer[0].chatRoom[0].live) {
        await onStoreConversations(
          checkCustomer?.customer[0].chatRoom[0].id!,
          message,
          author
        )
        onRealTimeChat(
          checkCustomer.customer[0].chatRoom[0].id,
          message,
          'user',
          author
        )
        if (!checkCustomer.customer[0].chatRoom[0].mailed) {
          const user = await clerkClient.users.getUser(
            checkCustomer.User?.clerkId!
          )
          onMailer(user.emailAddresses[0].emailAddress)
          await client.chatRoom.update({
            where: { id: checkCustomer.customer[0].chatRoom[0].id },
            data: { mailed: true },
          })
        }
        return {
          live: true,
          chatRoom: checkCustomer.customer[0].chatRoom[0].id,
        }
      }
      // Set chatRoomId for storing conversation below
      chatRoomId = checkCustomer?.customer[0].chatRoom[0].id;
      customerId = checkCustomer?.customer[0].id;
      await onStoreConversations(chatRoomId!, message, author);
    }

    // Always generate a Gemini response and store it if possible
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY not set');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const history = [
      {
        role: 'user',
        parts: [{
          text: `You will get an array of questions that you must ask the customer.\n\nProgress the conversation using those questions.\n\nWhenever you ask a question from the array i need you to add a keyword at the end of the question (complete) this keyword is extremely important.\n\nDo not forget it.\n\nonly add this keyword when your asking a question from the array of questions. No other question satisfies this condition\n\nAlways maintain character and stay respectfull.\n\nThe array of questions : [${chatBotDomain.filterQuestions.map((questions: { question: string }) => questions.question).join(', ')}]\n\nif the customer says something out of context or inapporpriate. Simply say this is beyond you and you will get a real user to continue the conversation. And add a keyword (realtime) at the end.\n\nif the customer agrees to book an appointment send them this link http://localhost:3000/portal/${id}/appointment/${customerId || 'unknown'}\n\nif the customer wants to buy a product redirect them to the payment page http://localhost:3000/portal/${id}/payment/${customerId || 'unknown'}`
        }]
      },
      ...chat.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
      { role: 'user', parts: [{ text: message }] }
    ];
    const result = await model.generateContent({ contents: history });
    const geminiContent = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Store Gemini response if chatRoomId is available
    if (chatRoomId) {
      await onStoreConversations(chatRoomId, geminiContent, 'assistant');
    }

    // Always return a response
    return {
      response: {
        role: 'assistant',
        content: geminiContent,
      }
    }
  } catch (error) {
    console.log('Chatbot error:', error)
    return {
      response: {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again later.'
      }
    }
  }
}
