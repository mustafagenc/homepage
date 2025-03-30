import { getFormatter, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { AlertIcon } from '@/components/icons/alert';
import { ArrowLeftIcon } from '@/components/icons/arrowLeft';
import { ArrowUpRightIcon } from '@/components/icons/arrowUpRight';
import { BackButton } from '@/components/shared/back-button';
import MDXContent from '@/components/shared/mdx-content';
import { UserAvatar } from '@/components/shared/user-avatar';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BASE_URL, PROJECT_FILTER_TOPIC } from '@/lib/constants';
import { getProjectByTitle } from '@/lib/projects';

type Params = Promise<{ projectName: string; locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { projectName } = await params;

  const DEFAULT_METADATA = {
    title: projectName,
    description: 'A project by Mustafa Genç showcasing work and skills.',
  } as const;

  try {
    const project = getProjectByTitle({ title: projectName });

    if (!project) throw new Error(`Project not found: ${projectName}`);

    const { title, description } = project.metadata;

    const baseMetadata = {
      title,
      description: description || DEFAULT_METADATA.description,
    };

    return {
      ...baseMetadata,
      openGraph: {
        ...baseMetadata,
        url: new URL(`/projects/${projectName}`, BASE_URL).toString(),
      },
      twitter: {
        ...baseMetadata,
        card: 'summary_large_image',
      },
    };
  } catch (error) {
    console.error(
      `Error generating dynamic metadata for project: ${projectName}: `,
      error
    );

    return {
      ...DEFAULT_METADATA,
      openGraph: {
        ...DEFAULT_METADATA,
        url: new URL(`/projects/${projectName}`, BASE_URL).toString(),
      },
      twitter: {
        ...DEFAULT_METADATA,
        card: 'summary_large_image',
      },
    };
  }
}

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const { projectName } = await params;
  try {
    const project = getProjectByTitle({ title: projectName });
    const t = await getTranslations('Projects');
    if (!project) notFound();

    const { metadata, content } = project;

    const { title, author, clone_url, homepage, topics, created_at } = metadata;

    const format = await getFormatter();
    const formattedCreatedDate = format.dateTime(new Date(created_at), {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <section className="pb-10">
        <Suspense
          fallback={
            <Button disabled variant="secondary" className="mb-8 flex gap-2">
              <ArrowLeftIcon className="size-5" />
              {t('back-to-projects')}
            </Button>
          }
        >
          <BackButton endpoint="projects" />
        </Suspense>

        <header>
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <a
              href={clone_url}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:underline hover:underline-offset-4"
            >
              {title}
            </a>
          </h1>
          <div className="mt-3 flex items-center">
            <Link href="/contact" className="flex items-center">
              <UserAvatar className="size-8 sm:mr-2" />
              {author && (
                <span className="hidden text-sm font-semibold text-muted-foreground hover:underline hover:underline-offset-2 sm:inline">
                  {author}
                </span>
              )}
            </Link>
            <span className="divider mx-1">•</span>
            <a
              href={clone_url}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:underline hover:underline-offset-2"
            >
              {t('view-on-github')}
            </a>
            <span className="divider mx-1">•</span>
            {formattedCreatedDate && (
              <span className="text-sm text-muted-foreground">
                {formattedCreatedDate}
              </span>
            )}
          </div>

          {topics && topics?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {topics
                .filter((topic) => topic !== PROJECT_FILTER_TOPIC)
                .map((topic) => (
                  <Badge
                    key={topic}
                    className={badgeVariants({ variant: 'secondary' })}
                  >
                    {topic}
                  </Badge>
                ))}
            </div>
          )}
        </header>
        <main className="prose max-w-3xl dark:prose-invert">
          <Separator style={{ margin: '30px 0 20px 0' }} />
          {content.trim().length > 0 ? (
            <MDXContent projectName={projectName} source={content} />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
              <AlertIcon className="size-12 text-muted-foreground" />
              <div className="flex flex-col gap-4">
                <h2 className="m-0 text-xl font-semibold">No README Content</h2>
                <p className="text-muted-foreground">
                  This project doesn&apos;t have a README file yet or the file
                  has no content. Check the GitHub repository for more
                  information.
                </p>
              </div>
            </div>
          )}
        </main>

        <div className="mt-10 flex items-center gap-1 text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-1 hover:text-foreground hover:transition mr-2">
            <ArrowUpRightIcon className="size-4" />
            <a href={clone_url} target="_blank" rel="noreferrer noopener">
              GitHub
            </a>
          </div>
          <div className="flex items-center gap-1 hover:text-foreground hover:transition">
            <ArrowUpRightIcon className="size-4" />
            <a href={homepage} target="_blank" rel="noreferrer noopener">
              {t('live-demo')}
            </a>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error(`Error fetching project: ${projectName}`, error);
    notFound();
  }
}
