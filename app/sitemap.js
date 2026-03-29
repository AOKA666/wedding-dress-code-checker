import { seoPages, siteUrl } from './content';

export default function sitemap() {
  const now = new Date();
  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${siteUrl}/wedding-dress-code-checker`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95
    },
    ...seoPages.map((page) => ({
      url: `${siteUrl}/${page.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    }))
  ];
}
