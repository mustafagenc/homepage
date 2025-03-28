'use client';

import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Loader } from '@/components/icons/loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { saveContactsResend } from '@/lib/apis/resend';
import {
  NewsletterFormSchema,
  TNewsletterFormSchema,
} from '@/lib/validators/newsletter-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@/i18n/navigation';

export const NewsletterForm = () => {
  const t = useTranslations('Contact');

  const form = useForm<TNewsletterFormSchema>({
    resolver: zodResolver(NewsletterFormSchema(t)),
    defaultValues: {
      email: '',
    },
  });

  const handleFormSubmit: SubmitHandler<TNewsletterFormSchema> = async (
    data: TNewsletterFormSchema
  ) => {
    const { email } = data;

    try {
      //ToDo: Uncomment this line to enable newsletter subscription
      //await subscribeToNewsletter(email);

      const { data: resendData, error: resendError } = await saveContactsResend(
        {
          email,
        }
      );

      // We don't want to return success of false even if saving contact failed
      // Because if the email was sent successfully, we don't want to show an error
      // to the user.
      if (!resendData || resendError) {
        console.error('Error saving contact to Resend:', resendError);
      }

      toast.success(t('Newsletter.error-saving-contact-to-resend'), {
        description: t('Newsletter.make-sure-to-check-your-spam-folder'),
      });

      form.reset();
    } catch {
      return toast.error(t('Newsletter.something-went-wrong'), {
        description: t('Newsletter.you-might-already-be-subscribed'),
      });
    }
  };

  return (
    <section className="mb-10 mt-24">
      <Card className="rounded-lg border-0 dark:border">
        <CardContent className="flex flex-col gap-8 pt-6 md:flex-row md:justify-between md:pt-8">
          <div className="flex-grow">
            <h2 className="text-2xl font-bold">{t('Newsletter.title')}</h2>
            <p className="text-muted-foreground">{t('Newsletter.subtitle')}</p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="flex flex-grow flex-col items-start gap-3 md:w-80"
              noValidate
            >
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase text-zinc-700 dark:text-zinc-400">
                        {t('Newsletter.email')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          id="email"
                          autoComplete="email"
                          placeholder={t('Newsletter.placeholder')}
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-rose-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full disabled:opacity-50"
                >
                  {form.formState.isSubmitting ? (
                    <Loader className="mr-2 size-5 animate-spin" />
                  ) : null}
                  {t('Newsletter.button')}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {t.rich('Newsletter.privacy', {
                  PrivacyPolicy: (chunks) => (
                    <Link
                      href="/privacy"
                      className="font-bold hover:text-foreground hover:underline hover:underline-offset-2 hover:transition"
                      target="_blank"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};
