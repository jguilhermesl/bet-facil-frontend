'use client';

import { Template } from './template';
import { Login } from './login';

export const SignInTemplate = () => {
  return (
    <div className="min-h-[100vh] flex flex-col lg:flex-row">
      <div className="hidden lg:block lg:w-1/2">
        <Template />
      </div>

      <div className="w-full lg:w-1/2">
        <Login />
      </div>
    </div>
  );
};
