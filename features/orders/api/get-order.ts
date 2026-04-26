import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api-client'
import type { QueryConfig } from '@/lib/react-query'
import type { Order } from '@/types/api'

export const getOrder = ({
  orderId,
}: {
  orderId: string
}): Promise<{ data: Order }> => {
  return api.get(`/orders/${orderId}`)
}

export const getOrderQueryOptions = (orderId: string) => {
  return queryOptions({
    queryKey: ['orders', orderId],
    queryFn: () => getOrder({ orderId }),
  })
}

type UseOrderOptions = {
  orderId: string
  queryConfig?: QueryConfig<typeof getOrderQueryOptions>
}

export const useOrder = ({ orderId, queryConfig }: UseOrderOptions) => {
  return useQuery({
    ...getOrderQueryOptions(orderId),
    ...queryConfig,
  })
}
