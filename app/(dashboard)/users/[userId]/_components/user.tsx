'use client'

import { useEffect } from 'react'

import { useBreadcrumb } from '@/components/ui/breadcrumb'
import { paths } from '@/config/paths'
import { UpdateUser } from '@/features/users/components/update-user'

export const User = ({ userId }: { userId: string }) => {
  const { setItems } = useBreadcrumb()

  useEffect(() => {
    setItems([
      { title: 'Pengguna', url: paths.users.getHref() },
      { title: 'Lihat' },
    ])
  }, [setItems])

  return (
    <div className='bg-background flex min-h-svh flex-col items-center gap-6 p-6 md:p-10'>
      <div className='w-full max-w-xl'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-2'>
            <h1 className='text-xl font-bold'>Lihat Pengguna</h1>
          </div>
          <UpdateUser userId={userId} />
        </div>
      </div>
    </div>
  )
}
