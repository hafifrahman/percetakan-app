import bcrypt from 'bcryptjs'
import { type NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Alamat Email sudah digunakan' },
        { status: 400 },
      )
    }

    const hashedPassword = await bcrypt.hash(body.password, 10)

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    })

    const sessionId = crypto.randomUUID()

    await prisma.session.create({
      data: {
        id: sessionId,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    })

    const res = NextResponse.json({ user })

    res.cookies.set('session', sessionId, {
      httpOnly: true,
      path: '/',
    })

    return res
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}
