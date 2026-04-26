import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/lib/api-client'
import type { MutationConfig } from '@/lib/react-query'

import { getOrderQueryOptions } from './get-order'
import { getOrdersQueryOptions } from './get-orders'

export const deleteOrder = ({ orderId }: { orderId: string }) => {
  return api.delete(`/orders/${orderId}`)
}

type UseDeleteOrderOptions = {
  orderId?: string
  mutationConfig?: MutationConfig<typeof deleteOrder>
}

export const useDeleteOrder = ({
  mutationConfig,
  orderId,
}: UseDeleteOrderOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getOrdersQueryOptions().queryKey,
      })
      if (orderId) {
        queryClient.invalidateQueries({
          queryKey: getOrderQueryOptions(orderId).queryKey,
        })
      }
      onSuccess?.(...args)
      toast.success('Order berhasil dihapus')
    },
    ...restConfig,
    mutationFn: deleteOrder,
  })
}
