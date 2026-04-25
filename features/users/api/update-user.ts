import z from 'zod'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/lib/api-client'
import type { MutationConfig } from '@/lib/react-query'
import type { User } from '@/types/api'

import { getUserQueryOptions } from './get-user'
import { getUsersQueryOptions } from './get-users'

export const updateUserInputSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.string().email('Format email tidak valid'),
  password: z
    .string()
    .optional()
    .refine(v => !v || v.length >= 8, {
      message: 'Kata sandi minimal 8 karakter',
    }),
  phone: z
    .string()
    .optional()
    .refine(v => !v || (v.length >= 11 && v.length <= 13), {
      message: 'Nomor harus 11-13 digit',
    }),
  address: z
    .string()
    .optional()
    .refine(v => !v || v.length >= 3, {
      message: 'Alamat minimal 3 karakter',
    }),
  role: z.enum(['ADMIN', 'USER']).optional(),
})

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>

export const updateUser = ({
  data,
  userId,
}: {
  data: UpdateUserInput
  userId: string
}): Promise<User> => {
  return api.patch(`/users/${userId}`, data)
}

type UseUpdateUserOptions = {
  mutationConfig?: MutationConfig<typeof updateUser>
}

export const useUpdateUser = ({
  mutationConfig,
}: UseUpdateUserOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getUsersQueryOptions().queryKey,
      })
      queryClient.refetchQueries({
        queryKey: getUserQueryOptions(data.id).queryKey,
      })
      onSuccess?.(data, ...args)
      toast.success('Pengguna berhasil diperbarui')
    },
    ...restConfig,
    mutationFn: updateUser,
  })
}
