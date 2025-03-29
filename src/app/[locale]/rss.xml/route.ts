import { getBlogPostsCardMeta } from '@/lib/apis/hashnode';
import { BASE_URL, PUBLIC_MAIL } from '@/lib/constants';
import { getProjectsMetadata } from '@/lib/projects';
import { getTranslations } from 'next-intl/server';
import RSS from 'rss';
import { getLocale } from 'next-intl/server';

export async function GET() {
  const locale = await getLocale();
  const t = await getTranslations('RSS');

  const feedConfig = {
    title: t('title'),
    description: t('description'),
    site_url: new URL(BASE_URL).toString(),
    feed_url: new URL('/rss.xml', BASE_URL).toString(),
    image_url: new URL('/images/mustafa-genc.jpg', BASE_URL).toString(),
    author: t('author', { email: PUBLIC_MAIL }),
    copyright: t('copyright', { date: new Date().getFullYear() }),
    pubDate: new Date('2025-03-29T00:00:00Z'),
    language: locale,
    categories: [t('blog'), t('project')],
    generator: t('generator'),
    ttl: 1,
  };

  const rss = new RSS({
    ...feedConfig,
    managingEditor: feedConfig.author,
    webMaster: feedConfig.author,
  });

  const createRSSItem = ({
    title,
    description,
    url,
    date,
    author,
    category,
  }: {
    title: string;
    description: string;
    url: string;
    date: Date;
    author: string;
    category: string;
  }) => {
    rss.item({
      title,
      description,
      url,
      date,
      author,
      categories: [category],
    });
  };

  // Add blog posts to RSS feed
  const { blogs } = await getBlogPostsCardMeta({ all: true });
  blogs.forEach((blog) => {
    createRSSItem({
      title: blog.title,
      description: blog.brief ? blog.brief : t('blogby', { title: blog.title }),
      url: new URL(`/blogs/${blog.slug}`, BASE_URL).toString(),
      date: new Date(blog.publishedAt),
      author: blog.author.name,
      category: t('blog'),
    });
  });

  const projects = getProjectsMetadata({ all: true });
  projects.forEach((project) => {
    createRSSItem({
      title: project.title,
      description:
        project.description ?? t('projectby', { title: project.title }),
      url: new URL(`/projects/${project.title}`, BASE_URL).toString(),
      date: new Date(project.updated_at || project.created_at),
      author: project.author ?? t('title'),
      category: t('project'),
    });
  });

  const xml = rss.xml();
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    },
  });
}
