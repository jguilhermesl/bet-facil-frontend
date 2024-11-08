import { DollarSign } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface IResultsBetsCardProps {
  greensQuantity: number;
  redsQuantity: number;
}

export function ResultsBetsCard({
  greensQuantity,
  redsQuantity,
}: IResultsBetsCardProps) {
  const accuracyPercentage =
    ((greensQuantity / (greensQuantity + redsQuantity)) * 100).toFixed(2) ||
    '0';

  return (
    <Card className="min-w-[250px]">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Resultados</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          <span className="text-emerald-500"> {greensQuantity} </span>/
          <span className="text-red-500"> {redsQuantity}</span>
        </span>
        <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">
            {accuracyPercentage}%
          </span>{' '}
          de acertividade
        </p>
      </CardContent>
    </Card>
  );
}
