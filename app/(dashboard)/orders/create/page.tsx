import type { Metadata } from 'next'

import { CreateOrder } from './_components/create'

export const metadata: Metadata = {
  title: 'Pesanan',
}

const CreateOrderPage = () => {
  return <CreateOrder />
}

export default CreateOrderPage
