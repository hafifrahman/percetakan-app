import { PrismaMariaDb } from '@prisma/adapter-mariadb'

import { PrismaClient } from '@/prisma/generated/client'

const adapter = new PrismaMariaDb({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'percetakan_app1',
})

export const prisma = new PrismaClient({ adapter })
