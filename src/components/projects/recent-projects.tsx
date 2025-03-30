import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Projects } from '@/components/projects/projects';
import { IProjectMetadata } from '@/types/iProject';

interface RecentProjectsProps {
  projectsMeta: IProjectMetadata[];
}

export default function RecentPosts({ projectsMeta }: RecentProjectsProps) {
  const t = useTranslations('Projects');

  return (
    <section className="my-16">
      <h2 className="title">{t('recent-projects')}</h2>
      <Projects projectsMeta={projectsMeta} />

      <Link
        href="/projects"
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
      >
        <span className="text-muted-foreground underline underline-offset-4 hover:text-foreground hover:transition">
          {t('all-projects')}
        </span>
      </Link>
    </section>
  );
}
