import { GameDetailResponse } from "@/models/GameDetailResponse";
import api from "@/services/api";

export interface IGetGameDetailResponse {
  data: GameDetailResponse
}

interface IGetGameDetailProps {
  gameId?: string
}

export const getGameDetail = async ({ gameId }: IGetGameDetailProps) => {
  try {
    const response = await api.get("/games/" + gameId);
    return response.data as IGetGameDetailResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.message);
  }
};