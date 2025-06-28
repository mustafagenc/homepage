import { useTranslations } from 'next-intl';

import { ArrowLeftIcon } from '@/components/icons/arrowLeft';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default function NotFoundPage() {
    const t = useTranslations('NotFound');
    return (
        <div className="mt-40 mb-20 flex flex-col items-center justify-center text-center">
            <h1 className="text-muted-foreground text-9xl font-bold">{t('title')}</h1>
            <p className="text-muted-foreground mt-4 text-xl">{t('description')}</p>
            <Link
                href="/"
                className={buttonVariants({
                    size: 'lg',
                    variant: 'outline',
                    className: 'text-muted-foreground mt-4',
                })}
            >
                <ArrowLeftIcon className="size-5" />
                {t('go-back')}
            </Link>
        </div>
    );
}
