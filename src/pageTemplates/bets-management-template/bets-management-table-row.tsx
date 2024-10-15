import { updateBet } from '@/api/bets/update-bet';
import { updateUserBet } from '@/api/user-bets/update-user-bet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paragraph } from '@/components/ui/paragraph';
import { Spinner } from '@/components/ui/spinner';
import { TableCell, TableRow } from '@/components/ui/table';
import { Bet } from '@/models/Bet';
import { UserBet } from '@/models/UserBet';
import { queryClient } from '@/services/react-query';
import { formatDate } from '@/utils/format-date';
import { getStatusLabel } from '@/utils/get-status-label';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { ArrowRight, CheckCircle, Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IUserBetsTableRowProps {
  userBet: UserBet;
}

export const BetsManagementTableRow = ({ userBet }: IUserBetsTableRowProps) => {
  const [odd, setOdd] = useState<string | number | null>(userBet?.odd || null);
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const { mutateAsync: updateUserBetFn, isPending } = useMutation({
    mutationFn: updateUserBet,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['game-detail', userBet.bet.gameId],
      });
      queryClient.invalidateQueries({
        queryKey: ['bets-management'],
      });
    },
  });

  const handleUpdateBet = async () => {
    try {
      await updateUserBetFn({
        userBetId: userBet.id,
        odd: String(odd),
      });
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-mono">
        {formatDate(new Date(userBet?.createdAt || ''))}
      </TableCell>
      <TableCell className="font-medium">
        {userBet?.bet?.game?.title || '-'}
      </TableCell>
      <TableCell className="font-medium">
        {userBet?.bet?.title || '-'}
      </TableCell>
      <TableCell className={'font-bold max-w-[100px]'}>
        <div
          className={clsx(
            'flex py-2 px-4 items-center justify-center rounded-lg',
            {
              'bg-green-600': userBet?.bet?.result === 'green',
              'bg-red-700': userBet?.bet?.result === 'red',
              'bg-slate-600': userBet?.bet?.result === 'progress',
            }
          )}
        >
          <Paragraph className="!text-white !font-bold">
            {userBet?.bet?.result.toUpperCase()}
          </Paragraph>
        </div>
      </TableCell>
      <TableCell className={'font-bold min-w-[100px]'}>
        {isEditing ? (
          <Input value={odd || ''} onChange={(e) => setOdd(e.target.value)} />
        ) : (
          userBet?.odd || '-'
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              router.push(`/games/${userBet?.bet?.game?.flashScoreId}`)
            }
          >
            Visualizar detalhes
            <ArrowRight className="mr-2 h-3 w-3" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => {}}>
            <Trash className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (isEditing) {
                handleUpdateBet();
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isPending ? (
              <Spinner />
            ) : isEditing ? (
              <CheckCircle className="h-3 w-3" />
            ) : (
              <Edit className="h-3 w-3" />
            )}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
