import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import { Paragraph } from '@/components/ui/paragraph';
import { fetchBets } from '@/api/bets/fetch-bets';
import { BetsTableRow } from './bets-table-row';

export const BetsList = () => {
  const { data: betsData, isPending } = useQuery({
    queryFn: () => fetchBets({}),
    queryKey: ['bets'],
  });

  const bets = betsData?.data || [];
  const betsIsEmpty = bets.length === 0;

  return (
    <div className="items-center flex justify-center w-full">
      {isPending ? (
        <Spinner />
      ) : betsIsEmpty ? (
        <div>
          <Paragraph>Sem resultados.</Paragraph>
        </div>
      ) : (
        <div className="border rounded-md w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Jogo</TableHead>
                <TableHead>Palpite</TableHead>
                <TableHead>Explicacao</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bets.map((bet, i) => {
                return <BetsTableRow bet={bet} key={i} />;
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
