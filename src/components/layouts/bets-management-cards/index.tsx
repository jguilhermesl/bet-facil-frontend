import { fetchUserBets } from '@/api/user-bets/fetch-user-bets';
import { ActiveBetsCard } from './active-bets-card';
import { ProfitCard } from './profit-card';
import { ResultsBetsCard } from './results-bets-card';
import { useQuery } from '@tanstack/react-query';

export const BetsManagementCards = () => {
  const { data: userBetsData, isPending } = useQuery({
    queryFn: () => fetchUserBets({}),
    queryKey: ['bets-management'],
  });

  const stats = userBetsData?.data?.stats;

  return (
    <div className="flex items-center w-full gap-4">
      <ResultsBetsCard
        redsQuantity={stats?.redsQuantity || 0}
        greensQuantity={stats?.greensQuantity || 0}
      />
      <ProfitCard profit={stats?.profit || 0} />
      <ActiveBetsCard
        pendingBets={stats?.pendingBets || 0}
        pendingUnits={stats?.pendingUnits || 0}
      />
    </div>
  );
};
