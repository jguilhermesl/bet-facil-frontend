import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BetsManagementTableRow } from './bets-management-table-row';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import { Paragraph } from '@/components/ui/paragraph';
import { fetchUserBets } from '@/api/user-bets/fetch-user-bets';

export const BetsManagementList = () => {
  const { data: userBetsData, isPending } = useQuery({
    queryFn: () => fetchUserBets({}),
    queryKey: ['userBets'],
  });

  const userBets = userBetsData?.data || [];
  const userBetsIsEmpty = userBets.length === 0;

  return (
    <div className="items-center flex justify-center w-full">
      {isPending ? (
        <Spinner />
      ) : userBetsIsEmpty ? (
        <div>
          <Paragraph>Sem resultados.</Paragraph>
        </div>
      ) : (
        <div className="border rounded-md w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Criado em</TableHead>
                <TableHead>Jogo</TableHead>
                <TableHead>Palpite</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Odd</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userBets.map((userBet, i) => {
                return <BetsManagementTableRow userBet={userBet} key={i} />;
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
