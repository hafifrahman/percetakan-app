'use client'

import { useEffect } from 'react'

import { useBreadcrumb } from '@/components/ui/breadcrumb'
import { OrdersList } from '@/features/orders/components/orders-list'

export const Orders = () => {
  const { setItems } = useBreadcrumb()

  useEffect(() => {
    setItems([{ title: 'Pesanan' }])
  }, [setItems])

  return (
    <div className='p-4 pt-0'>
      <div className='container mx-auto py-10'>
        <OrdersList />
      </div>
    </div>
  )
}
