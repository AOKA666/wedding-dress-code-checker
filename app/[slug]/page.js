import Link from 'next/link';
import { getSeoPage, seoPages, siteName, siteUrl } from '../content';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${slug}` }
  };
}

export default async function SeoPage({ params }) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) notFound();

  const relatedPages = (page.relatedSlugs || []).map(getSeoPage).filter(Boolean);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.description,
    mainEntityOfPage: `${siteUrl}/${page.slug}`,
    url: `${siteUrl}/${page.slug}`,
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Wedding Dress Code Checker', item: `${siteUrl}/wedding-dress-code-checker` },
      { '@type': 'ListItem', position: 3, name: page.h1, item: `${siteUrl}/${page.slug}` }
    ]
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="card stack">
        <span className="eyebrow">Wedding guest guide</span>
        <h1>{page.h1}</h1>
        <p className="lead">{page.intro}</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/wedding-dress-code-checker" className="button">Use the checker</Link>
          <Link href="/" className="button secondary">See all guides</Link>
        </div>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h2>Quick answer</h2>
        <p>{page.description}</p>
      </section>

      <section className="card three" style={{ marginTop: 24 }}>
        {page.sections.map((section) => (
          <article key={section.title} className="listCard">
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h2>Need a faster answer?</h2>
        <p>Use the main checker if you want a recommendation shaped by dress code, venue, season, time of day, and style preference in one pass.</p>
        <Link href="/wedding-dress-code-checker" className="button">Open the checker</Link>
      </section>

      {relatedPages.length > 0 && (
        <section className="card" style={{ marginTop: 24 }}>
          <h2>Related wedding guest guides</h2>
          <div className="three">
            {relatedPages.map((related) => (
              <article key={related.slug} className="listCard">
                <h3>{related.h1}</h3>
                <p>{related.description}</p>
                <Link href={`/${related.slug}`} className="button secondary" style={{ marginTop: 8 }}>Read guide</Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
