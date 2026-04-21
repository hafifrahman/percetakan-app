import { redirect } from 'next/navigation'

import { paths } from '@/config/paths'

const HomePage = () => redirect(paths.dashboard.getHref(), 'replace')

export default HomePage
