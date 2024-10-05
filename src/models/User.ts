import { Game } from "./Game";
import { UserBet } from "./UserBet";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  games?: Game[];
  userBets?: UserBet[];
}