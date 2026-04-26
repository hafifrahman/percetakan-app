import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export const GET = async () => {
  try {
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
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
