import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.weddingdresscodechecker.com';
const title = 'Wedding Dress Code Checker | Know What to Wear to a Wedding';
const description = 'Check a wedding dress code in seconds. Get practical outfit recommendations, safe choices, what to avoid, and wedding guest outfit formulas.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: 'Wedding Dress Code Checker',
  alternates: { canonical: '/' },
  keywords: [
    'wedding dress code checker',
    'what to wear to a wedding',
    'wedding guest outfit',
    'cocktail attire wedding',
    'semi formal wedding attire',
    'black tie optional wedding'
  ],
  openGraph: {
    title,
    description,
    type: 'website',
    url: '/',
    siteName: 'Wedding Dress Code Checker'
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Wedding Dress Code Checker',
    url: siteUrl,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        {children}
      </body>
    </html>
  );
}
