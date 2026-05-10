'use client'

import { useEffect } from 'react'

import { useBreadcrumb } from '@/components/ui/breadcrumb'
import { paths } from '@/config/paths'
import { UpdateOrder } from '@/features/orders/components/update-order'

export const Order = ({ orderId }: { orderId: string }) => {
  const { setItems } = useBreadcrumb()

  useEffect(() => {
    setItems([
      { title: 'Pesanan', url: paths.orders.getHref() },
      { title: 'Lihat' },
    ])
  }, [setItems])

  return (
    <div className='flex min-h-svh flex-col items-center gap-6 bg-background p-6 md:p-10'>
      <div className='w-full max-w-xl'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-2'>
            <h1 className='text-xl font-bold'>Lihat Pesanan</h1>
          </div>
          <UpdateOrder orderId={orderId} />
        </div>
      </div>
    </div>
  )
}
