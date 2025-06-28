import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { PAGE_QUERY_PARAM, PER_PAGE_QUERY_PARAM, SEARCH_QUERY_PARAM } from '@/lib/constants';

interface PaginationControlProps {
    searchTerm?: string;
    currentPage: number;
    totalPages: number;
    perPage?: number;
    endpoint: 'projects' | 'blogs';
}

export const PaginationControls = ({
    searchTerm,
    currentPage,
    totalPages,
    perPage = 5,
    endpoint,
}: PaginationControlProps) => {
    const t = useTranslations('Shared');

    return (
        <nav aria-label="Pagination" className="mt-3 flex justify-between">
            {currentPage > 1 && (currentPage < totalPages || currentPage === totalPages) ? (
                <Link
                    href={{
                        pathname: endpoint,
                        query: {
                            ...(searchTerm ? { [SEARCH_QUERY_PARAM]: searchTerm } : {}),
                            [PAGE_QUERY_PARAM]: currentPage - 1,
                            [PER_PAGE_QUERY_PARAM]: perPage,
                        },
                    }}
                    scroll={false}
                    className="text-muted-foreground inline-flex items-center text-sm font-semibold underline underline-offset-4 hover:text-zinc-500"
                >
                    {t('previous')}
                </Link>
            ) : (
                <button
                    disabled
                    aria-disabled
                    className="text-muted-foreground text-sm font-semibold opacity-75"
                >
                    {t('previous')}
                </button>
            )}

            {currentPage < totalPages ? (
                <Link
                    href={{
                        pathname: endpoint,
                        query: {
                            ...(searchTerm ? { [SEARCH_QUERY_PARAM]: searchTerm } : {}),
                            [PAGE_QUERY_PARAM]: currentPage + 1,
                            [PER_PAGE_QUERY_PARAM]: perPage,
                        },
                    }}
                    scroll={false}
                    className="text-muted-foreground inline-flex items-center text-sm font-semibold underline underline-offset-4 hover:text-zinc-500"
                >
                    {t('next')}
                </Link>
            ) : (
                <button
                    disabled
                    aria-disabled
                    className="text-muted-foreground text-sm font-semibold opacity-75"
                >
                    {t('next')}
                </button>
            )}
        </nav>
    );
};
