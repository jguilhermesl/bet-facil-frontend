import { AxiosInstance } from 'axios';
import {
  handleGetAuthToken,
  handleSetAuthToken,
  handleDeleteAuthToken,
  handleSetCurrentUrl,
} from '@/services/auth-cookies';
import { refreshToken as handleRefreshToken } from '@/api/auth/refresh-token';

export const handleInterceptorRequestAPI = (configRequest: any) => {
  const { accessToken } = handleGetAuthToken();

  configRequest.headers.Authorization = `Bearer ${accessToken}`;

  return configRequest;
};

export const handleInterceptorErrorResponseAPI = async (
  api: AxiosInstance,
  error: any
) => {
  const configResponse = error.config;

  if (error.code === 'ERR_NETWORK') {
    error.message = 'Error connecting to server';
  }

  if (error?.response?.data?.message === 'Unauthorized' || error?.response?.data?.error?.message === 'invalid token' || error?.response?.data?.error?.message === 'jwt malformed') {
    configResponse.sent = true;

    handleSetCurrentUrl(`${window.location.pathname}${window.location.search}`);

    const { refreshToken, accessToken } = handleGetAuthToken();

    try {
      const { accessToken: token } = await handleRefreshToken(accessToken, refreshToken);

      handleSetAuthToken({ accessToken: token, refreshToken });

      configResponse.headers = {
        ...configResponse.headers,
        Authorization: `Bearer ${token}`,
      };

      return api(configResponse);
    } catch (error: any) {
      console.error('refetch', error);

      handleDeleteAuthToken();
      window.location.href = '/';
    }
  }

  return Promise.reject(error);
};