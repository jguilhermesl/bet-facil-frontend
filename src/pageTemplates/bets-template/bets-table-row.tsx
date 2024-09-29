import { deleteBet } from '@/api/bets/delete-bet';
import { updateBet } from '@/api/bets/update-bet';
import { SelectField } from '@/components/layouts/select-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { TableCell, TableRow } from '@/components/ui/table';
import { Bet } from '@/models/Bet';
import { queryClient } from '@/services/react-query';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { CheckCircle, Edit, Trash } from 'lucide-react';
import { useState } from 'react';

interface IBetsTableRowProps {
  bet: Bet;
}

export const BetsTableRow = ({ bet }: IBetsTableRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [odd, setOdd] = useState<string | number | null>(bet?.odd || null);

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

  const handleUpdateOdd = async () => {
    try {
      await updateBetFn({
        betId: bet.id,
        odd: odd as string,
      });
      setIsEditing(false);
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

  return (
    <TableRow>
      <TableCell className="font-mono w-[20%]">{bet?.game.title}</TableCell>
      <TableCell className="font-medium">{bet?.title || '-'}</TableCell>
      <TableCell className="font-medium">{bet?.reason || '-'}</TableCell>
      <TableCell className={'font-bold min-w-[170px]'}>
        <SelectField
          className="!text-white"
          triggerClassName={clsx({
            'bg-green-600': bet?.result === 'green',
            'bg-red-700': bet?.result === 'red',
            'bg-slate-600': bet?.result === 'progress',
          })}
          value={bet?.result}
          choices={[
            { label: 'GREEN', value: 'green' },
            { label: 'RED', value: 'red' },
            { label: 'IN PROGRESS', value: 'progress' },
          ]}
          onChange={handleUpdateStatus}
        />
      </TableCell>
      <TableCell className={'font-bold min-w-[170px]'}>
        {isEditing ? (
          <Input value={odd || ''} onChange={(e) => setOdd(e.target.value)} />
        ) : (
          bet?.odd || '-'
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (isEditing) {
                handleUpdateOdd();
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? (
              isPending ? (
                <Spinner />
              ) : (
                <CheckCircle className="h-3 w-3" />
              )
            ) : (
              <Edit className="h-3 w-3" />
            )}
          </Button>
          <Button variant="outline" size="icon" onClick={handleDeleteBet}>
            {isDeleting ? <Spinner /> : <Trash className="h-3 w-3" />}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
