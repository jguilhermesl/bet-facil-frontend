import api from "@/services/api";

export interface IUpdateBetProps {
  userBetId: string,
  odd?: string
}

export const updateUserBet = async ({ userBetId, odd }: IUpdateBetProps) => {
  try {
    const response = await api.put("/user-bet/" + userBetId, {
      odd
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.response?.data?.message || error?.message);
  }
};