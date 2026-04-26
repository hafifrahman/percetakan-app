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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { paths } from '@/config/paths'

import { useOrder } from '../api/get-order'
import {
  type UpdateOrderInput,
  updateOrderInputSchema,
  useUpdateOrder,
} from '../api/update-order'

type UpdateOrderProps = {
  orderId: string
}

const statusOptions: { value: UpdateOrderInput['status'][]; label: string[] } =
  {
    value: ['QUEUED', 'CUTTING', 'SEWING', 'DONE', 'CANCELLED'],
    label: ['Antrean', 'Potong', 'Jahit', 'Selesai', 'Batal'],
  }

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

  const { control, handleSubmit } = useForm<UpdateOrderInput>({
    shouldUnregister: true,
    resolver: zodResolver(updateOrderInputSchema),
    defaultValues: {
      customer: order?.customer || '',
      status: order?.status || 'QUEUED',
      deadline: order?.deadline ? new Date(order.deadline) : new Date(),
      total_amount: order?.total_amount || 0,
    },
  })

  if (orderQuery.isLoading) return <div>Loading...</div>
  if (!order) return <div>Pesanan tidak ditemukan</div>

  return (
    <form
      onSubmit={handleSubmit(data =>
        updateOrderMutation.mutate({ data, orderId }),
      )}
    >
      <FieldGroup>
        <Controller
          name='customer'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='customer'>Customer</FieldLabel>
              <Input
                id='customer'
                autoFocus
                placeholder='Nama customer'
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='status'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='status'>Status</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id='status' aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder='Pilih status' />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.value.map((status, index) => (
                    <SelectItem key={status} value={status}>
                      {statusOptions.label[index]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='deadline'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='deadline'>Deadline</FieldLabel>
              <Input
                id='deadline'
                type='date'
                aria-invalid={fieldState.invalid}
                value={new Date(field.value).toISOString().split('T')[0]}
                onChange={e => field.onChange(e.target.value)}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='total_amount'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='total_amount'>Total Amount</FieldLabel>
              <Input
                id='total_amount'
                type='number'
                min={1}
                placeholder='Total amount'
                aria-invalid={fieldState.invalid}
                value={field.value === 0 ? '' : field.value}
                onChange={e => field.onChange(Number(e.target.value))}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
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
      </FieldGroup>
    </form>
  )
}
