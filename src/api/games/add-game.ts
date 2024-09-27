import api from "@/services/api";

export interface IAddGameProps {
  gameId: string,
}

export const addGame = async ({ gameId }: IAddGameProps) => {
  try {
    const response = await api.post("/games/" + gameId);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.detail || error?.response?.data?.message || error?.message);
  }
};