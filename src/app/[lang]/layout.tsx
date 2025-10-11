import ClientLayout from '@/app/ClientLayout';
import { getMessages } from 'next-intl/server';

interface ILayoutProps {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}

export default async function RootLayout({ children, params }: ILayoutProps) {
  const { lang } = await params;
  const messages = await getMessages({ locale: lang });

  return (
    <html lang={lang}>
      <body>
        <ClientLayout messages={messages} locale={lang}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
