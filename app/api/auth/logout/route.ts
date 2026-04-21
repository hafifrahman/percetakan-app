import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export const POST = async () => {
  const sessionId = (await cookies()).get('session')?.value

  if (sessionId) {
    await prisma.session.delete({
      where: { id: sessionId },
    })
  }

  const res = NextResponse.json({ message: 'Logged out' })

  res.cookies.set('session', '', {
    expires: new Date(0),
    path: '/',
  })

  return res
}
