'use client';

import { useTranslations } from 'next-intl';
import { Poppins } from 'next/font/google';

import { NavDropdown } from '@/components/navbar/dropdown';
import { ThemeToggle } from '@/components/navbar/theme-toggle';
import { Link, usePathname } from '@/i18n/navigation';
import { NAV_LINKS } from '@/lib/constants';

import { LocaleSwitcher } from './locale-switcher';

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['700'],
});

export const Navbar = () => {
    const pathName = usePathname();

    const getClassnameForLink = (path: string) => {
        return pathName === path
            ? 'underline underline-offset-4 text-foreground capitalize'
            : 'text-muted-foreground capitalize hover:text-zinc-600 dark:hover:text-zinc-500';
    };

    const homeLink = NAV_LINKS.find((link) => link.name.toLowerCase() === 'home')?.path ?? '/';

    const t = useTranslations('Navbar');

    return (
        <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xs">
            <div className="mx-auto max-w-3xl px-3 py-6">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center sm:hidden">
                            <NavDropdown />
                        </div>

                        <Link
                            href={homeLink}
                            className={`${poppins.className} flex-nowrap text-2xl font-bold uppercase select-none`}
                        >
                            MG.
                        </Link>
                    </div>

                    <div className="text-muted-foreground ml-0 hidden items-center justify-between gap-6 font-semibold sm:ml-auto sm:flex">
                        <ul className="flex items-center gap-6">
                            {NAV_LINKS.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.path}
                                        className={getClassnameForLink(link.path)}
                                    >
                                        {t(link.name)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <LocaleSwitcher />
                        <ThemeToggle />
                    </div>

                    <div className="ml-auto sm:hidden">
                        <LocaleSwitcher />
                        <ThemeToggle />
                    </div>
                </nav>
            </div>
        </header>
    );
};
