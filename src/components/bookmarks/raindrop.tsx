import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import { Link } from '@/i18n/navigation';
import { getBookmark } from '@/lib/apis/raindrop';
import { ILink } from '@/types/iLink';

import { Badge } from '../ui/badge';

export const Raindrop = async () => {
    const t = await getTranslations('Bookmarks');
    const [bookmarks] = await Promise.all([getBookmark(53949043)]);
    return (
        <section>
            {' '}
            <h1 className="title">{t('title')}</h1>
            <div className="grid grid-cols-3 gap-4">
                {bookmarks.items.map((item: ILink) => {
                    return (
                        <div
                            className="bg-card text-card-foreground rounded-xl border shadow"
                            key={item._id}
                        >
                            <Link href={item.link} target="_blank" rel="noreferrer noopener">
                                <div className="w-full">
                                    <Image
                                        src={item.cover}
                                        alt={item.title}
                                        width={75}
                                        height={75}
                                        className="h-30 w-90 object-contain p-2"
                                    />
                                </div>
                                <div className="space-y-2 p-5">
                                    <h5 className="text-md line-clamp-1 font-semibold">
                                        {item.title}
                                    </h5>
                                    <p className="prose line-clamp-2 text-sm text-zinc-700 dark:text-zinc-400">
                                        {item.excerpt}
                                    </p>

                                    {item.tags && item.tags.length > 0 ? (
                                        <div className="flex flex-wrap gap-2 py-2">
                                            {item.tags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="secondary"
                                                    className="cursor-pointer text-zinc-600 dark:text-zinc-300"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
