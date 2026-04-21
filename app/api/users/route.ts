import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export const GET = async () => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const safeUsers = users.map(user => ({
    ...user,
    phone: user.phone?.toString(),
  }))

  return NextResponse.json({
    data: safeUsers,
  })
}
