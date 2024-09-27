import { Bet } from "./Bet";

export interface TeamData {
  mediaEscanteios: string;
  desvioEscanteios: string;
  mediaGoals: string;
  desvioGoals: string;
  mediaYellowCards: string;
  desvioYellowCards: string;
  mediaFouls: string;
  desvioFouls: string;
  mediaConcededEscanteios: string;
  desvioConcededEscanteios: string;
  mediaConcededGoals: string;
  desvioConcededGoals: string;
  mediaConcededYellowCards: string;
  desvioConcededYellowCards: string;
  mediaConcededFouls: string;
  desvioConcededFouls: string;
  mediaGameEscanteios: string;
  desvioGameEscanteios: string;
  mediaGameGoals: string;
  desvioGameGoals: string;
  mediaGameYellowCards: string;
  desvioGameYellowCards: string;
  mediaGameFouls: string;
  desvioGameFouls: string;
  lastResults: string[];
  last15Games: string[];
  resumeLast15: {
    quantidadeJogosQueTiveramMaisDe2Gols: number;
    quantidadeJogosQueTiveramMenosDe3Gols: number;
    quantidadeJogosQueTiveramMenosDe4Gols: number;
    quantidadeJogosQueTiveramMaisDe1Gol: number;
    quantidadeJogosQueOTimeFezGol: number;
    quantidadeJogosQueOTimeLevouGol: number;
  };
  classification: {
    wins: string;
    draws: string;
    losses: string;
    ranking: string;
    playedGames: string;
    goalsDifference: string;
    goalsScoredForGoalsConceded: string;
  };
  teamName: string;
}

export interface GameDetailResponse {
  teamHomeData: TeamData;
  teamAwayData: TeamData;
  bets: Bet[]
}
