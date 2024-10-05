import { Bet } from "./Bet";
import { User } from "./User";

export interface UserBet {
  id: string;
  odd?: string;
  user: User;
  userId: string;
  bet: Bet;
  betId: string;
  createdAt?: Date;
}