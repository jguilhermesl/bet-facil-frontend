import clsx from 'clsx';

export const GameResultFlag = ({ result }: any) => {
  return (
    <span
      className={clsx(
        'flex items-center justify-center h-4 w-4 rounded-lg text-white',
        {
          'bg-green-500': result === 'V',
          'bg-orange-500': result === 'E',
          'bg-red-700': result === 'D',
        }
      )}
    >
      {result}
    </span>
  );
};
