import api from "@/services/api";

export interface IAddUserBetProps {
  betId: string,
}

export const addUserBet = async ({ betId }: IAddUserBetProps) => {
  try {
    const response = await api.post("/user-bet", {
      betId
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.response?.data?.message || error?.message);
  }
};