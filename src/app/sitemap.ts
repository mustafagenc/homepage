import { getBlogPostsCardMeta } from '@/lib/apis/hashnode';
import { BASE_URL, ROUTES } from '@/lib/constants';
import { getProjectsMetadata } from '@/lib/projects';

import type { MetadataRoute } from 'next';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes = ROUTES.map((route) => {
        const normalizedRoute = `${route.replace(/^\/|\/$/g, '')}`;
        return {
            url: new URL(normalizedRoute.replace(/\/+$/, ''), BASE_URL).toString(),
            lastModified: new Date('2025-03-29T00:00:00Z').toISOString(),
        };
    });

    let blogPostsMetadata: MetadataRoute.Sitemap = [];
    try {
        const { blogs } = await getBlogPostsCardMeta({ all: true });
        blogPostsMetadata = blogs
            .filter((blog) => blog?.slug && (blog.updatedAt || blog.publishedAt))
            .map((blog) => ({
                url: new URL(`/blogs/${blog.slug}`, BASE_URL).toString(),
                lastModified: new Date(blog.updatedAt ?? blog.publishedAt).toISOString(),
            }));
    } catch (error) {
        console.error('Error fetching blog posts for sitemap:', error);
    }

    let projectsMetadata: MetadataRoute.Sitemap = [];
    try {
        const projects = getProjectsMetadata({ all: true });
        projectsMetadata = projects
            .filter((project) => project?.title && (project.updated_at || project.created_at))
            .map((project) => ({
                url: new URL(`/projects/${project.title}`, BASE_URL).toString(),
                lastModified: new Date(project.updated_at ?? project.created_at).toISOString(),
            }));
    } catch (error) {
        console.error('Error fetching projects for sitemap:', error);
    }

    return [...staticRoutes, ...blogPostsMetadata, ...projectsMetadata];
}
