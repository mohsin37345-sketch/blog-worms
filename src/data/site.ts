export const SITE = {
  name: 'Blog Worms',
  description: 'Your go-to source for the latest viral and trending blogs in the UK. We cover trending topics, unanswered questions, and viral content that matters.',
  url: 'https://blogworms.co.uk',
  author: 'Blog Worms Team',
  email: 'mohsin37345@gmail.com',
  locale: 'en-GB',
  ogImage: '/images/og-default.jpg',
  logo: '/images/blog-worms-logo.svg',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'About', href: '/about-us/' },
  { label: 'Contact', href: '/contact-us/' },
] as const;

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy/' },
  { label: 'Terms & Conditions', href: '/terms/' },
  { label: 'Disclaimer', href: '/disclaimer/' },
  { label: 'Sitemap', href: '/sitemap/' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'Twitter', href: 'https://twitter.com/blogworms', icon: 'twitter' },
  { label: 'Facebook', href: 'https://facebook.com/blogworms', icon: 'facebook' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/blogworms', icon: 'linkedin' },
] as const;

export const CATEGORIES = [
  {
    name: 'Trending',
    slug: 'trending',
    description: 'The hottest topics breaking across the UK right now',
    icon: '🔥',
    color: 'badge-trending',
  },
  {
    name: 'Guides',
    slug: 'guides',
    description: 'In-depth guides and how-to articles on popular subjects',
    icon: '📚',
    color: 'badge-guides',
  },
  {
    name: 'Questions',
    slug: 'questions',
    description: 'Answers to the questions Google hasn\'t answered yet',
    icon: '❓',
    color: 'badge-questions',
  },
] as const;

export const POSTS_PER_PAGE = 12;

export type Category = typeof CATEGORIES[number]['slug'];
