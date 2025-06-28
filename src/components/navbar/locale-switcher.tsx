'use client';

import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

import { Loader } from '@/components/icons/loader';
import { WorldIcon } from '@/components/icons/world';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales } from '@/lib/constants';

export const LocaleSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (value: string) => {
        router.push(pathname, { locale: value });
        router.refresh();
    };

    if (!mounted) {
        return (
            <Button size="icon" variant="ghost">
                <Loader className="size-5 animate-spin text-zinc-400" />
                <span className="sr-only">Loading...</span>
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                    <WorldIcon className="text-foreground size-5 stroke-current stroke-2" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuRadioGroup value={locale} onValueChange={handleChange}>
                    {locales.map((elt) => (
                        <DropdownMenuRadioItem key={elt.id} value={elt.id}>
                            {elt.name}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
