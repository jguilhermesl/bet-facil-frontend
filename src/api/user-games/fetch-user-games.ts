import { Game } from "@/models/Game";
import api from "@/services/api";

export interface IFetchUserGamesResponse {
  data: Game[]
}

interface IFetchUserGamesProps {
  search?: string
}

export const fetchUserGames = async ({ search }: IFetchUserGamesProps) => {
  try {
    const response = await api.get("/user-game", {
      params: {
        search
      }
    });
    return response.data as IFetchUserGamesResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.message);
  }
};