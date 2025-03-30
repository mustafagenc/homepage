import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Work' });

  const baseMetadata = {
    title: t('Metadata.title'),
    description: t('Metadata.description'),
  };

  return baseMetadata;
}

export default function Page() {
  const t = useTranslations('Work');

  return (
    <section>
      <h1 className="title">{t('title')}</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra
        ac neque vitae mollis. Phasellus iaculis, arcu aliquet fermentum
        pulvinar, quam libero dapibus sapien, sed fringilla mi lectus id lacus.
        Nulla facilisi. Sed semper, lacus vitae semper sodales, nunc massa
        rutrum nulla, quis sodales massa ex quis ante. Morbi laoreet nibh sit
        amet pellentesque pulvinar. Pellentesque at velit ex. Etiam faucibus
        risus id cursus laoreet. Integer iaculis nunc ut volutpat pretium.
        Suspendisse euismod ornare tempor.
      </p>
    </section>
  );
}
