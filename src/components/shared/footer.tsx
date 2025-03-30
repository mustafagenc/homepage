'use client';

import { useTranslations } from 'next-intl';
import GitHubButton from 'react-github-btn';

import { RSSIcon } from '@/components/icons/rss';
import { InfoTooltip } from '@/components/shared/info-tooltip';
import { Link } from '@/i18n/navigation';
import { VercelLogoIcon } from '@radix-ui/react-icons';

import { Spotify } from './spotify';

export const Footer = () => {
  const t = useTranslations('Footer');
  return (
    <footer className="pt-16 pb-10">
      <div className="md:flex md:items-center md:justify-between md:align-middle">
        <div className="flex justify-center space-x-6 md:order-2">
          <Spotify />
          <div className="mt-1">
            <GitHubButton
              href="https://github.com/mustafagenc/homepage/fork"
              data-color-scheme="no-preference: light; light: light; dark: dark;"
              data-show-count="true"
              aria-label="Fork mustafagenc/homepage on GitHub"
            >
              Fork
            </GitHubButton>
          </div>
          <InfoTooltip
            key="Vercel"
            label="Vercel"
            side="top"
            className="text-xs"
          >
            <Link
              href="https://vercel.org/"
              className="text-muted-foreground hover:text-foreground mt-1"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="sr-only">Vercel</span>
              <VercelLogoIcon className="size-5" />
            </Link>
          </InfoTooltip>
          <InfoTooltip key="RSS" label="RSS" side="top" className="text-xs">
            <Link
              target="_blank"
              href="/rss.xml"
              className="text-muted-foreground hover:text-foreground mt-1"
            >
              <span className="sr-only">RSS</span>
              <RSSIcon className="size-5" />
            </Link>
          </InfoTooltip>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-muted-foreground text-center text-base leading-5">
            {t.rich('copyright', { date: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
};
