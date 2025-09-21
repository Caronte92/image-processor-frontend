import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { Locale } from '../../i18n-config';

interface ILayoutProps {
  lang: Locale;
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children, params }: Readonly<{children: React.ReactNode; params: ILayoutProps}>) {
let lang = params.lang;

  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
