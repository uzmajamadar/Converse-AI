'use client'
import React, { useMemo } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'

type Props = {
  onOpen: JSX.Element
  children: React.ReactNode
  title: string
  description: string
}

const AppDrawer = ({ children, description, onOpen, title }: Props) => {
  // Memoize the trigger element to avoid hydration mismatch
  const trigger = useMemo(() => onOpen, [onOpen])
  return (
    <Drawer>
      <DrawerTrigger>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className="container flex flex-col items-center gap-2 pb-10">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default AppDrawer
