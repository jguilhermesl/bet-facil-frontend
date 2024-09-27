import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Game } from '@/models/Game';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface IGamesTableRowProps {
  game: Game;
}

export const GamesTableRow = ({ game }: IGamesTableRowProps) => {
  const router = useRouter();

  return (
    <TableRow>
      <TableCell className="font-mono">{game.flashScoreId}</TableCell>
      <TableCell className="font-medium">{game?.title || '-'}</TableCell>
      <TableCell className="font-bold text-orange-500">{game.status}</TableCell>
      <TableCell>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/games/${game.flashScoreId}`)}
        >
          Visualizar detalhes
          <ArrowRight className="mr-2 h-3 w-3" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
