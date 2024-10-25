import { Bet } from "./Bet";
import { User } from "./User";

export interface UserBet {
  id: string;
  odd?: string | number;
  unit?: string | number;
  user: User;
  userId: string;
  bet: Bet;
  betId: string;
  createdAt?: Date;
}