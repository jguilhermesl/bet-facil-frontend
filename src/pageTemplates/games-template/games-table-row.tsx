import { deleteBet } from '@/api/bets/delete-bet';
import { deleteGame } from '@/api/games/delete-game';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { TableCell, TableRow } from '@/components/ui/table';
import { Game } from '@/models/Game';
import { queryClient } from '@/services/react-query';
import { getStatusLabel } from '@/utils/get-status-label';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { ArrowRight, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface IGamesTableRowProps {
  game: Game;
}

export const GamesTableRow = ({ game }: IGamesTableRowProps) => {
  const router = useRouter();

  const { mutateAsync: deleteGameFn, isPending: isDeleting } = useMutation({
    mutationFn: deleteGame,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['games'],
      });
    },
  });

  const handleDeleteBet = async () => {
    try {
      await deleteGameFn({
        gameId: game?.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-mono">{game.flashScoreId}</TableCell>
      <TableCell className="font-medium">{game?.title || '-'}</TableCell>
      <TableCell
        className={clsx('font-bold', {
          'text-green-600': game?.status === 'completed',
          'text-red-700': game?.status === 'error',
          'text-orange-600': game?.status === 'processing',
        })}
      >
        {getStatusLabel(game?.status)}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/games/${game.flashScoreId}`)}
          >
            Visualizar detalhes
            <ArrowRight className="mr-2 h-3 w-3" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleDeleteBet}>
            {isDeleting ? <Spinner /> : <Trash className="h-3 w-3" />}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
