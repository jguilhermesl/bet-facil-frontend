import { deleteBet } from '@/api/bets/delete-bet';
import { updateBet } from '@/api/bets/update-bet';
import { addUserBet } from '@/api/user-bets/add-user-bet';
import { SelectField } from '@/components/layouts/select-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paragraph } from '@/components/ui/paragraph';
import { Select } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { TableCell, TableRow } from '@/components/ui/table';
import { Bet } from '@/models/Bet';
import { queryClient } from '@/services/react-query';
import { formatDate } from '@/utils/format-date';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { CheckCircle, Edit, Trash } from 'lucide-react';
import { useState } from 'react';

interface IBetsTableRowProps {
  bet: Bet;
}

export const BetsTableRow = ({ bet }: IBetsTableRowProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const { mutateAsync: updateBetFn, isPending } = useMutation({
    mutationFn: updateBet,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['game-detail', bet?.gameId],
      });
      queryClient.invalidateQueries({
        queryKey: ['bets'],
      });
    },
  });

  const { mutateAsync: deleteBetFn, isPending: isDeleting } = useMutation({
    mutationFn: deleteBet,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['game-detail', bet?.gameId],
      });
      queryClient.invalidateQueries({
        queryKey: ['bets'],
      });
    },
  });

  const { mutateAsync: addUserBetFn, isPending: isAdding } = useMutation({
    mutationFn: addUserBet,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['bets-management'],
      });
    },
  });

  const handleUpdateStatus = async (result: string) => {
    try {
      await updateBetFn({
        betId: bet.id,
        result,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteBet = async () => {
    try {
      await deleteBetFn({
        betId: bet.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToBetsManagement = async () => {
    try {
      await addUserBetFn({
        betId: bet.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-mono max-w-[150px]">
        {bet?.game.title}
      </TableCell>
      <TableCell className="font-medium max-w-[100px]">
        {bet?.title || '-'}
      </TableCell>
      <TableCell className="font-medium max-w-[300px] text-xs">
        {bet?.reason || '-'}
      </TableCell>
      <TableCell className={'font-bold max-w-[100px]'}>
        <div
          className={clsx(
            'flex py-2 px-4 items-center justify-center rounded-lg',
            {
              'bg-green-600': bet?.result === 'green',
              'bg-red-700': bet?.result === 'red',
              'bg-slate-600': bet?.result === 'progress',
            }
          )}
        >
          <Paragraph className="!text-white !font-bold">
            {bet?.result.toUpperCase()}
          </Paragraph>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleDeleteBet}>
            {isDeleting ? <Spinner /> : <Trash className="h-3 w-3" />}
          </Button>
          <Button variant="outline" onClick={handleAddToBetsManagement}>
            {isAdding ? <Spinner /> : 'Adicionar na Gestão'}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
