'use client'

import { useEffect } from 'react'

import { useBreadcrumb } from '@/components/ui/breadcrumb'
import { paths } from '@/config/paths'
import { CreateOrder as CreateOrderForm } from '@/features/orders/components/create-order'

export const CreateOrder = () => {
  const { setItems } = useBreadcrumb()

  useEffect(() => {
    setItems([
      { title: 'Pesanan', url: paths.orders.getHref() },
      { title: 'Buat' },
    ])
  }, [setItems])

  return (
    <div className='bg-background flex min-h-svh flex-col items-center gap-6 p-6 md:p-10'>
      <div className='w-full max-w-xl'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-2'>
            <h1 className='text-xl font-bold'>Buat Pesanan</h1>
          </div>
          <CreateOrderForm />
        </div>
      </div>
    </div>
  )
}
