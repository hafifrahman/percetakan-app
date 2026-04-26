import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export const GET = async () => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      data: orders,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()

    const order = await prisma.order.create({
      data: {
        customer: body.customer,
        status: body.status,
        deadline: new Date(body.deadline),
        total_amount: body.total_amount,
      },
    })

    return NextResponse.json({ order })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
