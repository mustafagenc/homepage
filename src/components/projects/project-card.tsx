'use client';

import { useFormatter, useTranslations } from 'next-intl';

import { ArrowUpRightIcon } from '@/components/icons/arrowUpRight';
import { GitHubIcon } from '@/components/icons/github';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Link, useRouter } from '@/i18n/navigation';
import {
    PAGE_INDEX_DEFAULT,
    PAGE_QUERY_PARAM,
    PER_PAGE_QUERY_PARAM,
    SEARCH_QUERY_PARAM,
} from '@/lib/constants';
import { capitalizeFirstLetter } from '@/lib/utils';
import { IProjectMetadata } from '@/types/iProject';

interface ProjectCardProps {
    projectMetadata: IProjectMetadata;
    searchParams?: {
        [SEARCH_QUERY_PARAM]?: string;
        [PAGE_QUERY_PARAM]?: string;
        [PER_PAGE_QUERY_PARAM]?: string;
    };
}

export const ProjectCard = ({ projectMetadata, searchParams }: ProjectCardProps) => {
    const router = useRouter();
    const t = useTranslations('Projects');
    const { title, clone_url, homepage, description, language, created_at } = projectMetadata;

    const format = useFormatter();
    const formattedCreatedDate = format.dateTime(new Date(created_at), {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleBadgeClick = (language: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(SEARCH_QUERY_PARAM, language);
        params.set(PAGE_QUERY_PARAM, PAGE_INDEX_DEFAULT.toString());
        router.push(`/projects?${params.toString()}`);
    };

    return (
        <Card className="w-full border-none bg-zinc-50 dark:bg-zinc-900">
            <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg font-semibold">
                    <div className="flex items-center gap-2">
                        <Link
                            href={{
                                pathname: `/projects/${title}`,
                                ...(searchParams && {
                                    query: {
                                        ...(searchParams[SEARCH_QUERY_PARAM]
                                            ? {
                                                  [SEARCH_QUERY_PARAM]:
                                                      searchParams[SEARCH_QUERY_PARAM],
                                              }
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
                            className="hover:underline hover:underline-offset-4"
                        >
                            {capitalizeFirstLetter(title)}
                        </Link>
                    </div>
                    <span className="divider hidden text-sm font-light sm:inline">
                        {formattedCreatedDate}
                    </span>
                </CardTitle>
                <CardDescription className="flex text-sm text-zinc-700 dark:text-zinc-400">
                    <div className="flex items-center">
                        <div className="flex items-center text-sm">
                            {language ? (
                                <>
                                    <Badge
                                        variant="secondary"
                                        className="mr-1 cursor-pointer text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-400"
                                        onClick={() => handleBadgeClick(language)}
                                    >
                                        {language}
                                    </Badge>
                                </>
                            ) : null}
                        </div>
                    </div>
                </CardDescription>
            </CardHeader>
            {description ? (
                <Link href={`/projects/${title}`}>
                    <CardContent className="prose max-w-full text-zinc-700 dark:text-zinc-400">
                        {description}
                    </CardContent>
                </Link>
            ) : null}
            <CardFooter className="flex">
                <a
                    href={clone_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={buttonVariants({
                        variant: 'outline',
                        className: 'mr-2',
                    })}
                >
                    <GitHubIcon className="size-5" />
                    <span className="ml-1 hidden sm:inline">GitHub</span>
                </a>

                {homepage ? (
                    <a
                        href={homepage}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={buttonVariants({
                            variant: 'outline',
                        })}
                    >
                        <ArrowUpRightIcon className="size-5" />
                        <span className="ml-1 hidden sm:inline">{t('live-demo')}</span>
                    </a>
                ) : null}
            </CardFooter>
        </Card>
    );
};
