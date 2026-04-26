import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import z from 'zod'

import { api } from '@/lib/api-client'
import type { MutationConfig } from '@/lib/react-query'
import type { Order } from '@/types/api'

import { getOrderQueryOptions } from './get-order'
import { getOrdersQueryOptions } from './get-orders'

export const updateOrderInputSchema = z.object({
  customer: z.string().min(3, 'Nama minimal 3 karakter'),
  status: z.enum(['QUEUED', 'CUTTING', 'SEWING', 'DONE', 'CANCELLED']),
  deadline: z.coerce.date().refine(date => date.getTime() > Date.now(), {
    message: 'Deadline harus di masa depan',
  }),
  total_amount: z.number().positive('Total amount harus lebih besar dari 0'),
})

export type UpdateOrderInput = z.infer<typeof updateOrderInputSchema>

export const updateOrder = ({
  data,
  orderId,
}: {
  data: UpdateOrderInput
  orderId: string
}): Promise<Order> => {
  return api.patch(`/orders/${orderId}`, data)
}

type UseUpdateOrderOptions = {
  mutationConfig?: MutationConfig<typeof updateOrder>
}

export const useUpdateOrder = ({
  mutationConfig,
}: UseUpdateOrderOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getOrdersQueryOptions().queryKey,
      })
      queryClient.invalidateQueries({
        queryKey: getOrderQueryOptions(data.id).queryKey,
      })
      onSuccess?.(data, ...args)
      toast.success('Pesanan berhasil diperbarui')
    },
    ...restConfig,
    mutationFn: updateOrder,
  })
}
