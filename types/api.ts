export type BaseEntity = {
  id: string
  createdAt: number
}

export type Entity<T> = {
  [K in keyof T]: T[K]
} & BaseEntity

export type Meta = {
  page: number
  total: number
  totalPages: number
}

export type User = Entity<{
  name: string
  email: string
  password: string
  phone: string
  address: string
  role: 'ADMIN' | 'USER'
}>

export type Order = Entity<{
  customer: string
  status: 'QUEUED' | 'CUTTING' | 'SEWING' | 'DONE' | 'CANCELLED'
  deadline: number
  total_amount: number
}>
