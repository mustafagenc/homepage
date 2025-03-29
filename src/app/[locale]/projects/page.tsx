import { getTranslations } from 'next-intl/server';
import { FilterIcon } from '@/components/icons/filter';
import { PaginationControls } from '@/components/shared/pagination-controls';
import { FilterDropdown } from '@/components/shared/filter-dropdown';
import { Search } from '@/components/shared/search';
import { Projects } from '@/components/projects/projects';
import {
  DEBOUNCE_TIME_PROJECTS,
  PAGE_QUERY_PARAM,
  PER_PAGE_QUERY_PARAM,
  PROJECTS_PER_PAGE_DEFAULT,
  SEARCH_QUERY_PARAM,
} from '@/lib/constants';
import { getProjectsCount, getProjectsMetadata } from '@/lib/projects';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { parseQueryParams } from '@/lib/params';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Projects' });

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
  const t = await getTranslations('Projects');

  const { perPageQuery, pageQuery, searchQuery } = await parseQueryParams({
    searchParams,
    defaultPerPage: PROJECTS_PER_PAGE_DEFAULT,
    endpoint: 'projects',
  });

  const projectsMeta = searchQuery
    ? getProjectsMetadata({ all: true })
    : getProjectsMetadata({ page: pageQuery, perPage: perPageQuery });

  const filteredProjectsMeta = searchQuery
    ? projectsMeta.filter(
        (projectMeta) =>
          projectMeta.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          projectMeta.language
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    : projectsMeta;

  const filteredProjectsLength = filteredProjectsMeta.length;

  const projectsLength = searchQuery
    ? filteredProjectsLength
    : getProjectsCount();

  const totalPages = Math.max(Math.ceil(projectsLength / perPageQuery), 0);

  // Redirect if pageQuery exceeds totalPages
  if (totalPages > 0 && pageQuery > totalPages) {
    const params = new URLSearchParams(
      searchParams as unknown as Record<string, string>
    );
    params.set(PAGE_QUERY_PARAM, String(totalPages));
    redirect(`/projects?${params.toString()}`);
  }

  // Paginate the filtered results
  const paginatedFilteredProjectsMeta = filteredProjectsMeta.slice(
    (pageQuery - 1) * perPageQuery,
    pageQuery * perPageQuery
  );

  // Update the count displayed to the user
  const noOfPostsShownAlready =
    filteredProjectsLength === 0
      ? 0
      : searchQuery
        ? paginatedFilteredProjectsMeta.length + (pageQuery - 1) * perPageQuery
        : filteredProjectsLength + (pageQuery - 1) * perPageQuery;

  return (
    <section className="object-fill">
      <h1 className="title">{t('title')}</h1>
      <Suspense
        fallback={
          <Input
            disabled
            type="text"
            placeholder="Loading.."
            className="mb-4 h-9 w-full sm:w-1/2"
          />
        }
      >
        <Search
          query={searchQuery}
          debounceTime={DEBOUNCE_TIME_PROJECTS}
          endpoint="projects"
          placeholder="Search projects by name or language..."
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
        <FilterDropdown
          endpoint="projects"
          defaultPerPage={PROJECTS_PER_PAGE_DEFAULT}
        />
      </Suspense>

      <PaginationControls
        searchTerm={searchQuery}
        currentPage={pageQuery}
        totalPages={totalPages}
        perPage={perPageQuery}
        endpoint="projects"
      />

      <div className="mb-10 mt-5 flex justify-between text-sm font-medium text-muted-foreground">
        <p>
          Showing {noOfPostsShownAlready} of{' '}
          {searchQuery ? filteredProjectsLength : projectsLength} projects
        </p>
        <p>
          Page {totalPages === 0 ? 0 : pageQuery} of {totalPages}
        </p>
      </div>

      <Projects
        projectsMeta={
          searchQuery ? paginatedFilteredProjectsMeta : projectsMeta
        }
        searchParams={{
          [SEARCH_QUERY_PARAM]: searchQuery,
          [PAGE_QUERY_PARAM]: pageQuery.toString(),
          [PER_PAGE_QUERY_PARAM]: perPageQuery.toString(),
        }}
      />
    </section>
  );
}
