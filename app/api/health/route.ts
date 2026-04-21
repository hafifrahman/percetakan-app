import { NextResponse } from 'next/server'

export const GET = () => {
  return NextResponse.json({
    status: 'ok',
    message: 'API is konek',
    time: new Date().toISOString(),
  })
}
