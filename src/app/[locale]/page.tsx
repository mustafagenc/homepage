import { getTranslations } from 'next-intl/server';

import { Intro } from '@/components/home/intro';
import { NewsletterForm } from '@/components/contact/newsletter-form';
import { Socials } from '@/components/shared/socials';
import { BASE_URL } from '@/lib/constants';

import type { Metadata } from 'next';
type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });

  const baseMetadata = {
    title: t('Metadata.title'),
    description: t('Metadata.description'),
  };

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata,
      url: new URL(BASE_URL).toString(),
    },
    twitter: {
      ...baseMetadata,
      card: 'summary_large_image',
    },
  };
}

export default async function Home() {
  return (
    <>
      <Intro />
      <Socials />
      <NewsletterForm />
    </>
  );
}
