import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { CalMeet } from '@/components/contact/cal-meet';

import type { Metadata } from 'next';
type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Meet' });

    const baseMetadata = {
        title: t('Metadata.title'),
        description: t('Metadata.description'),
    };

    return {
        ...baseMetadata,
    };
}
export default function Page() {
    const t = useTranslations('Meet');

    return (
        <section>
            <h2 className="title">{t('title')}</h2>
            <div className="prose max-w-full">
                <CalMeet />
            </div>
        </section>
    );
}
