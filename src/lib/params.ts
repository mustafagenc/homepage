import { PAGE_INDEX_DEFAULT } from '@/lib/constants';

export interface ParsedQueryParams {
  pageQuery: number;
  perPageQuery: number;
  searchQuery: string | undefined;
}

interface ParseQueryParamsOptions {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  defaultPageIndex?: number;
  defaultPerPage: number;
  endpoint: 'blogs' | 'projects';
}

export async function parseQueryParams({
  searchParams,
  defaultPageIndex = PAGE_INDEX_DEFAULT,
  defaultPerPage,
}: ParseQueryParamsOptions): Promise<ParsedQueryParams> {
  const params = await searchParams;
  const pageQueryRaw = params?.page;
  const perPageQueryRaw = params?.perPage;

  const pageQuery =
    typeof pageQueryRaw === 'string' && !isNaN(Number(pageQueryRaw))
      ? Math.max(Number(pageQueryRaw), 1)
      : defaultPageIndex;

  const perPageQuery =
    typeof perPageQueryRaw === 'string' && !isNaN(Number(perPageQueryRaw))
      ? Math.max(Number(perPageQueryRaw), 1)
      : defaultPerPage;

  const searchQuery =
    typeof params?.q === 'string' ? params.q.trim() : undefined;

  return {
    pageQuery,
    perPageQuery,
    searchQuery,
  };
}
