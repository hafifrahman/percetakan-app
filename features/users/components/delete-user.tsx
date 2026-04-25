import { Trash2 } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

import { useDeleteUser } from '../api/delete-user'

export const DeleteUser = ({ userId }: { userId: string }) => {
  const deleteUserMutation = useDeleteUser({ userId })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          variant='destructive'
          onSelect={e => e.preventDefault()}
        >
          Hapus
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent size='sm' onOpenAutoFocus={e => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogMedia className='bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive'>
            <Trash2 />
          </AlertDialogMedia>
          <AlertDialogTitle>Hapus User?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin menghapus user ini?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant='outline'>Batal</AlertDialogCancel>
          <AlertDialogAction
            variant='destructive'
            disabled={deleteUserMutation.isPending}
            onClick={() => deleteUserMutation.mutate({ userId })}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
