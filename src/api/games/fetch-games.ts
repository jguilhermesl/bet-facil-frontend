import { Game } from "@/models/Game";
import api from "@/services/api";

export interface IFetchGamesResponse {
  data: Game[]
}

interface IFetchGamesProps {
  search?: string
}

export const fetchGames = async ({ search }: IFetchGamesProps) => {
  try {
    const response = await api.get("/games", {
      params: {
        search
      }
    });
    return response.data as IFetchGamesResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.message);
  }
};