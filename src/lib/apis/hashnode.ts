import request, { gql } from 'graphql-request';
import { env } from '@/lib/env';
import {
  IBlogsCount,
  ISubscribeToNewsletterResponse,
  IBlogsMetadata,
  IBlogByIDResponse,
  IBlogPostIDBySlugResponse,
  IBlogCardMetadata,
  IBlogsSlugs,
} from '@/types/iBlog';
import {
  BLOGS_PER_PAGE_DEFAULT,
  HASHNODE_BLOGS_FETCH_LIMIT,
  HASHNODE_USERNAME,
  PAGE_INDEX_DEFAULT,
} from '@/lib/constants';

const QUERIES = {
  GET_POSTS_COUNT: gql`
    query getBlogPostsLength($username: String!) {
      user(username: $username) {
        posts(page: 1, pageSize: 1) {
          totalDocuments
        }
      }
    }
  `,
  GET_POST_BY_ID: gql`
    query getPostByID($id: ID!) {
      post(id: $id) {
        title
        subtitle
        readTimeInMinutes
        brief
        publishedAt
        seo {
          description
        }
        tags {
          name
        }
        coverImage {
          url
        }
        content {
          markdown
        }
        author {
          name
        }
      }
    }
  `,
  GET_POST_BY_SLUG: gql`
    query getPostBySlug($publicationHost: String!, $slug: String!) {
      publication(host: $publicationHost) {
        post(slug: $slug) {
          id
          title
          slug
        }
      }
    }
  `,
  GET_POST_BY_SLUG_ALT: gql`
    query getPostBySlug($username: String!) {
      user(username: $username) {
        posts(pageSize: 10, page: 1, sortBy: DATE_PUBLISHED_DESC) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    }
  `,
  GET_POST_BY_SLUG_DIRECT: gql`
    query getPostBySlug($slug: String!) {
      post(slug: $slug) {
        id
        title
        slug
      }
    }
  `,
  GET_POSTS_SLUGS: gql`
    query getPosts($username: String!, $pageSize: Int!, $page: Int!) {
      user(username: $username) {
        posts(pageSize: $pageSize, page: $page, sortBy: DATE_PUBLISHED_DESC) {
          edges {
            node {
              slug
            }
          }
          pageInfo {
            hasNextPage
            nextPage
          }
        }
      }
    }
  `,
  GET_POSTS_CARD_META: gql`
    query getPosts($username: String!, $pageSize: Int!, $page: Int!) {
      user(username: $username) {
        posts(pageSize: $pageSize, page: $page, sortBy: DATE_PUBLISHED_DESC) {
          edges {
            node {
              id
              title
              readTimeInMinutes
              publishedAt
              updatedAt
              publication {
                id
              }
              brief
              slug
              tags {
                name
              }
              author {
                name
              }
            }
          }
          pageInfo {
            hasNextPage
            nextPage
          }
        }
      }
    }
  `,
  SUBSCRIBE_TO_NEWSLETTER: gql`
    mutation subscribeToNewsletter($publicationId: ObjectId!, $email: String!) {
      subscribeToNewsletter(
        input: { email: $email, publicationId: $publicationId }
      ) {
        status
      }
    }
  `,
};

class BlogAPIError extends Error {
  constructor(
    message: string,
    public readonly originalError?: unknown
  ) {
    super(
      originalError instanceof Error
        ? `${message}: ${originalError.message}`
        : message
    );
    this.name = 'BlogAPIError';
  }
}

async function executeGraphQLRequest<T>(
  query: string,
  variables: Record<string, unknown>,
  errorMessage: string
): Promise<T> {
  try {
    return await request<T>(
      env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT,
      query,
      variables
    );
  } catch (error) {
    console.error(`${errorMessage}:`, error);
    throw new BlogAPIError(errorMessage, error);
  }
}

function normalizePaginationParams(pageSize: number, page: number) {
  return {
    pageSize: Math.min(Math.max(1, pageSize), HASHNODE_BLOGS_FETCH_LIMIT),
    page: Math.max(1, page),
  };
}

export async function getBlogPostsCount(): Promise<number> {
  const response = await executeGraphQLRequest<IBlogsCount>(
    QUERIES.GET_POSTS_COUNT,
    { username: HASHNODE_USERNAME },
    'Failed to fetch blog posts count'
  );
  return response.user?.posts?.totalDocuments ?? 0;
}

export async function getBlogPostByID(
  id: string
): Promise<{ post: IBlogByIDResponse['post'] }> {
  const response = await executeGraphQLRequest<IBlogByIDResponse>(
    QUERIES.GET_POST_BY_ID,
    { id },
    'Failed to fetch blog post'
  );

  if (!response.post) {
    throw new BlogAPIError('Post not found');
  }

  return { post: response.post };
}

