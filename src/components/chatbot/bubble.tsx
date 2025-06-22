import React from 'react'
import { cn, extractUUIDFromString, getMonthName } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  message: {
    role: 'assistant' | 'user'
    content: string
    link?: string
  }
  createdAt?: Date
}

const Bubble = ({ message, createdAt }: Props) => {
  let d = new Date()
  const image = extractUUIDFromString(message.content)
  console.log(message.link)

  return (
    <div
      className={cn(
        'flex gap-2 items-end',
        message.role == 'assistant' ? 'self-start' : 'self-end flex-row-reverse'
      )}
    >
      {message.role == 'assistant' ? (
        <Avatar className="w-5 h-5">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className="w-5 h-5">
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'flex flex-col gap-3 min-w-[200px] max-w-[300px] p-4 rounded-t-md',
          message.role == 'assistant'
            ? 'bg-muted rounded-r-md'
            : 'bg-grandis rounded-l-md'
        )}
      >
        {createdAt ? (
          <div className="flex gap-2 text-xs text-gray-600">
            <p>
              {(() => {
                const dateObj = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
                return `${dateObj.getDate()} ${getMonthName(dateObj.getMonth())}`;
              })()}
            </p>
            <p>
              {(() => {
                const dateObj = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
                return `${dateObj.getHours()}:${dateObj.getMinutes()}${dateObj.getHours() > 12 ? 'PM' : 'AM'}`;
              })()}
            </p>
          </div>
        ) : (
          <p className="text-xs">
            {`${d.getHours()}:${d.getMinutes()} ${
              d.getHours() > 12 ? 'pm' : 'am'
            }`}
          </p>
        )}
        {image ? (
          <div className="relative aspect-square" style={{ width: '100%', height: 'auto' }}>
            <Image
              src={`https://ucarecdn.com/${image[0]}/`}
              fill
              alt="image"
              style={{ width: 'auto', height: 'auto', objectFit: 'contain' }}
            />
          </div>
        ) : (
          <p className={cn('text-sm', message.role === 'user' ? 'text-black' : '')}>
            {message.content.replace('(complete)', ' ')}
            {message.link && (
              <Link
                className="underline font-bold pl-2"
                href={message.link}
                target="_blank"
              >
                Your Link
              </Link>
            )}
          </p>
        )}
      </div>
    </div>
  )
}

export default Bubble
