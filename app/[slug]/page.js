import { getSeoPage, seoPages } from '../content';
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

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: `https://www.weddingdresscodechecker.com/${page.slug}`
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="card stack">
        <span className="eyebrow">Wedding guest guide</span>
        <h1>{page.h1}</h1>
        <p className="lead">{page.intro}</p>
      </section>
      <section className="card three" style={{ marginTop: 24 }}>
        {page.sections.map((section) => (
          <article key={section.title} className="listCard">
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </article>
        ))}
      </section>
      <section className="card" style={{ marginTop: 24 }}>
        <h2>Need a faster answer?</h2>
        <p>Use the main checker if you want a recommendation shaped by dress code, venue, season, time of day, and style preference in one pass.</p>
        <a href="/wedding-dress-code-checker" className="button">Open the checker</a>
      </section>
    </main>
  );
}
