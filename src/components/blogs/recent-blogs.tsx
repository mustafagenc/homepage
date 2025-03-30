import { useTranslations } from 'next-intl';

import { Blogs } from '@/components/blogs/blogs';
import { Link } from '@/i18n/navigation';
import { IBlogCardMetadata } from '@/types/iBlog';

interface RecentPostsProps {
  blogPosts: IBlogCardMetadata[];
}

export default function RecentBlogs({ blogPosts }: RecentPostsProps) {
  const t = useTranslations('Blogs');

  return (
    <section className="my-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="recent-title">{t('recent-blogs')}</h2>
        <Link href="/blogs" className="text-sm font-semibold">
          <span className="text-muted-foreground decoration-border/75 underline underline-offset-4 hover:text-foreground hover:transition">
            {t('all-blogs')}
          </span>
        </Link>
      </div>
      <Blogs blogsWithMeta={blogPosts} />
    </section>
  );
}
