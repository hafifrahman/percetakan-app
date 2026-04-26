'use client'

import Link from 'next/link'
import { useEffect } from 'react'

import { useBreadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { paths } from '@/config/paths'
import { OrdersList } from '@/features/orders/components/orders-list'

export const Orders = () => {
  const { setItems } = useBreadcrumb()

  useEffect(() => {
    setItems([{ title: 'Pesanan' }])
  }, [setItems])

  return (
    <div className='p-4 pt-0'>
      <div className='container mx-auto py-10'>
        <Button asChild className='mb-4'>
          <Link href={paths.orders.create.getHref()}>Buat Pesanan</Link>
        </Button>
        <OrdersList />
      </div>
    </div>
  )
}
