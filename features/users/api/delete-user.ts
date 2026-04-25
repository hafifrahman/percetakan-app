import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/lib/api-client'
import type { MutationConfig } from '@/lib/react-query'

import { getUserQueryOptions } from './get-user'
import { getUsersQueryOptions } from './get-users'

export const deleteUser = ({ userId }: { userId: string }) => {
  return api.delete(`/users/${userId}`)
}

type UseDeleteUserOptions = {
  userId?: string
  mutationConfig?: MutationConfig<typeof deleteUser>
}

export const useDeleteUser = ({
  mutationConfig,
  userId,
}: UseDeleteUserOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUsersQueryOptions().queryKey,
      })
      if (userId) {
        queryClient.invalidateQueries({
          queryKey: getUserQueryOptions(userId).queryKey,
        })
      }
      onSuccess?.(...args)
      toast.success('User berhasil dihapus')
    },
    ...restConfig,
    mutationFn: deleteUser,
  })
}
