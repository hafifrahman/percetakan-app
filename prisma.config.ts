import { env, type PrismaConfig } from 'prisma/config'

import 'dotenv/config'

export default {
  datasource: {
    url: env('DATABASE_URL'),
  },
  migrations: {
    seed: 'tsx prisma/seed.ts',
  },
} satisfies PrismaConfig
