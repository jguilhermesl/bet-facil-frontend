'use client';
import { getGameDetail } from '@/api/games/get-game-detail';
import { GameResultFlag } from '@/components/layouts/game-result-flag';
import { PrivateLayout } from '@/components/layouts/private-layout';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';
import { TeamData } from '@/models/GameDetailResponse';
import { getResultVED } from '@/utils/getResultVED';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { TeamLastGames } from './team-last-games';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

export const GameDetailTemplate = () => {
  const { id } = useParams();

  const { data: gameData, isPending } = useQuery({
    queryFn: () => getGameDetail({ gameId: id as string }),
    queryKey: ['game-detail', id],
  });

  const gameDetail = gameData?.data;

  return (
    <PrivateLayout
      title="Detalhe do jogo"
      description="Aqui você consegue ver os detalhes dos jogos"
    >
      {isPending ? (
        <div className="flex w-full items-center justify-center mt-6">
          <Spinner />
        </div>
      ) : (
        <>
          <header className="flex w-full py-4 border-t border-b bg-slate-300 items-center justify-center">
            <Heading>
              {gameDetail?.teamHomeData?.teamName}{' '}
              <span className="font-normal">vs</span>{' '}
              {gameDetail?.teamAwayData?.teamName}
            </Heading>
          </header>
          <div className="flex flex-row gap-8 w-full items-center">
            <section className="flex flex-col w-full  gap-6">
              <div className="flex w-full">
                <div className="flex w-1/2">
                  <TeamLastGames team={gameDetail?.teamHomeData} />
                  <TeamLastGames team={gameDetail?.teamAwayData} />
                </div>
                <Card className="m-6 p-4">
                  <Heading>GPT Palpites</Heading>
                </Card>
              </div>
            </section>
          </div>
        </>
      )}
    </PrivateLayout>
  );
};
