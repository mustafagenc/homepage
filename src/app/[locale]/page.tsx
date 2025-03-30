import { getTranslations } from 'next-intl/server';

import RecentBlogs from '@/components/blogs/recent-blogs';
import { NewsletterForm } from '@/components/contact/newsletter-form';
import { Intro } from '@/components/home/intro';
import RecentProjects from '@/components/projects/recent-projects';
import { Socials } from '@/components/shared/socials';
import { getBlogPostsCardMeta } from '@/lib/apis/hashnode';
import {
  BASE_URL,
  PAGE_INDEX_DEFAULT,
  RECENT_BLOGS_DEFAULT,
  RECENT_PROJECTS_DEFAULT,
} from '@/lib/constants';
import { getProjectsMetadata } from '@/lib/projects';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
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

export default async function Page() {
  const { blogs } = await getBlogPostsCardMeta({
    page: PAGE_INDEX_DEFAULT,
    pageSize: RECENT_BLOGS_DEFAULT,
  });

  const projects = getProjectsMetadata({
    page: PAGE_INDEX_DEFAULT,
    perPage: RECENT_PROJECTS_DEFAULT,
  });

  return (
    <>
      <Intro />
      <Socials />
      <RecentBlogs blogPosts={blogs} />
      <RecentProjects projectsMeta={projects} />
      <NewsletterForm />
    </>
  );
}
