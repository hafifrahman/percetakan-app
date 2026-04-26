'use client'

import { useQueryClient } from '@tanstack/react-query'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

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
import { paths } from '@/config/paths'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Order } from '@/types/api'

import { getOrderQueryOptions } from '../api/get-order'
import { useOrders } from '../api/get-orders'

import { DeleteOrder } from './delete-order'

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

  const queryClient = useQueryClient()

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
          cell: ({ row }) => {
            const order = row.original

            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='size-8 p-0'>
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='size-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                  <DropdownMenuItem
                    onMouseEnter={() => {
                      queryClient.prefetchQuery(getOrderQueryOptions(order.id))
                    }}
                    asChild
                  >
                    <Link href={paths.order.getHref(order.id)}>Lihat</Link>
                  </DropdownMenuItem>
                  <DeleteOrder orderId={order.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            )
          },
        },
      ]}
    />
  )
}
