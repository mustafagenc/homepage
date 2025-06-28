'use client';

import { ThemeProvider } from 'next-themes';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider defaultTheme="dark" attribute="class" disableTransitionOnChange>
            {children}

            {/* Vercel Analytics and Speed Insights */}
            {/* NOTE: Don't edit/remove these components */}
            <Analytics />
            <SpeedInsights />
        </ThemeProvider>
    );
}
