import { z } from 'zod';

export const NewsletterFormSchema = (t: (key: string) => string) => {
  return z.object({
    email: z
      .string()
      .min(1, { message: t('email-is-required') })
      .email(t('email-is-invalid')),
  });
};

export type TNewsletterFormSchema = z.infer<
  ReturnType<typeof NewsletterFormSchema>
>;
