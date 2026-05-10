import { Command, LayoutDashboard, ShoppingCart, Users } from 'lucide-react'
import Link from 'next/link'

import { paths } from '@/config/paths'
import { useUser } from '@/lib/auth'

import { NavItem, NavMain } from './nav-main'
import { NavUser } from './nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from './ui/sidebar'

const data: {
  navMain: NavItem[]
} = {
  navMain: [
    {
      title: 'Dasbor',
      url: paths.dashboard.getHref(),
      icon: LayoutDashboard,
    },
    {
      title: 'Pengguna',
      url: paths.users.getHref(),
      icon: Users,
    },
    {
      title: 'Pesanan',
      url: paths.orders.getHref(),
      icon: ShoppingCart,
    },
  ],
}

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const user = useUser()

  if (!user.data) return null

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href={paths.dashboard.getHref()}>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  <Command className='size-4' />
                </div>
                <div className='grid flex-1 text-left text-sm/tight'>
                  <span className='truncate font-medium'>Acme Inc</span>
                  <span className='truncate text-xs'>Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user.data} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
