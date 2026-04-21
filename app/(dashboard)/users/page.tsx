import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import type { Metadata } from 'next'

import { getOrdersQueryOptions } from '@/features/orders/api/get-orders'

import { Users } from './_components/users'

export const metadata: Metadata = {
  title: 'Pengguna',
  description: 'Halaman Pengguna',
}

const UsersPage = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(getOrdersQueryOptions())
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <Users />
    </HydrationBoundary>
  )
}

export default UsersPage
