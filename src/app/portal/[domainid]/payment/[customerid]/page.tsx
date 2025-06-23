import {
  onDomainCustomerResponses,
} from '@/actions/appointment'
import { onGetDomainProductsAndConnectedAccountId } from '@/actions/payments'
import PortalForm from '@/components/forms/portal/portal-form'
import React from 'react'

type PagePropsWithParams<T> = {
  params: Promise<T>
}

export default async function CustomerPaymentPage({
  params,
}: PagePropsWithParams<{ domainid: string; customerid: string }>) {
  const { domainid, customerid } = await params

  const questions = await onDomainCustomerResponses(customerid)
  const products = await onGetDomainProductsAndConnectedAccountId(domainid)

  if (!questions) return null

  return (
    <PortalForm
      email={questions.email!}
      products={products?.products}
      amount={products?.amount}
      domainid={domainid}
      customerId={customerid}
      questions={questions.questions}
      stripeId={products?.stripeId!}
      type="Payment"
    />
  )
}



