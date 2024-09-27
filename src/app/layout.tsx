import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/styles/globals.css';
import { App } from './app';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '600'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Meus processos',
  description: 'Gerencie seus clientes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <App>{children}</App>
      </body>
    </html>
  );
}
