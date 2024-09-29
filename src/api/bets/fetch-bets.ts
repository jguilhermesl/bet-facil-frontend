import { Bet } from "@/models/Bet";
import api from "@/services/api";

export interface IFetchBetsResponse {
  data: Bet[]
}

interface IFetchBetsProps {
  search?: string
}

export const fetchBets = async ({ search }: IFetchBetsProps) => {
  try {
    const response = await api.get("/bets", {
      params: {
        search
      }
    });
    return response.data as IFetchBetsResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.message);
  }
};