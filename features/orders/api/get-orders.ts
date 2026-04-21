import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api-client'
import type { QueryConfig } from '@/lib/react-query'
import type { Order } from '@/types/api'

export const getOrders = (): Promise<{ data: Order[] }> => {
  return api.get('/orders')
}

export const getOrdersQueryOptions = () => {
  return queryOptions({
    queryKey: ['orders'],
    queryFn: getOrders,
  })
}

type UseOrdersOptions = {
  queryConfig?: QueryConfig<typeof getOrdersQueryOptions>
}

export const useOrders = ({ queryConfig }: UseOrdersOptions = {}) => {
  return useQuery({
    ...getOrdersQueryOptions(),
    ...queryConfig,
  })
}
