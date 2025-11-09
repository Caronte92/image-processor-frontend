import ClientLayout from '@/app/ClientLayout';
import { getMessages } from 'next-intl/server';
import { cookies } from 'next/headers';

interface ILayoutProps {
    params: Promise<{ lang: string }>;
    children: React.ReactNode;
}

export default async function RootLayout({ children, params }: ILayoutProps) {
    const { lang } = await params;
    const messages = await getMessages({ locale: lang });
    const cookieStore = await cookies();
    const themeCookie = cookieStore.get('theme')?.value;
    const initialThemeMode = themeCookie === 'dark' || themeCookie === 'light' ? themeCookie : 'light';

    return (
        <html lang={lang} suppressHydrationWarning>
            <body>
                <ClientLayout messages={messages} locale={lang} initialThemeMode={initialThemeMode}>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}
