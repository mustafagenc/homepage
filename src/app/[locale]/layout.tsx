import type { Metadata } from 'next';
import '@/styles/globals.css';

import { hasLocale, NextIntlClientProvider } from 'next-intl';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';

import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/shared/footer';
import { Toaster } from '@/components/ui/sonner';
import { routing } from '@/i18n/routing';
import { BASE_URL } from '@/lib/constants';
import Providers from '@/providers/providers';

const geistSans = localFont({
    src: '../../../content/fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: '../../../content/fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export async function generateMetadata(): Promise<Metadata> {
    return {
        metadataBase: new URL(BASE_URL),
        title: {
            default: 'Mustafa Genç',
            template: '%s • Mustafa Genç',
        },
        twitter: {
            card: 'summary_large_image',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        // We suppress the Hydration warning because of the next-themes package.
        // It requires this to be set since, we don't really know the user theme
        // preference on the server side.
        <html lang={locale} suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} mx-auto flex min-h-screen flex-col antialiased`}
            >
                <NextIntlClientProvider>
                    <Providers>
                        <Navbar />
                        <div className="mx-auto w-3xl max-w-3xl grow px-3 antialiased">
                            <main className="mt-40 grow">{children}</main>
                            <Toaster />
                            <Footer />
                        </div>
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
