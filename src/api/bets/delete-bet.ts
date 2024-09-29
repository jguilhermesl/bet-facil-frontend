import api from "@/services/api";

export interface IDeleteBetProps {
  betId: string,
}

export const deleteBet = async ({ betId }: IDeleteBetProps) => {
  try {
    const response = await api.delete("/bets/" + betId);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.response?.data?.message || error?.message);
  }
};