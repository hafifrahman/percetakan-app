import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { paths } from '@/config/paths'

export const proxy = async (request: NextRequest) => {
  const session = (await cookies()).get('session')?.value
  const { pathname } = request.nextUrl
  const isAuthRoute = pathname.startsWith('/auth')

  if (isAuthRoute && session) {
    return NextResponse.redirect(
      new URL(paths.dashboard.getHref(), request.url),
    )
  }

  if (!isAuthRoute && !session) {
    return NextResponse.redirect(
      new URL(paths.auth.login.getHref(), request.url),
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
