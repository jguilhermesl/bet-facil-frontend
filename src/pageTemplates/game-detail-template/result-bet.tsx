import { Paragraph } from '@/components/ui/paragraph';
import clsx from 'clsx';

export const ResultBet = ({ result }: any) => {
  return (
    <div
      className={clsx('py-1 px-4 rounded-full', {
        'bg-green-500': result === 'green',
        'bg-red-500': result === 'red',
        'bg-slate-400': result === 'progress',
      })}
    >
      <Paragraph className="font-bold text-white">
        {result.toUpperCase()}
      </Paragraph>
    </div>
  );
};
