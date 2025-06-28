import { getTranslations } from 'next-intl/server';

import { BlogCard } from '@/components/blogs/blog-card';
import { PAGE_QUERY_PARAM, PER_PAGE_QUERY_PARAM, SEARCH_QUERY_PARAM } from '@/lib/constants';
import { IBlogCardMetadata } from '@/types/iBlog';

interface BlogsProps {
    blogsWithMeta: IBlogCardMetadata[];
    searchParams?: {
        [SEARCH_QUERY_PARAM]?: string;
        [PAGE_QUERY_PARAM]?: string;
        [PER_PAGE_QUERY_PARAM]?: string;
    };
}

export const Blogs = async ({ blogsWithMeta, searchParams }: BlogsProps) => {
    const resolvedBlogsWithMeta = await blogsWithMeta;
    const resolvedSearchParams = await searchParams;
    const t = await getTranslations('Blogs');
    return (
        <>
            {resolvedBlogsWithMeta && resolvedBlogsWithMeta.length === 0 ? (
                <p className="text-muted-foreground text-sm font-medium">{t('no-results-found')}</p>
            ) : (
                <ul className="flex flex-col gap-8">
                    {resolvedBlogsWithMeta?.length &&
                        resolvedBlogsWithMeta.map((blogMeta) => (
                            <li key={`${blogMeta.slug}_${blogMeta.readTimeInMinutes}`}>
                                <BlogCard
                                    blogWithMeta={blogMeta}
                                    searchParams={resolvedSearchParams}
                                />
                            </li>
                        ))}
                </ul>
            )}
        </>
    );
};
