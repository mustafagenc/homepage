import { getTranslations } from 'next-intl/server';

import { Intro } from '@/components/home/intro';
import { NewsletterForm } from '@/components/contact/newsletter-form';
import { Socials } from '@/components/shared/socials';
import {
  BASE_URL,
  PAGE_INDEX_DEFAULT,
  RECENT_BLOGS_DEFAULT,
  RECENT_PROJECTS_DEFAULT,
} from '@/lib/constants';

import { getBlogPostsCardMeta } from '@/lib/apis/hashnode';
import RecentBlogs from '@/components/blogs/recent-blogs';
import { getProjectsMetadata } from '@/lib/projects';
import RecentProjects from '@/components/projects/recent-projects';

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
