import './globals.css';
import { primaryKeywords, siteDescription, siteName, siteUrl } from './content';

const title = `${siteName} | Know What to Wear to a Wedding`;
const description = siteDescription;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${siteName}`
  },
  description,
  applicationName: siteName,
  alternates: { canonical: '/' },
  keywords: primaryKeywords,
  category: 'fashion',
  openGraph: {
    title,
    description,
    type: 'website',
    url: '/',
    siteName
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description,
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    description,
    sameAs: [siteUrl]
  };

  return (
    <html lang="en">
      <head>
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="Fko02cIbXJbOl+xL4dEqrQ" async />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        {children}
      </body>
    </html>
  );
}
