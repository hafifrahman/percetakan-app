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

import { useUsers } from '../api/get-users'

export const UsersList = () => {
  const usersQuery = useUsers()

  const users = usersQuery.data?.data ?? []

  return (
    <DataTable
      data={users}
      isLoading={usersQuery.isLoading}
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
          accessorKey: 'name',
          header: 'Nama',
        },
        {
          accessorKey: 'email',
          header: 'Alamat email',
        },
        {
          accessorKey: 'phone',
          header: 'Telepon',
        },
        {
          accessorKey: 'address',
          header: 'Alamat',
        },
        {
          accessorKey: 'role',
          header: 'Peran',
        },
        {
          accessorKey: 'createdAt',
          header: 'Dibuat pada',
          cell: ({ row }) => (
            <span>{formatDate(row.getValue('createdAt'))}</span>
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
