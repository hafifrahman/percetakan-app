import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Field, FieldSeparator } from '@/components/ui/field'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { paths } from '@/config/paths'
import { useUser as useCurrentUser } from '@/lib/auth'

import { useUser } from '../api/get-user'
import { updateUserInputSchema, useUpdateUser } from '../api/update-user'

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

  if (userQuery.isLoading) return <div>Loading...</div>
  if (!user) return <div>Pengguna tidak ditemukan</div>

  return (
    <Form
      onSubmit={data => updateUserMutation.mutate({ data, userId })}
      schema={updateUserInputSchema}
      options={{
        shouldUnregister: true,
        defaultValues: {
          name: user?.name || '',
          email: user?.email || '',
          password: '',
          phone: user?.phone || '',
          address: user?.address || '',
          role: user?.role || 'USER',
        },
      }}
    >
      {({ register, formState: { errors } }) => (
        <>
          <Input
            placeholder='Nama lengkap'
            autoFocus
            label='Nama Lengkap'
            error={errors.name}
            registration={register('name')}
          />
          <Input
            type='email'
            placeholder='m@example.com'
            label='Alamat Email'
            error={errors.email}
            registration={register('email')}
          />
          {currentUser.data?.role === 'ADMIN' && (
            <Select
              name='role'
              label='Peran'
              options={[{ value: 'USER', label: 'Pengguna' }]}
            />
          )}
          <Input
            type='password'
            placeholder='Biarkan kosong jika tidak ingin mengubah'
            label='Kata Sandi'
            error={errors.password}
            registration={register('password')}
          />
          <Input
            type='tel'
            placeholder='081234567890'
            label='Telepon'
            error={errors.phone}
            registration={register('phone', {
              valueAsNumber: true,
            })}
          />
          <Textarea id='address' placeholder='Alamat lengkap' />
          <FieldSeparator />
          <Field>
            <Button type='submit' loading={updateUserMutation.isPending}>
              Perbarui Pengguna
            </Button>
            <Button type='button' variant='outline' className='mt-2' asChild>
              <Link href={paths.users.getHref()}>Kembali</Link>
            </Button>
          </Field>
        </>
      )}
    </Form>
  )
}
