import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { paths } from '@/config/paths'
import { useUser as useCurrentUser } from '@/lib/auth'

import { useUser } from '../api/get-user'
import {
  type UpdateUserInput,
  updateUserInputSchema,
  useUpdateUser,
} from '../api/update-user'

type UpdateUserProps = {
  userId: string
}

export const UpdateUser = ({ userId }: UpdateUserProps) => {
  const userQuery = useUser({ userId })
  const currentUser = useCurrentUser()
  const router = useRouter()
  const updateUserMutation = useUpdateUser({
    mutationConfig: {
      onSuccess: () => {
        router.push(paths.users.getHref())
      },
    },
  })

  const user = userQuery.data?.data

  const { control, handleSubmit } = useForm<UpdateUserInput>({
    shouldUnregister: true,
    resolver: zodResolver(updateUserInputSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      phone: user?.phone || '',
      address: user?.address || '',
      role: user?.role || 'USER',
    },
  })

  if (userQuery.isLoading) return <div>Loading...</div>
  if (!user) return <div>Pengguna tidak ditemukan</div>

  return (
    <form
      onSubmit={handleSubmit(value =>
        updateUserMutation.mutate({ data: value, userId }),
      )}
    >
      <FieldGroup>
        <Controller
          name='name'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='name'>Nama Lengkap</FieldLabel>
              <Input
                id='name'
                type='text'
                placeholder='Nama lengkap'
                autoFocus
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='email'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='email'>Alamat Email</FieldLabel>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {currentUser.data?.role === 'ADMIN' && (
          <Controller
            name='role'
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor='role'>Peran</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id='role'>
                    <SelectValue placeholder='Pilih peran' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {['USER', 'ADMIN'].map(role => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
        )}
        <Controller
          name='password'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='password'>Kata Sandi (Opsional)</FieldLabel>
              <Input
                id='password'
                type='password'
                placeholder='Biarkan kosong jika tidak ingin mengubah'
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='phone'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='phone'>Nomor Telepon (Opsional)</FieldLabel>
              <Input
                id='phone'
                type='tel'
                placeholder='081234567890'
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='address'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='address'>Alamat (Opsional)</FieldLabel>
              <Textarea
                id='address'
                placeholder='Alamat lengkap'
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <FieldSeparator />
        <Field>
          <Button
            type='submit'
            className='w-full'
            loading={updateUserMutation.isPending}
          >
            Perbarui Pengguna
          </Button>
          <Button
            type='button'
            variant='outline'
            className='mt-2 w-full'
            asChild
          >
            <Link href={paths.users.getHref()}>Kembali</Link>
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
