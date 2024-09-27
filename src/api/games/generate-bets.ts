import api from "@/services/api";

export interface IGenerateBetsProps {
  gameId: string,
}

export const generateBets = async ({ gameId }: IGenerateBetsProps) => {
  try {
    const response = await api.post("/games/" + gameId + "/bets");
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.response?.data?.message || error?.message);
  }
};