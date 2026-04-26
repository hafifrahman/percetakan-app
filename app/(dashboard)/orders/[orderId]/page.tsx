import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import type { Metadata } from 'next'

import { getOrderQueryOptions } from '@/features/orders/api/get-order'

import { Order } from './_components/order'

export const metadata: Metadata = {
  title: 'Pesanan',
  description: 'Lihat Pesanan',
}

const preloadData = async (orderId: string) => {
  const queryClient = new QueryClient()

  await Promise.all([queryClient.prefetchQuery(getOrderQueryOptions(orderId))])

  const dehydratedState = dehydrate(queryClient)

  return {
    dehydratedState,
    queryClient,
  }
}

const OrderPage = async ({
  params,
}: {
  params: Promise<{ orderId: string }>
}) => {
  const orderId = (await params).orderId

  const { dehydratedState, queryClient } = await preloadData(orderId)

  const order = queryClient.getQueryData(getOrderQueryOptions(orderId).queryKey)

  if (!order?.data) return <div>Pesanan tidak ditemukan</div>

  return (
    <HydrationBoundary state={dehydratedState}>
      <Order orderId={orderId} />
    </HydrationBoundary>
  )
}

export default OrderPage
