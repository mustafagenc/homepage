import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { Contact } from '@/components/contact/contact';
import { PUBLIC_MAIL } from '@/lib/constants';

import type { Metadata } from 'next';
import { NewsletterForm } from '@/components/contact/newsletter-form';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });

  const baseMetadata = {
    title: t('Metadata.title'),
    description: t('Metadata.description'),
  };

  return {
    ...baseMetadata,
  };
}

export default function Page() {
  const t = useTranslations('Contact');
  return (
    <section>
      <h2 className="title">{t('title')}</h2>
      <div className="prose max-w-full">
        <p className="font-medium text-zinc-800 dark:text-zinc-300">
          {t.rich('description', {
            br: () => <br />,
            email: () => (
              <a
                href={`mailto:${PUBLIC_MAIL}`}
                className="text-muted-foreground hover:text-foreground font-medium underline underline-offset-4 hover:transition"
                target="_blank"
              >
                {PUBLIC_MAIL}
              </a>
            ),
          })}
        </p>
      </div>
      <Contact />
      <NewsletterForm />
    </section>
  );
}
