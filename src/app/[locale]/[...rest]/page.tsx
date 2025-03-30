import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ArrowLeftIcon } from '@/components/icons/arrowLeft';

export default function NotFoundPage() {
  const t = useTranslations('NotFound');
  return (
    <div className="mt-40 mb-20 flex flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-bold text-muted-foreground">{t('title')}</h1>
      <p className="mt-4 text-xl text-muted-foreground">{t('description')}</p>
      <Link
        href="/"
        className={buttonVariants({
          size: 'lg',
          variant: 'outline',
          className: 'mt-4 text-muted-foreground',
        })}
      >
        <ArrowLeftIcon className="size-5" />
        {t('go-back')}
      </Link>
    </div>
  );
}
