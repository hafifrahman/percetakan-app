import type { Metadata } from 'next'

import { Dashboard } from './_components/dashboard'

export const metadata: Metadata = {
  title: 'Dasbor',
  description: 'Halaman Dasbor',
}

const DashboardPage = () => {
  return <Dashboard />
}

export default DashboardPage
