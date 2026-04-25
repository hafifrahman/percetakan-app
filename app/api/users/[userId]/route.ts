import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) => {
  try {
    const { userId } = await params
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json(
        { message: 'User tidak ditemukan' },
        { status: 404 },
      )
    }

    return NextResponse.json({
      data: user,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) => {
  try {
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

    const currentUser = session.user

    const { userId } = await params
    const body = await req.json()

    if (body.role && currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Hanya admin yang bisa mengubah peran' },
        { status: 403 },
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: body,
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = updatedUser

    return NextResponse.json({
      data: safeUser,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) => {
  try {
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

    const currentUser = session.user

    if (currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Hanya admin yang bisa menghapus user' },
        { status: 403 },
      )
    }

    const { userId } = await params

    await prisma.user.delete({
      where: { id: userId },
    })

    return NextResponse.json(
      { message: 'User berhasil dihapus' },
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
