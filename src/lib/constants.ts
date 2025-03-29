import { DevToIcon } from '@/components/icons/devTo';
import { GitHubIcon } from '@/components/icons/github';
import { HashnodeIcon } from '@/components/icons/hashnode';
import { InstagramIcon } from '@/components/icons/instagram';
import { LinkedInIcon } from '@/components/icons/linkedin';
import { TwitterIcon } from '@/components/icons/twitter';

export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://www.mustafagenc.info';

export const locales = [
  { id: 'tr', name: 'Türkçe' },
  { id: 'en', name: 'English' },
];

export const PUBLIC_MAIL = 'eposta@mustafagenc.info';

export const TOOLTIP_DELAY_DURATION = 150;

export const PER_PAGE_MAX = 100;
export const PAGE_MAX = 500;

export const SEARCH_QUERY_PARAM = 'q';
export const PAGE_QUERY_PARAM = 'page';
export const PER_PAGE_QUERY_PARAM = 'perPage';

export const PROJECTS_PER_PAGE_DEFAULT = 5;
export const BLOGS_PER_PAGE_DEFAULT = 5;
export const RECENT_BLOGS_DEFAULT = 4;
export const RECENT_PROJECTS_DEFAULT = 5;
export const PAGE_INDEX_DEFAULT = 1;
export const WORDS_PER_MINUTE_DEFAULT = 250;
export const STARS_COUNT_TO_SHOW_ICON = 7;

export const DEBOUNCE_TIME_DEFAULT = 250;
export const DEBOUNCE_TIME_PROJECTS = 250;
export const DEBOUNCE_TIME_BLOGS = 300;

export const HASHNODE_USERNAME = 'mustafagenc';
export const HASHNODE_BLOGS_FETCH_LIMIT = 15;

export const PROJECT_FILTER_TOPIC = 'showcase';

export const ROUTES = [
  '',
  '/blogs',
  '/projects',
  '/work',
  '/contact',
  '/privacy',
  '/meet',
];

export const NAV_LINKS = [
  { name: 'home', path: '/' },
  { name: 'blogs', path: '/blogs/' },
  { name: 'projects', path: '/projects/' },
  { name: 'work', path: '/work/' },
  { name: 'contact', path: '/contact/' },
];

export const socialMediaLinks = [
  {
    name: 'social-media',
    items: [
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/mustafagenc',
        icon: LinkedInIcon,
      },
      {
        name: 'GitHub',
        href: 'https://github.com/mustafagenc',
        icon: GitHubIcon,
      },
      {
        name: 'DEV.to',
        href: 'https://dev.to/mustafagenc',
        icon: DevToIcon,
      },
      {
        name: 'Hashnode',
        href: 'https://mustafagenc.hashnode.dev',
        icon: HashnodeIcon,
      },
      {
        name: 'X',
        href: 'https://x.com/mustafagenc',
        icon: TwitterIcon,
      },
      {
        name: 'Instagram',
        href: 'https://instagram.com/mustafagenc',
        icon: InstagramIcon,
      },
    ],
  },
  // {
  //   name: 'projects',
  //   items: [
  //     {
  //       name: 'Namaz Vakti',
  //       href: 'https://namazvakti.app',
  //       icon: MoonIcon,
  //     },
  //   ],
  // },
];
