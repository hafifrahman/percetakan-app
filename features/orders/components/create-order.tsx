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

import {
  type CreateOrderInput,
  createOrderInputSchema,
  useCreateOrder,
} from '../api/create-order'

const statusOptions: { value: CreateOrderInput['status'][]; label: string[] } =
  {
    value: ['QUEUED', 'CUTTING', 'SEWING', 'DONE', 'CANCELLED'],
    label: ['Antrean', 'Potong', 'Jahit', 'Selesai', 'Batal'],
  }

export const CreateOrder = () => {
  const router = useRouter()
  const createOrderMutation = useCreateOrder({
    mutationConfig: {
      onSuccess: () => {
        router.push(paths.orders.getHref())
      },
    },
  })

  const { control, handleSubmit } = useForm<CreateOrderInput>({
    shouldUnregister: true,
    resolver: zodResolver(createOrderInputSchema),
    defaultValues: {
      customer: '',
      status: 'QUEUED',
      deadline: new Date(),
      total_amount: 0,
    },
  })

  return (
    <form onSubmit={handleSubmit(data => createOrderMutation.mutate({ data }))}>
      <FieldGroup>
        <Controller
          name='customer'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='customer'>Pelanggan</FieldLabel>
              <Input
                id='customer'
                autoFocus
                placeholder='Pelanggan'
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
              <FieldLabel htmlFor='deadline'>Tenggat Waktu</FieldLabel>
              <Input
                id='deadline'
                type='date'
                aria-invalid={fieldState.invalid}
                value={new Date(field.value).toISOString().split('T')[0]}
                onChange={e =>
                  field.onChange(new Date(e.target.value).getTime())
                }
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
              <FieldLabel htmlFor='total_amount'>Total</FieldLabel>
              <Input
                id='total_amount'
                type='number'
                min={1}
                placeholder='Total'
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
          <Button type='submit' loading={createOrderMutation.isPending}>
            Buat Pesanan
          </Button>
          <Button type='button' className='mt-2' variant='outline' asChild>
            <Link href={paths.orders.getHref()}>Kembali</Link>
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
