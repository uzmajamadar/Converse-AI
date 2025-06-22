'use server'
import nodemailer from 'nodemailer'

export const onMailer = async (email: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODE_MAILER_EMAIL,
      pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
    },
  })

  const mailOptions = {
    to: email,
    subject: 'Realtime Support',
    text: 'One of your customers on Converse, just switched to realtime mode',
  }

  try {
    const info = await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(error)
        } else {
          resolve(info)
        }
      })
    })
    console.log('Email sent: ' + (info as any).response)
  } catch (error) {
    console.log(error)
  }
}
