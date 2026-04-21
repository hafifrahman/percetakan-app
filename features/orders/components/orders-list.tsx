'use client'

import { MoreHorizontal } from 'lucide-react'

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
import { formatDate } from '@/lib/utils'

import { useOrders } from '../api/get-orders'

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
        },
        {
          accessorKey: 'total_amount',
          header: 'Total',
        },
        {
          accessorKey: 'deadline',
          header: 'Deadline',
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
