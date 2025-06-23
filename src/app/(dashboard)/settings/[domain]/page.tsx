import type { Metadata } from 'next'
import { getUserAppointments } from '@/actions/appointment'
import {
  getUserClients,
  getUserBalance,
  getUserPlanInfo,
  getUserTransactions,
  getUserTotalProductPrices,
} from '@/actions/dashboard'

import DashboardCard from '@/components/dashboard/cards'
import { PlanUsage } from '@/components/dashboard/plan-usage'
import InfoBar from '@/components/infobar'
import { Separator } from '@/components/ui/separator'
import CalIcon from '@/icons/cal-icon'
import PersonIcon from '@/icons/person-icon'
import { TransactionsIcon } from '@/icons/transactions-icon'
import { DollarSign } from 'lucide-react'

// import type { PageProps } from 'next/app' // Not needed for minimal fix
// import type { Transaction } from '@/actions/dashboard' // Not exported, define locally

// Define your specific params type
interface Params {
  domain: string
}

// Define Transaction type locally (since '@/actions/dashboard' does not export it)
interface Transaction {
  id: string;
  calculated_statement_descriptor?: string;
  amount: number;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return {
    title: `Settings | ${params.domain}`,
    description: `Manage dashboard settings for ${params.domain}`,
  }
}

export default async function DomainSettingsPage({ params }: { params: Params }) {
  const { domain } = params

  // Parallel data fetching
  const [
    clients,
    sales,
    bookings,
    plan,
    transactions,
    products
  ] = await Promise.all([
    getUserClients(),
    getUserBalance(),
    getUserAppointments(),
    getUserPlanInfo(),
    getUserTransactions(),
    getUserTotalProductPrices(),
  ])

  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0">
        <div className="flex gap-5 flex-wrap">
          <DashboardCard
            value={clients || 0}
            title="Potential Clients"
            icon={<PersonIcon />}
          />
          <DashboardCard
            value={(products || 0) * (clients || 0)}
            sales
            title="Pipeline Value"
            icon={<DollarSign />}
          />
          <DashboardCard
            value={bookings || 0}
            title="Appointments"
            icon={<CalIcon />}
          />
          <DashboardCard
            value={sales || 0}
            sales
            title="Total Sales"
            icon={<DollarSign />}
          />
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 py-10">
          <div>
            <h2 className="font-bold text-2xl">Plan Usage</h2>
            <p className="text-sm font-light">
              A detailed overview of your metrics, usage, customers and more
            </p>
            <PlanUsage
              plan={plan?.plan || 'free'}
              credits={plan?.credits || 0}
              domains={plan?.domains || 0}
              clients={clients || 0}
            />
          </div>

          <div className="flex flex-col">
            <div className="w-full flex justify-between items-start mb-5">
              <div className="flex gap-3 items-center">
                <TransactionsIcon />
                <p className="font-bold">Recent Transactions</p>
              </div>
              <p className="text-sm">See more</p>
            </div>
            <Separator orientation="horizontal" />
            {transactions?.data?.map((transaction: Transaction) => (
              <div
                key={transaction.id}
                className="flex gap-3 w-full justify-between items-center border-b-2 py-5"
              >
                <p className="font-bold">
                  {transaction.calculated_statement_descriptor || 'Unknown transaction'}
                </p>
                <p className="font-bold text-xl">
                  ${(transaction.amount / 100).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}