import { getTranslations } from 'next-intl/server';

import { PAGE_QUERY_PARAM, PER_PAGE_QUERY_PARAM, SEARCH_QUERY_PARAM } from '@/lib/constants';
import { IProjectMetadata } from '@/types/iProject';

import { ProjectCard } from './project-card';

interface ProjectsProps {
    projectsMeta: IProjectMetadata[];
    searchParams?: {
        [SEARCH_QUERY_PARAM]?: string;
        [PAGE_QUERY_PARAM]?: string;
        [PER_PAGE_QUERY_PARAM]?: string;
    };
}

export const Projects = async ({ projectsMeta, searchParams }: ProjectsProps) => {
    const t = await getTranslations('Projects');

    return (
        <>
            {projectsMeta.length === 0 ? (
                <p className="text-muted-foreground text-sm font-medium">{t('no-results-found')}</p>
            ) : (
                <ul className="flex flex-col gap-8">
                    {projectsMeta.map((projectMeta) => (
                        <li key={`${projectMeta.title}_${projectMeta.created_at}`}>
                            <ProjectCard
                                projectMetadata={projectMeta}
                                searchParams={searchParams}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};
