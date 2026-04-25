'use client'

import { MoreHorizontal } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/ui/table'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Order } from '@/types/api'

import { useOrders } from '../api/get-orders'

const statusConfig: Record<
  Order['status'],
  { label: string; variant: React.ComponentProps<typeof Badge>['variant'] }
> = {
  QUEUED: { label: 'Antrean', variant: 'secondary' },
  CUTTING: { label: 'Potong', variant: 'outline' },
  SEWING: { label: 'Jahit', variant: 'default' },
  DONE: { label: 'Selesai', variant: 'success' },
  CANCELLED: { label: 'Batal', variant: 'destructive' },
}

export const OrdersList = () => {
  const ordersQuery = useOrders()

  const orders = ordersQuery.data?.data ?? []

  return (
    <DataTable
      data={orders}
      isLoading={ordersQuery.isLoading}
      columns={[
        {
          id: 'select',
          header: ({ table }) => (
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && 'indeterminate')
              }
              onCheckedChange={value =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label='Select all'
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={value => row.toggleSelected(!!value)}
              aria-label='Select row'
            />
          ),
          enableSorting: false,
          enableHiding: false,
        },
        {
          id: 'number',
          header: 'No',
          cell: ({ row }) => <span>{row.index + 1}</span>,
          enableSorting: false,
          enableHiding: false,
        },
        {
          accessorKey: 'customer',
          header: 'Pelanggan',
        },
        {
          accessorKey: 'status',
          header: 'Status',
          cell: ({ row }) => {
            const status = row.getValue<keyof typeof statusConfig>('status')
            const config = statusConfig[status]
            if (!config) return <span>{status}</span>
            return <Badge variant={config.variant}>{config.label}</Badge>
          },
        },
        {
          accessorKey: 'total_amount',
          header: 'Total',
          cell: ({ row }) => (
            <span>{formatCurrency(row.getValue('total_amount'))}</span>
          ),
        },
        {
          accessorKey: 'deadline',
          header: 'Tenggat Waktu',
          cell: ({ row }) => (
            <span>{formatDate(row.getValue('deadline'))}</span>
          ),
        },
        {
          id: 'actions',
          cell: () => {
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='h-8 w-8 p-0'>
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                  <DropdownMenuItem>Ubah</DropdownMenuItem>
                  <DropdownMenuItem>Hapus</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          },
        },
      ]}
    />
  )
}
