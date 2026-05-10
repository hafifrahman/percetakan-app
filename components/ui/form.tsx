import { zodResolver } from '@hookform/resolvers/zod'
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
  type UseFormProps,
  type UseFormReturn,
} from 'react-hook-form'
import z, { ZodType } from 'zod'

import { FieldGroup } from './field'

type FormProps<TFormValues extends FieldValues, Schema> = {
  onSubmit: SubmitHandler<TFormValues>
  schema: Schema
  className?: string
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode
  options?: UseFormProps<TFormValues>
  id?: string
}

const Form = <
  Schema extends ZodType<any, any, any>,
  TFormValues extends FieldValues = z.infer<Schema>,
>({
  onSubmit,
  children,
  className,
  options,
  id,
  schema,
}: FormProps<TFormValues, Schema>) => {
  const form = useForm({ ...options, resolver: zodResolver(schema) })

  return (
    <FormProvider {...form}>
      <form
        id={id}
        className={className}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>{children(form)}</FieldGroup>
      </form>
    </FormProvider>
  )
}

export { Form }
