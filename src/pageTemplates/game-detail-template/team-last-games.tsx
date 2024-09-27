import { GameResultFlag } from '@/components/layouts/game-result-flag';
import { Paragraph } from '@/components/ui/paragraph';
import { TeamData } from '@/models/GameDetailResponse';
import { getResultVED } from '@/utils/getResultVED';

export const TeamLastGames = ({ team }: { team?: TeamData }) => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        Últimas partidas - {team?.teamName}
      </h3>
      <ul className="space-y-2">
        {team?.last15Games?.map((game) => {
          const result = getResultVED(game, team?.teamName || '');
          return (
            <li key={game}>
              <Paragraph className="flex items-center gap-4">
                <GameResultFlag result={result} />
                {game}
              </Paragraph>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
