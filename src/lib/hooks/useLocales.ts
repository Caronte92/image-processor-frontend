import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export function useLanguage() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const changeLanguage = (newLocale: string) => {
    console.log(pathname);
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return {
    currentLocale,
    changeLanguage
  };
}