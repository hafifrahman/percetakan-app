import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export const GET = async () => {
  const sessionId = (await cookies()).get('session')?.value

  if (!sessionId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  })

  if (!session || session.expiresAt < new Date()) {
    return NextResponse.json({ message: 'Session Expired' }, { status: 401 })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...safeUser } = session.user

  return NextResponse.json({
    data: safeUser,
  })
}
