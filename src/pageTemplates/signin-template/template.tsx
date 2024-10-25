'use client';

import { Paragraph } from '@/components/ui/paragraph';

export const Template = () => {
  return (
    <div className="min-h-[100vh] flex flex-col justify-between bg-green-700 p-4 lg:p-9">
      <div>
        <Paragraph className="text-white font-normal">
          Seja um parceiro e facilite seus jogos
        </Paragraph>
      </div>
      <div>
        <Paragraph className="text-white font-normal">
          © BET Fácil - 2024
        </Paragraph>
      </div>
    </div>
  );
};
