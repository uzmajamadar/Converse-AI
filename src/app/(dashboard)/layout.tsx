import { onLoginUser } from '@/actions/auth'
import DashboardShell from './dashboard-shell'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const OwnerLayout = async ({ children }: Props) => {
  const authenticated = await onLoginUser()
  if (!authenticated) return null

  return <DashboardShell domains={authenticated.domain}>{children}</DashboardShell>
}

export default OwnerLayout
