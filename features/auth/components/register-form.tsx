import { zodResolver } from '@hookform/resolvers/zod'
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
  type RegisterInput,
  registerInputSchema,
  useRegister,
} from '@/lib/auth'
import { toast } from 'sonner'

type RegisterFormProps = {
  onSuccess: () => void
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const registering = useRegister({ onSuccess })

  const { control, handleSubmit } = useForm<RegisterInput>({
    shouldUnregister: true,
    resolver: zodResolver(registerInputSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      repeat_password: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(values => registering.mutate(values))}>
      <FieldGroup>
        <Controller
          name='name'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='fullName'>Nama Lengkap</FieldLabel>
              <Input
                id='fullName'
                type='text'
                placeholder='cih'
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
        <Controller
          name='password'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='password'>Kata Sandi</FieldLabel>
              <Input
                id='password'
                type='password'
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='repeat_password'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='repeat_password'>
                Ulang Kata Sandi
              </FieldLabel>
              <Input
                id='repeat_password'
                type='password'
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button loading={registering.isPending}>Buat Akun</Button>
        </Field>
        <FieldSeparator>Atau</FieldSeparator>
        <Field>
          <Button
            variant='outline'
            type='button'
            onClick={() => toast.warning('Fitur belum tersedia')}
          >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <path
                d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                fill='currentColor'
              />
            </svg>
            Lanjutkan dengan Google
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
