'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useEffect } from 'react'

import { AppSidebar } from '@/components/app-sidebar'
import { ModeToggle } from '@/components/mode-toggle'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  useBreadcrumb,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { paths } from '@/config/paths'
import { useUser } from '@/lib/auth'

type DashboardLayoutProps = {
  children: React.ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const user = useUser()
  const { items: breadcrumbs } = useBreadcrumb()

  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams?.get('redirectTo')

  useEffect(() => {
    if (!user.data) {
      router.replace(paths.auth.login.getHref(redirectTo))
    }
  }, [user.data, router, redirectTo])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator
              orientation='vertical'
              className='mr-2 data-vertical:h-4 data-vertical:self-auto'
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  {breadcrumbs.length ? (
                    <BreadcrumbLink href={paths.dashboard.getHref()}>
                      Beranda
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>Beranda</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {breadcrumbs.map(breadcrumb => (
                  <Fragment key={breadcrumb.title}>
                    <BreadcrumbSeparator className='hidden md:block' />
                    <BreadcrumbItem>
                      {!breadcrumb.url ? (
                        <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={breadcrumb.url}>
                          {breadcrumb.title}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className='space-x-4 px-4'>
            <ModeToggle />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
