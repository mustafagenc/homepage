import { z } from 'zod';

export const ContactFormSchema = (t: (key: string) => string) => {
  return z.object({
    name: z
      .string()
      .min(1, { message: t('name-is-required') })
      .min(2, { message: t('must-be-at-least-2') }),
    email: z
      .string()
      .min(1, { message: t('email-is-required') })
      .email(t('email-is-invalid')),
    message: z.string().min(1, { message: t('message-is-required') }),
  });
};

export type TContactFormSchema = z.infer<ReturnType<typeof ContactFormSchema>>;
