import { GameStats } from "./GameStats";

enum Status {
  processing = "processing",
  completed = "completed",
  cancelled = "error"
}

export interface Game {
  id: string;
  flashScoreId: string;
  status: Status;
  title?: string;
  data: {
    home: {
      teamName: string;
      lastGames: GameStats[];
      classification: any
    },
    away: {
      teamName: string;
      lastGames: GameStats[];
      classification: any
    }
  };
  createdAt?: string;
}