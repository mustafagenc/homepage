import { FilterIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { Blogs } from '@/components/blogs/blogs';
import { FilterDropdown } from '@/components/shared/filter-dropdown';
import { PaginationControls } from '@/components/shared/pagination-controls';
import { Search } from '@/components/shared/search';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { redirect } from '@/i18n/navigation';
import { getBlogPostsCardMeta, getBlogPostsCount } from '@/lib/apis/hashnode';
import {
    BLOGS_PER_PAGE_DEFAULT,
    DEBOUNCE_TIME_BLOGS,
    PAGE_QUERY_PARAM,
    PER_PAGE_QUERY_PARAM,
    SEARCH_QUERY_PARAM,
} from '@/lib/constants';
import { parseQueryParams } from '@/lib/params';

import type { Metadata } from 'next';
type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Blogs' });

    const baseMetadata = {
        title: t('Metadata.title'),
        description: t('Metadata.description'),
    };

    return baseMetadata;
}

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const t = await getTranslations();

    const { perPageQuery, pageQuery, searchQuery } = await parseQueryParams({
        searchParams,
        defaultPerPage: BLOGS_PER_PAGE_DEFAULT,
        endpoint: 'blogs',
    });

    const { blogs } = searchQuery
        ? await getBlogPostsCardMeta({ all: true })
        : await getBlogPostsCardMeta({ page: pageQuery, pageSize: perPageQuery });

    const filteredBlogs = searchQuery
        ? {
              blogs: blogs.filter(
                  (blog) =>
                      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      blog.tags?.some((tag) =>
                          tag.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
              ),
          }
        : { blogs };

    const filteredBlogsLength = filteredBlogs.blogs.length;

    const blogslength = searchQuery ? filteredBlogsLength : await getBlogPostsCount();

    const totalPages = Math.max(Math.ceil(blogslength / perPageQuery), 0);

    if (totalPages > 0 && pageQuery > totalPages) {
        const params = new URLSearchParams((await searchParams) as Record<string, string>);
        params.set(PAGE_QUERY_PARAM, String(totalPages));
        redirect({
            href: `/blogs?${params.toString()}`,
            locale: 'en',
        });
    }

    const paginatedFilteredBlogs = filteredBlogs.blogs.slice(
        (pageQuery - 1) * perPageQuery,
        pageQuery * perPageQuery
    );

    const noOfBlogsShownAlready =
        filteredBlogsLength === 0
            ? 0
            : searchQuery
              ? paginatedFilteredBlogs.length + (pageQuery - 1) * perPageQuery
              : filteredBlogsLength + (pageQuery - 1) * perPageQuery;

    return (
        <section>
            <h1 className="title">{t('Blogs.title')}</h1>

            <Suspense
                fallback={
                    <Input
                        disabled
                        type="text"
                        placeholder={t('Shared.loading')}
                        className="mb-4 h-9 w-full sm:w-1/2"
                    />
                }
            >
                <Search
                    query={searchQuery}
                    endpoint="blogs"
                    debounceTime={DEBOUNCE_TIME_BLOGS}
                    placeholder={t('Blogs.search-blogs')}
                />
            </Suspense>

            <Suspense
                fallback={
                    <Button
                        disabled
                        variant="outline"
                        className="flex items-center gap-1 text-zinc-700 dark:text-zinc-400"
                    >
                        Filter
                        <FilterIcon className="size-4" />
                    </Button>
                }
            >
                <FilterDropdown endpoint="blogs" defaultPerPage={BLOGS_PER_PAGE_DEFAULT} />
            </Suspense>

            <PaginationControls
                searchTerm={searchQuery}
                currentPage={pageQuery}
                totalPages={totalPages}
                perPage={perPageQuery}
                endpoint="blogs"
            />

            <div className="text-muted-foreground mt-5 mb-10 flex justify-between text-sm font-medium">
                <p>
                    {t('Blogs.showing', {
                        noOfBlogsShownAlready: noOfBlogsShownAlready,
                        length: searchQuery ? filteredBlogsLength : blogslength,
                    })}
                </p>
                <p>
                    {t('Blogs.showing-page', {
                        pageQuery: totalPages === 0 ? 0 : pageQuery,
                        totalPages: totalPages,
                    })}
                </p>
            </div>

            <Blogs
                blogsWithMeta={searchQuery ? paginatedFilteredBlogs : blogs}
                searchParams={{
                    [SEARCH_QUERY_PARAM]: searchQuery,
                    [PAGE_QUERY_PARAM]: pageQuery.toString(),
                    [PER_PAGE_QUERY_PARAM]: perPageQuery.toString(),
                }}
            />
        </section>
    );
}
