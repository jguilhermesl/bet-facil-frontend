import { useCallback } from 'react';
import {
  handleSetAuthToken,
  handleDeleteAuthToken,
  handleGetCurrentUrl,
  handleDeleteCurrentUrl,
} from '@/services/auth-cookies';
import { useRouter } from 'next/navigation';
import { ROUTES_PATH } from '@/constants/route-path';
import { toast } from '@/utils/toast';
import { ISignInProps, signIn } from '@/api/auth/sign-in';
import { queryClient } from '@/services/react-query';

export const useAuth = () => {
  const router = useRouter();

  const invalidateQueries = async () => {
    const queryKeys = [
      'user-profile',
      'lawyers',
      'customers',
      'processes',
      'customer-detail',
    ];

    await Promise.all(
      queryKeys.map((key) => queryClient.invalidateQueries({ queryKey: [key] }))
    );
  };

  const handleSignIn = useCallback(
    async ({ email, password }: ISignInProps) => {
      try {
        const { data } = await signIn({
          email,
          password,
        });

        const { refreshToken, token } = data;

        if (token && refreshToken) {
          handleSetAuthToken({
            accessToken: token,
            refreshToken,
          });

          const currentUrl = handleGetCurrentUrl();
          router.push(currentUrl ? currentUrl : ROUTES_PATH.HOME);

          await invalidateQueries();
        }
      } catch (error: any) {
        console.log(error);
        toast('error', error?.message || 'Algo deu errado.');
        throw new Error(error?.message);
      }
    },
    [router]
  );

  const handleSignOut = useCallback(async () => {
    handleDeleteAuthToken();
    handleDeleteCurrentUrl();

    router.push('/');
  }, [router]);

  return {
    handleSignIn,
    handleSignOut,
  };
};
