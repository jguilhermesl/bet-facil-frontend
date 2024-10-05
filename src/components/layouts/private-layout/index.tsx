import { ReactNode } from 'react';
import PizzaLogo from '@/assets/pizza-logo.jpeg';
import Image from 'next/image';
import Link from 'next/link';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';

interface IPrivateLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  actionsComponent?: ReactNode;
}

export const PrivateLayout = ({
  children,
  title,
  description,
  actionsComponent,
}: IPrivateLayoutProps) => {
  return (
    <div className="flex flex-col relative">
      <div className="flex h-20 w-full border border-b items-center px-10 md:px-40 justify-between">
        <div className="flex gap-16">
          <Link href="/">
            <Heading className="text-green-600 text-2xl">bet.facil</Heading>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/games">
              <Paragraph className="font-medium">Jogos</Paragraph>
            </Link>
            <Link href="/bets">
              <Paragraph className="font-medium">Bets</Paragraph>
            </Link>
            <Link href="/bets-management">
              <Paragraph className="font-medium">Gestão</Paragraph>
            </Link>
            <Link href="/reports">
              <Paragraph className="font-medium">Relatórios</Paragraph>
            </Link>
          </div>
        </div>
        <div className="h-10 w-10 rounded-full object-cover bg-emerald-700" />
      </div>
      <div className="flex flex-col relative py-12 w-full px-4 md:px-20">
        <Heading>{title}</Heading>
        <Paragraph>{description}</Paragraph>
        <div className="mt-12 w-full">{children}</div>
        <div className="absolute top-12 right-4 md:right-40">
          {actionsComponent}
        </div>
      </div>
    </div>
  );
};
