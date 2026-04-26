import { type NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

type Params = {
  params: Promise<{
    orderId: string
  }>
}

export const GET = async (_req: NextRequest, { params }: Params) => {
  try {
    const { orderId } = await params

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    })

    if (!order) {
      return NextResponse.json(
        { message: 'Pesanan tidak ditemukan' },
        { status: 404 },
      )
    }

    return NextResponse.json({
      data: order,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

export const PATCH = async (req: NextRequest, { params }: Params) => {
  try {
    const { orderId } = await params
    const body = await req.json()

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: body,
    })

    return NextResponse.json({
      data: updatedOrder,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

export const DELETE = async (_req: NextRequest, { params }: Params) => {
  try {
    const { orderId } = await params

    await prisma.order.delete({
      where: { id: orderId },
    })

    return NextResponse.json(
      { message: 'Pesanan berhasil dihapus' },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
