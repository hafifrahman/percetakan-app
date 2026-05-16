import bcrypt from 'bcryptjs'
import { type NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Alamat email atau kata sandi tidak salah.' },
        { status: 401 },
      )
    }

    const valid = await bcrypt.compare(body.password, user.password)
    if (!valid) {
      return NextResponse.json(
        { message: 'Alamat email atau kata sandi tidak salah.' },
        { status: 401 },
      )
    }

    const sessionId = crypto.randomUUID()

    await prisma.session.create({
      data: {
        id: sessionId,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    })

    const { password, ...safeUser } = user

    const res = NextResponse.json({ user: safeUser })

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
