'use client';
import { getGameDetail } from '@/api/games/get-game-detail';
import { PrivateLayout } from '@/components/layouts/private-layout';
import { Heading } from '@/components/ui/heading';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { TeamLastGames } from './team-last-games';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { Paragraph } from '@/components/ui/paragraph';
import { ResultBet } from './result-bet';
import { queryClient } from '@/services/react-query';
import { generateBets } from '@/api/games/generate-bets';

export const GameDetailTemplate = () => {
  const { id } = useParams();

  const { data: gameData, isPending } = useQuery({
    queryFn: () => getGameDetail({ gameId: id as string }),
    queryKey: ['game-detail', id],
  });

  const { mutateAsync: addGameFn, isPending: betsIsPending } = useMutation({
    mutationFn: generateBets,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['game-detail', id],
      });
    },
  });

  const handleGenerateBet = () => {
    try {
      addGameFn({
        gameId: id as string,
      });
    } catch (err) {
      console.log(err);
      alert('Algo deu errado');
    }
  };

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
                <Card className="m-6 p-4 w-1/2 flex flex-col items-center">
                  {betsIsPending ? (
                    <Spinner />
                  ) : (
                    <>
                      <header className="flex items-center justify-between w-full">
                        <Heading>GPT Palpites</Heading>
                        <Button onClick={handleGenerateBet}>Gerar bet</Button>
                      </header>
                      <div className="flex flex-col max-w-2/3 mt-6">
                        {gameDetail?.bets.map((bet, index) => {
                          return (
                            <div className="flex flex-col border p-4 rounded-lg">
                              <div className="flex items-center justify-between">
                                <Paragraph className="font-bold">
                                  Bet {index + 1}
                                </Paragraph>
                                <ResultBet result={bet.result} />
                              </div>
                              <div className="flex flex-row text-start gap-6">
                                <Paragraph className="font-bold">
                                  Bet:
                                </Paragraph>
                                <Paragraph>{bet.title}</Paragraph>
                              </div>
                              <div className="flex flex-row text-start gap-6">
                                <Paragraph className="font-bold">
                                  Razão:
                                </Paragraph>
                                <Paragraph>{bet.reason}</Paragraph>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </Card>
              </div>
            </section>
          </div>
        </>
      )}
    </PrivateLayout>
  );
};
