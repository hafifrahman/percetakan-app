import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import type { Metadata } from 'next'

import { getUserQueryOptions } from '@/features/users/api/get-user'

import { User } from './_components/user'

export const metadata: Metadata = {
  title: 'Pengguna',
  description: 'Lihat Pengguna',
}

const preloadData = async (userId: string) => {
  const queryClient = new QueryClient()

  await Promise.all([queryClient.prefetchQuery(getUserQueryOptions(userId))])

  const dehydratedState = dehydrate(queryClient)

  return {
    dehydratedState,
    queryClient,
  }
}

const UserPage = async ({
  params,
}: {
  params: Promise<{
    userId: string
  }>
}) => {
  const userId = (await params).userId

  const { dehydratedState, queryClient } = await preloadData(userId)

  const user = queryClient.getQueryData(getUserQueryOptions(userId).queryKey)

  if (!user?.data) return <div>Pengguna tidak ditemukan</div>

  return (
    <HydrationBoundary state={dehydratedState}>
      <User userId={userId} />
    </HydrationBoundary>
  )
}

export default UserPage
