import { Suspense } from 'react'

import { BreadcrumbProvider } from '@/components/ui/breadcrumb'
import { Spinner } from '@/components/ui/spinner'

import { DashboardLayout } from './_components/dashboard-layout'

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Suspense
      fallback={
        <div className='flex min-h-screen items-center justify-center'>
          <Spinner className='size-16' />
        </div>
      }
    >
      <BreadcrumbProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </BreadcrumbProvider>
    </Suspense>
  )
}

export default AppLayout
