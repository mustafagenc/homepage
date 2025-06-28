export type IBlogCardMetadata = {
    id: string;
    title: string;
    readTimeInMinutes: number;
    brief?: string;
    publication: {
        id: string;
    };
    publishedAt: string;
    updatedAt?: string;
    slug: string;
    tags?: {
        name: string;
    }[];
    author: {
        name: string;
    };
};

export type IBlogsCount = {
    user?: {
        posts?: {
            totalDocuments: number;
        };
    };
};

export type IBlogsSlugs = {
    user?: {
        posts?: {
            edges?: {
                node?: {
                    slug: string;
                };
            }[];
            pageInfo?: {
                hasNextPage: boolean;
                nextPage: number;
            };
        };
    };
};

export type IBlogsMetadata = {
    user?: {
        posts?: {
            edges?: {
                node?: IBlogCardMetadata;
            }[];
            pageInfo?: {
                hasNextPage: boolean;
                nextPage: number;
            };
        };
    };
};

export type ISubscribeToNewsletterResponse = {
    data?: {
        subscribeToNewsletter?: {
            status: string;
        };
    };

    errors?: { message: string }[];
};

export type IBlogPostIDBySlugResponse = {
    publication?: {
        post?: {
            id: string;
            title?: string;
            slug?: string;
        };
    };
    user?: {
        posts?: {
            edges?: {
                node?: {
                    id: string;
                    title?: string;
                    slug?: string;
                };
            }[];
        };
    };
    post?: {
        id: string;
        title?: string;
        slug?: string;
    };
};

export type IBlogByIDResponse = {
    post?: {
        title: string;
        subtitle?: string;
        brief?: string;
        readTimeInMinutes: number;
        publishedAt: string;
        seo?: {
            description?: string;
        };
        tags?: {
            name: string;
        }[];
        coverImage?: {
            url?: string;
        };
        content: {
            markdown: string;
        };
        author: {
            name: string;
        };
    };
};
