import api from "@/services/api";

export interface IAddUserGameProps {
  gameId: string,
}

export const addUserGame = async ({ gameId }: IAddUserGameProps) => {
  try {
    const response = await api.post("/user-game", {
      flashScoreId: gameId
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.response?.data?.message || error?.message);
  }
};