import { UserBet } from "@/models/UserBet";
import api from "@/services/api";

export interface IFetchUserBetsResponse {
  data: UserBet[]
}

interface IFetchUserBetsProps {
  search?: string
}

export const fetchUserBets = async ({ search }: IFetchUserBetsProps) => {
  try {
    const response = await api.get("/user-bet", {
      params: {
        search
      }
    });
    return response.data as IFetchUserBetsResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.message);
  }
};