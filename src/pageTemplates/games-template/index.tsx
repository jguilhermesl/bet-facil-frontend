'use client';
import { PrivateLayout } from '@/components/layouts/private-layout';
import { GamesList } from './games-list';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DialogAddGame } from '@/components/layouts/dialog-add-game';

export const GamesTemplate = () => {
  return (
    <PrivateLayout
      title="Jogos"
      description="Aqui você consegue ver os jogos"
      actionsComponent={
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => {}}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar jogo
            </Button>
          </DialogTrigger>
          <DialogAddGame />
        </Dialog>
      }
    >
      <div className="flex flex-col gap-4">
        <GamesList />
      </div>
    </PrivateLayout>
  );
};
