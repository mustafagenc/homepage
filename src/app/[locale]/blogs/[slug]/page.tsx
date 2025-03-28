import Image from 'next/image';
import { ArrowLeftIcon } from '@/components/icons/arrowLeft';
import { ArrowUpRightIcon } from '@/components/icons/arrowUpRight';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import MDXContent from '@/components/shared/mdx-content';
import { UserAvatar } from '@/components/shared/user-avatar';
import { notFound } from 'next/navigation';
import { BackButton } from '@/components/shared/back-button';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';

import { getBlogPostByID, getBlogPostIDBySlug } from '@/lib/apis/hashnode';
import { Link } from '@/i18n/navigation';

interface Props {
  params: {
    slug: string;
    locale: string;
  };
}

export default async function Page({ params: { slug, locale } }: Props) {
  try {
    console.log('Fetching post for slug:', slug);
    console.log('Locale:', locale);

    const postIdResponse = await getBlogPostIDBySlug(slug);
    console.log('Post ID Response:', postIdResponse);

    if (!postIdResponse) notFound();

    const { post } = await getBlogPostByID(postIdResponse.id);
    console.log('Post Data:', post);

    if (!post) notFound();

    return (
      <section className="pb-10">
        <Suspense
          fallback={
            <Button disabled variant="secondary" className="mb-8 flex gap-2">
              <ArrowLeftIcon className="size-5" />
              Back to blogs
            </Button>
          }
        >
          <BackButton endpoint="blogs" />
        </Suspense>

        {post.coverImage && post.coverImage.url ? (
          <div className="relative mb-6 w-full">
            <Image
              src={post.coverImage.url}
              alt={post.title}
              width={750}
              height={380}
              className="rounded-md object-cover"
              priority
              // Make sure that GIFs are set to unoptimized for the animation to work.
              unoptimized={post.coverImage.url.toLowerCase().endsWith('.gif')}
            />
          </div>
        ) : null}

        <header>
          <h1 className="text-3xl font-bold decoration-border/75 decoration-2">
            {post.title}
          </h1>

          {post.subtitle ? (
            <p className="py-3 text-xl font-semibold text-muted-foreground">
              {post.subtitle}
            </p>
          ) : null}

          <div className="mt-3 flex items-center">
            <Link href="/contact" className="flex items-center">
              <UserAvatar className="mr-2 size-8" />
              {post.author?.name ? (
                <span className="hidden text-sm font-semibold text-muted-foreground hover:underline hover:underline-offset-2 sm:inline">
                  {post.author?.name}
                </span>
              ) : null}
              <span className="divider mr-1 sm:mx-1">•</span>
            </Link>
            {post.publishedAt ? (
              <span className="text-sm text-muted-foreground">
                {formatDate({ date: post.publishedAt, short: false })}
              </span>
            ) : null}
          </div>

          {post.tags && post.tags.length > 0 ? (
            <div className="mt-4 flex flex-row flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge
                  key={tag.name}
                  variant="secondary"
                  className={'text-zinc-600 dark:text-zinc-300'}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          ) : null}
        </header>
        <main className="prose mt-12 max-w-3xl dark:prose-invert">
          <div className="prose dark:prose-invert">
            <MDXContent source={post.content.markdown} />
          </div>
        </main>
        <div className="mt-10 flex items-center gap-4 text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-1 hover:text-foreground hover:transition">
            <ArrowUpRightIcon className="size-4" />
            <a
              href={`https://mustafagenc.hashnode.dev/${slug}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              Hashnode
            </a>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error(`Error fetching blog post for slug: ${slug}`, error);
    notFound();
  }
}
