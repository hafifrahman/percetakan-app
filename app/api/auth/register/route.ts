import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export const POST = async (req: Request) => {
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

  const res = NextResponse.json({
    user,
    jwt: 'dummy-token',
  })

  res.cookies.set('session', sessionId, {
    httpOnly: true,
    path: '/',
  })

  return res
}
