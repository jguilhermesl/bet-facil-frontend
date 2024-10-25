import api from "@/services/api";

export interface IUpdateBetProps {
  userBetId: string,
  odd?: number
  unit?: number
}

export const updateUserBet = async ({ userBetId, odd, unit }: IUpdateBetProps) => {
  try {
    const response = await api.put("/user-bet/" + userBetId, {
      odd,
      unit
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.response?.data?.message || error?.message);
  }
};