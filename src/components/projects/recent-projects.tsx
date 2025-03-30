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
      <div className="flex items-center justify-between mb-6">
        <h2 className="recent-title">{t('recent-projects')}</h2>
        <Link href="/projects" className="text-sm font-semibold">
          <span className="text-muted-foreground decoration-border/75 underline underline-offset-4 hover:text-foreground hover:transition">
            {t('all-projects')}
          </span>
        </Link>
      </div>
      <Projects projectsMeta={projectsMeta} />
    </section>
  );
}
