'use client'

import { useEffect } from 'react'

import { useBreadcrumb } from '@/components/ui/breadcrumb'
import { UsersList } from '@/features/users/components/users-list'

export const Users = () => {
  const { setItems } = useBreadcrumb()

  useEffect(() => {
    setItems([{ title: 'Pengguna' }])
  }, [setItems])

  return (
    <div className='p-4 pt-0'>
      <div className='container mx-auto py-10'>
        <UsersList />
      </div>
    </div>
  )
}
