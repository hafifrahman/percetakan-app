import 'dayjs/locale/id'

import { clsx, type ClassValue } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'

dayjs.locale('id')

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: number) =>
  dayjs(date).format('MMMM D, YYYY h:mm A')

export const formatCurrency = (
  value: number,
  options?: Intl.NumberFormatOptions,
) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    ...options,
  }).format(value)
}
