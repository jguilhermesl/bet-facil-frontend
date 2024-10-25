import api from "@/services/api";

export interface ISignInResponse {
  data: {
    token: string;
    refreshToken: string;
  }
}

export interface ISignInProps {
  email: string,
  password: string,
}

export const signIn = async (data: ISignInProps) => {
  try {
    const response = await api.post("/authenticate", data);
    return response.data as ISignInResponse;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message);
  }
};