export async function getBlogPostIDBySlug(
  slug: string
): Promise<{ id: string } | null> {
  const publicationHost = env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST;
  const username = HASHNODE_USERNAME;

  try {
    // İlk yöntemi dene
    const response = await executeGraphQLRequest<IBlogPostIDBySlugResponse>(
      QUERIES.GET_POST_BY_SLUG,
      { publicationHost, slug },
      'Failed to fetch blog post ID'
    );

    if (response.publication?.post?.id) {
      return { id: response.publication.post.id };
    }

    // İkinci yöntemi dene
    const altResponse = await executeGraphQLRequest<IBlogPostIDBySlugResponse>(
      QUERIES.GET_POST_BY_SLUG_ALT,
      { username },
      'Failed to fetch blog post ID with username'
    );

    const posts = altResponse.user?.posts?.edges ?? [];
    const post = posts.find((p) => p.node?.slug === slug)?.node;
    if (post?.id) {
      return { id: post.id };
    }

    // Üçüncü yöntemi dene
    const directResponse =
      await executeGraphQLRequest<IBlogPostIDBySlugResponse>(
        QUERIES.GET_POST_BY_SLUG_DIRECT,
        { slug },
        'Failed to fetch blog post ID with direct slug'
      );

    if (directResponse.post?.id) {
      return { id: directResponse.post.id };
    }
  } catch (error) {
    console.error(`Error querying for slug: ${slug}`, error);
  }

  return null;
}

export async function getAllBlogPostsSlug(
  pageSize = BLOGS_PER_PAGE_DEFAULT,
  page = PAGE_INDEX_DEFAULT
): Promise<{ slugs: { slug: string }[] }> {
  const slugs: { slug: string }[] = [];
  let currentPage = page;
  let hasNextPage = true;

  const { pageSize: normalizedPageSize } = normalizePaginationParams(
    pageSize,
    page
  );

  while (hasNextPage) {
    const response = await executeGraphQLRequest<IBlogsSlugs>(
      QUERIES.GET_POSTS_SLUGS,
      {
        username: HASHNODE_USERNAME,
        pageSize: normalizedPageSize,
        page: currentPage,
      },
      'Failed to fetch blog posts slugs'
    );

    // Safely handle optional chaining and null values
    const edges = response.user?.posts?.edges ?? [];
    const nodes = edges
      .map((edge) => edge?.node)
      .filter((node): node is { slug: string } => !!node);
    slugs.push(...nodes);

    hasNextPage = !!response.user?.posts?.pageInfo?.hasNextPage;
    currentPage = response.user?.posts?.pageInfo?.nextPage ?? currentPage + 1;
  }

  return { slugs };
}

export async function getBlogPostsCardMeta({
  pageSize = BLOGS_PER_PAGE_DEFAULT,
  page = PAGE_INDEX_DEFAULT,
  all = false,
}: {
  pageSize?: number;
  page?: number;
  all?: boolean;
}): Promise<{ blogs: IBlogCardMetadata[] }> {
  const { pageSize: normalizedPageSize, page: normalizedPage } =
    normalizePaginationParams(pageSize, page);

  if (!all) {
    const response = await executeGraphQLRequest<IBlogsMetadata>(
      QUERIES.GET_POSTS_CARD_META,
      {
        username: HASHNODE_USERNAME,
        pageSize: normalizedPageSize,
        page: normalizedPage,
      },
      'Failed to fetch blog posts metadata'
    );

    const edges = response.user?.posts?.edges ?? [];
    const blogs = edges
      .map((edge) => edge?.node)
      .filter((node): node is IBlogCardMetadata => !!node);

    return { blogs };
  }

  const allBlogs: IBlogCardMetadata[] = [];
  let currentPage = normalizedPage;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await executeGraphQLRequest<IBlogsMetadata>(
      QUERIES.GET_POSTS_CARD_META,
      {
        username: HASHNODE_USERNAME,
        pageSize: normalizedPageSize,
        page: currentPage,
      },
      'Failed to fetch blog posts metadata'
    );

    const edges = response.user?.posts?.edges ?? [];
    const blogs = edges
      .map((edge) => edge?.node)
      .filter((node): node is IBlogCardMetadata => !!node);

    allBlogs.push(...blogs);

    hasNextPage = !!response.user?.posts?.pageInfo?.hasNextPage;
    currentPage = response.user?.posts?.pageInfo?.nextPage ?? currentPage + 1;
  }

  return { blogs: allBlogs };
}

export async function subscribeToNewsletter(
  email: string
): Promise<{ status: string }> {
  const response = await executeGraphQLRequest<ISubscribeToNewsletterResponse>(
    QUERIES.SUBSCRIBE_TO_NEWSLETTER,
    {
      publicationId: env.NEXT_PUBLIC_HASHNODE_PUBLICATION_ID,
      email,
    },
    'Failed to subscribe to newsletter'
  );

  if (!response.data?.subscribeToNewsletter?.status) {
    throw new BlogAPIError('Failed to subscribe to the newsletter');
  }

  return { status: response.data.subscribeToNewsletter.status };
}
