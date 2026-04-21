import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import type { Metadata } from 'next'

import { getOrdersQueryOptions } from '@/features/orders/api/get-orders'

import { Orders } from './_components/orders'

export const metadata: Metadata = {
  title: 'Pesanan',
  description: 'Halaman Pesanan',
}

const OrdersPage = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(getOrdersQueryOptions())
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <Orders />
    </HydrationBoundary>
  )
}

export default OrdersPage
