import { z } from 'zod';

import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
    server: {
        RESEND_API_KEY: z.string().min(1),
        RESEND_FROM_EMAIL: z
            .string()
            .min(1, { message: 'Email is required.' })
            .email('Invalid email.'),
        RESEND_AUDIENCE_ID: z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT: z.string().url(),
        NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST: z.string().min(1, { message: 'Required' }),
        NEXT_PUBLIC_HASHNODE_ADDITIONAL_PUBLICATION_HOSTS: z.string().optional(),
        NEXT_PUBLIC_HASHNODE_PUBLICATION_ID: z.string().min(1, { message: 'Required' }),
    },
    runtimeEnv: {
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
        RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID,
        NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT: process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT,
        NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
        NEXT_PUBLIC_HASHNODE_ADDITIONAL_PUBLICATION_HOSTS:
            process.env.NEXT_PUBLIC_HASHNODE_ADDITIONAL_PUBLICATION_HOSTS,
        NEXT_PUBLIC_HASHNODE_PUBLICATION_ID: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_ID,
    },
});
