'use client';
import { PrivateLayout } from '@/components/layouts/private-layout';
import { BetsManagementList } from './bets-management-list';
import { BetsManagementCards } from '@/components/layouts/bets-management-cards';

export const BetsManagementTemplate = () => {
  return (
    <PrivateLayout
      title="Gestao"
      description="Aqui você consegue ver a sua gestão de banca. São as bets que você adicionou na gestão."
    >
      <div className="flex flex-col gap-4">
        <BetsManagementCards />
        <BetsManagementList />
      </div>
    </PrivateLayout>
  );
};
