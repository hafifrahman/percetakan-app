import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export const GET = async () => {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({
    data: orders,
  })
}
