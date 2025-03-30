'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IBlogCardMetadata } from '@/types/iBlog';
import { UserAvatar } from '@/components/shared/user-avatar';
import { Badge } from '@/components/ui/badge';
import { BookIcon } from '@/components/icons/book';
import {
  PAGE_INDEX_DEFAULT,
  PAGE_QUERY_PARAM,
  PER_PAGE_QUERY_PARAM,
  SEARCH_QUERY_PARAM,
} from '@/lib/constants';
import { useFormatter, useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';

interface BlogCardProps {
  blogWithMeta: IBlogCardMetadata;
  searchParams?: {
    [SEARCH_QUERY_PARAM]?: string;
    [PAGE_QUERY_PARAM]?: string;
    [PER_PAGE_QUERY_PARAM]?: string;
  };
}

export const BlogCard = ({ blogWithMeta, searchParams }: BlogCardProps) => {
  const router = useRouter();

  const { title, author, tags, brief, slug, readTimeInMinutes, publishedAt } =
    blogWithMeta;

  const t = useTranslations('Blogs');

  const handleBadgeClick = (language: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(SEARCH_QUERY_PARAM, language);
    params.set(PAGE_QUERY_PARAM, PAGE_INDEX_DEFAULT.toString());
    router.push(`/blogs?${params.toString()}`);
  };

  const format = useFormatter();
  const publishedDate = format.dateTime(new Date(publishedAt), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="w-full border-none bg-zinc-50 dark:bg-zinc-900">
      <div className="flex flex-1 flex-col justify-between">
        <CardHeader>
          <Link
            className="flex flex-col"
            href={{
              pathname: `/blogs/${slug}`,
              ...(searchParams && {
                query: {
                  ...(searchParams[SEARCH_QUERY_PARAM]
                    ? { [SEARCH_QUERY_PARAM]: searchParams[SEARCH_QUERY_PARAM] }
                    : {}),
                  ...(searchParams[PAGE_QUERY_PARAM]
                    ? { [PAGE_QUERY_PARAM]: searchParams[PAGE_QUERY_PARAM] }
                    : {}),
                  ...(searchParams[PER_PAGE_QUERY_PARAM]
                    ? {
                        [PER_PAGE_QUERY_PARAM]:
                          searchParams[PER_PAGE_QUERY_PARAM],
                      }
                    : {}),
                },
              }),
            }}
          >
            <CardTitle className="text-lg font-semibold hover:underline hover:underline-offset-4">
              {title}
            </CardTitle>
          </Link>
          {tags && tags.length > 0 ? (
            <div className="flex flex-wrap gap-2 py-2">
              {tags.map((tag) => (
                <Badge
                  key={tag.name}
                  variant="secondary"
                  className="cursor-pointer text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-400"
                  onClick={() => handleBadgeClick(tag.name)}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          ) : null}
        </CardHeader>

        {brief && (
          <Link className="flex flex-col" href={`/blogs/${slug}`}>
            <CardContent className="prose max-w-full text-zinc-700 dark:text-zinc-400">
              {brief}
            </CardContent>
          </Link>
        )}

        <CardFooter className="text-muted-foreground text-sm">
          <Link href="/contact" className="flex items-center">
            <UserAvatar className="size-7 sm:mr-2" />
            {author ? (
              <span className="hidden text-sm hover:underline hover:underline-offset-2 sm:inline">
                {author.name}
              </span>
            ) : null}
          </Link>

          <span className="divider mx-1">•</span>

          <span className="flex items-center gap-1">
            <BookIcon className="size-4" />
            {t('read-time', { readTimeInMinutes })}
          </span>

          <span className="divider mx-1">•</span>

          <span>{publishedDate}</span>
        </CardFooter>
      </div>
    </Card>
  );
};
