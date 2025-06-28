'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ISpotify } from '@/types/iSpotify';

import { SpotifyIcon } from '../icons/spotify';

export function Spotify() {
    const t = useTranslations('Shared');
    const [nowPlaying, setNowPlaying] = useState<ISpotify>();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            const response = await fetch('/api/spotify');
            const nowPlaying = await response.json();
            setNowPlaying(nowPlaying);
            setLoading(false);
        };
        fetchNowPlaying();
    }, []);

    if (isLoading) return <div>{t('loading')}</div>;

    return (
        <div className="flex w-full flex-row-reverse items-center space-x-0 sm:flex-row sm:space-x-2">
            {nowPlaying?.isPlaying ? (
                <Image
                    className="rounded-full"
                    src={nowPlaying.albumImageUrl}
                    alt={nowPlaying.album}
                    loading="lazy"
                    width={20}
                    height={20}
                />
            ) : (
                <SpotifyIcon className="size-5" />
            )}
            <div className="inline-flex w-full max-w-full flex-col truncate sm:flex-row">
                <p className="capsize font-medium text-gray-800 dark:text-gray-200">
                    {nowPlaying?.isPlaying ? (
                        <Link href={nowPlaying.songUrl}>{nowPlaying.title}</Link>
                    ) : (
                        t('notPlaying')
                    )}
                </p>
                <span className="capsize mx-2 hidden text-gray-500 sm:block dark:text-gray-300">
                    –
                </span>
                <p className="capsize max-w-max truncate text-gray-500 dark:text-gray-300">
                    {nowPlaying?.isPlaying ? nowPlaying.artist : 'Spotify'}
                </p>
            </div>
        </div>
    );
}
