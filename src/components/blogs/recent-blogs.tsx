import { Blogs } from '@/components/blogs/blogs';
import { Link } from '@/i18n/navigation';
import { IBlogCardMetadata } from '@/types/iBlog';
import { useTranslations } from 'next-intl';

interface RecentPostsProps {
  blogPosts: IBlogCardMetadata[];
}

export default function RecentBlogs({ blogPosts }: RecentPostsProps) {
  const t = useTranslations('Blogs');

  return (
    <section className="my-16">
      <h2 className="title">{t('recent-blogs')}</h2>
      <Blogs blogsWithMeta={blogPosts} />

      <Link
        href="/blogs"
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
      >
        <span className="text-muted-foreground underline underline-offset-4 hover:text-foreground hover:transition">
          {t('all-blogs')}
        </span>
      </Link>
    </section>
  );
}
