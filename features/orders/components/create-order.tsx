import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Field, FieldSeparator } from '@/components/ui/field'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { paths } from '@/config/paths'
import type { Order } from '@/types/api'

import { createOrderInputSchema, useCreateOrder } from '../api/create-order'

const statusOptions: { value: Order['status']; label: string }[] = [
  { value: 'QUEUED', label: 'Antrean' },
  { value: 'CUTTING', label: 'Potong' },
  { value: 'SEWING', label: 'Jahit' },
  { value: 'DONE', label: 'Selesai' },
  { value: 'CANCELLED', label: 'Batal' },
]

export const CreateOrder = () => {
  const router = useRouter()
  const createOrderMutation = useCreateOrder({
    mutationConfig: {
      onSuccess: () => {
        router.push(paths.orders.getHref())
      },
    },
  })

  return (
    <Form
      onSubmit={data => createOrderMutation.mutate({ data })}
      schema={createOrderInputSchema}
      options={{
        shouldUnregister: true,
      }}
    >
      {({ register, formState: { errors } }) => (
        <>
          <Input
            autoFocus
            placeholder='Pelanggan'
            label='Pelanggan'
            error={errors.customer}
            registration={register('customer')}
          />
          <Select
            name='status'
            label='Status'
            placeholder='Pilih status'
            options={statusOptions}
          />
          <Input
            type='date'
            label='Tenggat Waktu'
            error={errors.deadline}
            registration={register('deadline')}
          />
          <Input
            type='number'
            min={1}
            placeholder='Total'
            label='Total'
            error={errors.total_amount}
            registration={register('total_amount', {
              valueAsNumber: true,
            })}
          />
          <FieldSeparator />
          <Field>
            <Button type='submit' loading={createOrderMutation.isPending}>
              Buat Pesanan
            </Button>
            <Button type='button' className='mt-2' variant='outline' asChild>
              <Link href={paths.orders.getHref()}>Kembali</Link>
            </Button>
          </Field>
        </>
      )}
    </Form>
  )
}
