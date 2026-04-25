import 'dotenv/config'

import { prisma } from '@/lib/prisma'

import { OrderStatus } from './generated/client'

const main = async () => {
  const budi = await prisma.user.create({
    data: {
      name: 'Budi',
      email: 'budi@example.com',
      phone: '081234567890',
      address: 'Banjarmasin',
      password: 'hashedpassword',
      role: 'USER',
    },
  })

  const siti = await prisma.user.create({
    data: {
      name: 'Siti',
      email: 'siti@example.com',
      phone: '082345678901',
      address: 'Banjarbaru',
      password: 'hashedpassword',
      role: 'USER',
    },
  })

  await prisma.order.createMany({
    data: [
      {
        customer: budi.name,
        status: OrderStatus.QUEUED,
        deadline: new Date('2026-05-01'),
        total_amount: 50000,
      },
      {
        customer: siti.name,
        status: OrderStatus.SEWING,
        deadline: new Date('2026-05-03'),
        total_amount: 75000,
      },
    ],
  })
}

main()
  .then(() => {
    console.log('Seed berhasil')
    return prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
