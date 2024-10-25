import { DollarSign } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface IActiveBetsCardProps {
  pendingBets: number;
  pendingUnits: number;
}

export function ActiveBetsCard({
  pendingBets,
  pendingUnits,
}: IActiveBetsCardProps) {
  return (
    <Card className="min-w-[250px]">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Bets pendentes
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">{pendingBets}</span>
        <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">
            {pendingUnits} unidades
          </span>{' '}
          em jogo
        </p>
      </CardContent>
    </Card>
  );
}
