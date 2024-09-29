import api from "@/services/api";

export interface IUpdateBetProps {
  betId: string,
  result?: string,
  odd?: string
}

export const updateBet = async ({ betId, result, odd }: IUpdateBetProps) => {
  try {
    const response = await api.put("/bets/" + betId, {
      result,
      odd
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.response?.data?.message || error?.message);
  }
};