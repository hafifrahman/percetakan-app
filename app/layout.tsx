import './globals.css'

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { getUserQueryOptions } from '@/lib/auth'
import { cn } from '@/lib/utils'

import { AppProvider } from './provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'SIM Penjualan',
    template: '%s - SIM Penjualan',
  },
  description: 'Selamat datang di SIM Penjualan',
}

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(getUserQueryOptions())
  const dehydratedState = dehydrate(queryClient)

  return (
    <html
      lang='id'
      className={cn(
        'h-full antialiased',
        geistSans.variable,
        geistMono.variable,
      )}
      suppressHydrationWarning
    >
      <body className='flex min-h-full flex-col'>
        <AppProvider>
          <HydrationBoundary state={dehydratedState}>
            {children}
          </HydrationBoundary>
        </AppProvider>
      </body>
    </html>
  )
}

export default RootLayout
