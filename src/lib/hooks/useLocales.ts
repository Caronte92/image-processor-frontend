import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export function useLanguage() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();

    const changeLanguage = (newLocale: string) => {
        const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
        router.push(newPathname);
    };

    return {
        currentLocale,
        changeLanguage
    };
}