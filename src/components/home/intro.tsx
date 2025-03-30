import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Link } from '@/i18n/navigation';

import { CustomHoverCard } from '../shared/custom-hover-card';

export const Intro = () => {
  const t = useTranslations('Home');
  return (
    <section>
      <div className="flex flex-col gap-y-4 md:flex-row md:items-center md:gap-x-10">
        <div className="flex-1">
          <h1 className="title mb-2 no-underline">
            {t('hey')}{' '}
            <span role="img" aria-label="waving hand">
              🖖{' '}
            </span>
          </h1>
          <p className="subtitle text-muted-foreground mb-6 text-xl font-semibold">
            {t('title')}{' '}
          </p>

          <div className="my-2 leading-7 font-medium text-pretty text-zinc-800 dark:text-zinc-300">
            {t.rich('description', {
              br: () => <br />,
              Work: (chunks) => (
                <Link
                  href="/work"
                  className="font-bold hover:text-foreground hover:underline hover:underline-offset-2 hover:transition"
                >
                  {chunks}
                </Link>
              ),
              enkacard: () => (
                <CustomHoverCard
                  triggerText="ENKA İnşaat ve Sanayi A.Ş."
                  title="ENKA İnşaat ve Sanayi A.Ş."
                  description={t('enka')}
                  dateText={t('enka-date')}
                  avatarSrc="/images/enka.png"
                  avatarFallback="FCC"
                  extenalLink="https://www.enka.com/"
                />
              ),
              egemcard: () => (
                <CustomHoverCard
                  triggerText="EGEM"
                  title="EGEM"
                  description={t('egem')}
                  dateText={t('egem-date')}
                  avatarSrc="/images/egem.png"
                  avatarFallback="FCC"
                  extenalLink="https://www.enkasystems.com/solutions/egem-global-equipment-management-system/"
                />
              ),
            })}
          </div>
        </div>

        {/* Desktop Profile Image */}
        <div className="hidden md:block">
          <Image
            className="rounded-full"
            src="/images/mustafa-genc.jpg"
            alt="Profile photo of Mustafa Genç"
            width={175}
            height={175}
            priority
            sizes="175px"
          />
        </div>
      </div>
    </section>
  );
};
