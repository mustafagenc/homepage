import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { PUBLIC_MAIL } from '@/lib/constants';

import type { Metadata } from 'next';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Privacy' });

    const baseMetadata = {
        title: t('Metadata.title'),
        description: t('Metadata.description'),
    };

    return {
        ...baseMetadata,
    };
}

export default function Page() {
    const t = useTranslations('Privacy');
    return (
        <section>
            <div className="mb-5">
                <h1 className="title">{t('title')}</h1>
                <p className="text-muted-foreground">{t('description')}</p>
            </div>

            <div className="mb-8 space-y-5">
                <div>
                    <h2 className="text-xl font-bold">{t('information-i-collect')}</h2>
                    <p className="text-muted-foreground">
                        {t('information-i-collect-description')}
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-bold">{t('how-i-use-information')}</h2>
                    <p className="text-muted-foreground">
                        {t('how-i-use-information-description')}
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-bold">{t('data-sharing-and-protection')}</h2>
                    <p className="text-muted-foreground">
                        {t('data-sharing-and-protection-description')}
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-bold">{t('contact-details')}</h2>
                    <p className="text-muted-foreground">
                        {t.rich('contact-details-description', {
                            email: () => (
                                <Link
                                    href={`mailto:${PUBLIC_MAIL}`}
                                    className="text-muted-foreground hover:text-foreground font-medium underline underline-offset-4 hover:transition"
                                >
                                    {PUBLIC_MAIL}
                                </Link>
                            ),
                        })}
                    </p>
                </div>
            </div>

            <Link
                href="/contact"
                className={buttonVariants({
                    variant: 'secondary',
                })}
            >
                {t('contact-me')}
            </Link>
        </section>
    );
}
