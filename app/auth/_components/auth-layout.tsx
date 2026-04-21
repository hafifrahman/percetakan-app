'use client'

import { GalleryVerticalEndIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { FieldDescription } from '@/components/ui/field'
import { paths } from '@/config/paths'
import { useUser } from '@/lib/auth'

type AuthLayoutProps = {
  children: React.ReactNode
  description?: React.ReactNode
}

export const AuthLayoutComponent = ({ children }: AuthLayoutProps) => {
  const user = useUser()

  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === paths.auth.login.getHref()

  const searchParams = useSearchParams()
  const redirectTo = searchParams?.get('redirectTo')

  const description = isLoginPage ? (
    <>
      Belum punya akun?{' '}
      <Link href={paths.auth.register.getHref(redirectTo)}>Daftar</Link>
    </>
  ) : (
    <>
      Sudah punya akun?{' '}
      <Link href={paths.auth.login.getHref(redirectTo)}>Masuk</Link>
    </>
  )

  useEffect(() => {
    if (user.data) {
      router.replace(
        `${redirectTo ? `${decodeURIComponent(redirectTo)}` : paths.dashboard.getHref()}`,
      )
    }
  }, [user.data, router, redirectTo])

  return (
    <div className='bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-2 text-center'>
            <Link
              href={paths.dashboard.getHref()}
              className='flex flex-col items-center gap-2 font-medium'
            >
              <div className='flex size-8 items-center justify-center rounded-md'>
                <GalleryVerticalEndIcon className='size-6' />
              </div>
              <span className='sr-only'>Acme Inc.</span>
            </Link>
            <h1 className='text-xl font-bold'>Selamat Datang di Acme Inc.</h1>
            <FieldDescription>{description}</FieldDescription>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
