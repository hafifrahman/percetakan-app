import { Suspense } from 'react'

import { Spinner } from '@/components/ui/spinner'

import { AuthLayoutComponent } from './_components/auth-layout'

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Suspense
      fallback={
        <div className='flex min-h-screen items-center justify-center'>
          <Spinner className='size-16' />
        </div>
      }
    >
      <AuthLayoutComponent>{children}</AuthLayoutComponent>
    </Suspense>
  )
}

export default AuthLayout
