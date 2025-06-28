export type IProject = {
    metadata: IProjectMetadata;
    content: string;
};

export type IProjectMetadata = {
    title: string;
    description?: string;
    author?: string;
    clone_url: string;
    language?: string;
    homepage?: string;
    topics?: string[];
    created_at: string;
    updated_at?: string;
};
