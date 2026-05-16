import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import z from 'zod'

import type { User } from '@/types/api'

import { api } from './api-client'

const userQueryKey = ['user']

export const getUser = async (): Promise<User | null> => {
  try {
    const response = (await api.get('/auth/me')) as { data: User }
    return response.data
  } catch (error) {
    return null
  }
}

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: userQueryKey,
    queryFn: getUser,
  })
}

export const useUser = () => {
  return useQuery({
    ...getUserQueryOptions(),
    retry: false,
    refetchOnWindowFocus: false,
  })
}

const logout = (): Promise<void> => {
  return api.post('/auth/logout')
}

export const useLogout = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: userQueryKey })
      onSuccess?.()
    },
  })
}

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Email tidak valid'),
  password: z.string().min(1, 'Kata sandi wajib diisi'),
})

export type LoginInput = z.infer<typeof loginInputSchema>

const loginWithEmailAndPassword = (
  data: LoginInput,
): Promise<{ user: User }> => {
  return api.post('/auth/login', data)
}

export const useLogin = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: loginWithEmailAndPassword,
    onSuccess: data => {
      queryClient.setQueryData(userQueryKey, data.user)
      onSuccess?.()
    },
  })
}

export const registerInputSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Nama wajib diisi')
      .min(4, 'Nama minimal 4 karakter'),
    email: z.string().min(1, 'Email wajib diisi').email('Email tidak valid'),
    password: z
      .string()
      .min(1, 'Password wajib diisi')
      .min(8, 'Password minimal 8 karakter'),
    repeat_password: z.string(),
  })
  .refine(data => data.password === data.repeat_password, {
    message: 'Password tidak sama',
    path: ['repeat_password'],
  })

export type RegisterInput = z.infer<typeof registerInputSchema>

const registerWithEmailAndPassword = (
  data: RegisterInput,
): Promise<{ user: User }> => {
  return api.post('/auth/register', data)
}

export const useRegister = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: registerWithEmailAndPassword,
    onSuccess: data => {
      queryClient.setQueryData(userQueryKey, data.user)
      onSuccess?.()
    },
  })
}
