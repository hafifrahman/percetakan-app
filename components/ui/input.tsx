import type { UseFormRegisterReturn } from 'react-hook-form'

import { cn } from '@/lib/utils'

import { FieldWrapper, type FieldWrapperPassThroughProps } from './field'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperPassThroughProps & {
    className?: string
    registration: Partial<UseFormRegisterReturn>
  }

const Input = ({
  className,
  type = 'text',
  label,
  error,
  registration,
  ...props
}: InputProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={type}
        id={label}
        data-slot='input'
        aria-invalid={!!error}
        className={cn(
          'h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
          className,
        )}
        {...registration}
        {...props}
      />
    </FieldWrapper>
  )
}

export { Input }
