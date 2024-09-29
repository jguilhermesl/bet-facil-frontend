'use client';
import { PrivateLayout } from '@/components/layouts/private-layout';
import { BetsList } from './bets-list';

export const BetsTemplate = () => {
  return (
    <PrivateLayout title="Bets" description="Aqui você consegue ver os bets">
      <div className="flex flex-col gap-4">
        <BetsList />
      </div>
    </PrivateLayout>
  );
};
