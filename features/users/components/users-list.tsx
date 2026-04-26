'use client'

import { useQueryClient } from '@tanstack/react-query'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

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
import { formatDate } from '@/lib/utils'

import { getUserQueryOptions } from '../api/get-user'
import { useUsers } from '../api/get-users'

import { DeleteUser } from './delete-user'

export const UsersList = () => {
  const usersQuery = useUsers()

  const queryClient = useQueryClient()

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
          cell: ({ row }) => {
            const user = row.original

            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='size-8 p-0'>
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                  <DropdownMenuItem
                    onMouseEnter={() => {
                      queryClient.prefetchQuery(getUserQueryOptions(user.id))
                    }}
                    asChild
                  >
                    <Link href={paths.user.getHref(user.id)}>Lihat</Link>
                  </DropdownMenuItem>
                  <DeleteUser userId={user.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            )
          },
        },
      ]}
    />
  )
}
