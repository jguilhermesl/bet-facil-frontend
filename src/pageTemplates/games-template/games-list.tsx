import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { GamesTableRow } from './games-table-row';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import { Paragraph } from '@/components/ui/paragraph';
import { fetchUserGames } from '@/api/user-games/fetch-user-games';

export const GamesList = () => {
  const { data: gamesData, isPending } = useQuery({
    queryFn: () => fetchUserGames({}),
    queryKey: ['games'],
  });

  const games = gamesData?.data || [];
  const gamesIsEmpty = games.length === 0;

  console.log(games);

  return (
    <div className="items-center flex justify-center w-full">
      {isPending ? (
        <Spinner />
      ) : gamesIsEmpty ? (
        <div>
          <Paragraph>Sem resultados.</Paragraph>
        </div>
      ) : (
        <div className="border rounded-md w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id no FlashScore</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Jogo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {games.map((game, i) => {
                return <GamesTableRow game={game} key={i} />;
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
