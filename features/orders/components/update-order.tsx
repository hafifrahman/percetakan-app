import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Field, FieldSeparator } from '@/components/ui/field'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { paths } from '@/config/paths'
import type { Order } from '@/types/api'

import { useOrder } from '../api/get-order'
import { updateOrderInputSchema, useUpdateOrder } from '../api/update-order'

type UpdateOrderProps = {
  orderId: string
}

const statusOptions: { value: Order['status']; label: string }[] = [
  { value: 'QUEUED', label: 'Antrean' },
  { value: 'CUTTING', label: 'Potong' },
  { value: 'SEWING', label: 'Jahit' },
  { value: 'DONE', label: 'Selesai' },
  { value: 'CANCELLED', label: 'Batal' },
]

export const UpdateOrder = ({ orderId }: UpdateOrderProps) => {
  const orderQuery = useOrder({ orderId })
  const router = useRouter()
  const updateOrderMutation = useUpdateOrder({
    mutationConfig: {
      onSuccess: () => {
        router.push(paths.orders.getHref())
      },
    },
  })

  const order = orderQuery.data?.data

  if (orderQuery.isLoading) return <div>Loading...</div>
  if (!order) return <div>Pesanan tidak ditemukan</div>

  return (
    <Form
      onSubmit={data => updateOrderMutation.mutate({ data, orderId })}
      schema={updateOrderInputSchema}
      options={{
        shouldUnregister: true,
        defaultValues: {
          customer: order?.customer,
          status: order?.status,
          deadline: new Date(order.deadline).toISOString().split('T')[0],
          total_amount: order?.total_amount,
        },
      }}
    >
      {({ register, formState: { errors } }) => (
        <>
          <Input
            id='customer'
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
            id='deadline'
            type='date'
            label='Tenggat Waktu'
            error={errors.deadline}
            registration={register('deadline')}
          />
          <Input
            id='total_amount'
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
            <Button type='submit' loading={updateOrderMutation.isPending}>
              Perbarui Pesanan
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
