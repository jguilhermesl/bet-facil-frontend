'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Paragraph } from '@/components/ui/paragraph';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/utils/toast';
import { EyeClosedIcon } from '@radix-ui/react-icons';
import { useFormik } from 'formik';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const Login = () => {
  const { handleSignIn } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleForm = async (values: { email: string; password: string }) => {
    await handleSignIn({
      email: values.email,
      password: values.password,
    });

    router.push('/');
    toast('success', 'Seja bem vindo!');
  };

  const { values, handleChange, handleSubmit, isSubmitting } = useFormik({
    validateOnChange: false,
    validateOnBlur: true,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleForm,
  });

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center px-5 relative p-5">
      <Link
        href={'/signup'}
        className="absolute top-9 right-9 !font-semibold !text-sm"
      >
        Cadastre-se
      </Link>
      <Heading className="mt-14">Fazer Login</Heading>
      <Paragraph className="text-sm text-default-grey !font-poppins">
        Insira seu CPF e senha abaixo para fazer login
      </Paragraph>
      <form className="w-full max-w-[400px] mt-6" onSubmit={handleSubmit}>
        <Input
          placeholder="janedoe@gmail.com"
          type="text"
          className="px-4 py-[10px]"
          onChange={handleChange('email')}
          value={values.email}
          iconRight={<Eye size={16} />}
        />
        <Input
          placeholder="*********"
          type={showPassword ? 'text' : 'password'}
          className="mt-[12px] px-4 py-[10px]"
          onChange={handleChange('password')}
          value={values.password}
          iconRight={
            showPassword ? (
              <Eye
                className="cursor-pointer"
                size={16}
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <EyeClosedIcon
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )
          }
        />
        <Button
          disabled={isSubmitting}
          className="!rounded-md !font-poppins !font-medium mt-2 w-full"
        >
          {isSubmitting ? (
            <Spinner className="border-l-white border-t-white" />
          ) : (
            'Logar'
          )}
        </Button>
        <Link href={'/forgot-password'} className="flex justify-end">
          <Paragraph className="text-brand mt-5 ml-auto">
            Esqueceu a senha?
          </Paragraph>
        </Link>
      </form>
    </div>
  );
};
