import api from "@/services/api";

export interface IDeleteGameProps {
  gameId: string,
}

export const deleteGame = async ({ gameId }: IDeleteGameProps) => {
  try {
    const response = await api.delete("/games" + gameId);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.response?.data?.message || error?.message);
  }
};