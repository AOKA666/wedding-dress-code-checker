import Link from 'next/link';
import { comparisonBlocks, contentCluster, homepageSections, seoPages, siteName } from './content';

export const metadata = {
  title: 'Wedding Dress Code Checker: Tool, Guides, and Wedding Guest Outfit Help',
  description: 'Use the wedding dress code checker, compare dress codes, and read practical guides on cocktail attire, semi-formal weddings, black tie optional, beach weddings, and more.',
  alternates: { canonical: '/' }
};

export default function HomePage() {
  return (
    <main>
      <section className="hero card">
        <div>
          <span className="eyebrow">Wedding guest outfit advice</span>
          <h1>Know what to wear to a wedding without second-guessing the dress code</h1>
          <p className="lead">{siteName} helps wedding guests decode cocktail, semi-formal, formal, black tie optional, beach, garden, and no-dress-code invitations with practical outfit guidance that is fast to use and easy to trust.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
            <Link href="/wedding-dress-code-checker" className="button">Open the checker</Link>
            <a href="#guides" className="button secondary">Browse wedding guest guides</a>
          </div>
        </div>
        <aside className="heroAside">
          <span className="eyebrow">What this site does</span>
          <strong>Fast answers for real guests</strong>
          <p>Use the main tool when you need a quick recommendation. Use the guides when you want the nuance behind cocktail attire, venue changes, seasonal tweaks, and what to avoid.</p>
        </aside>
      </section>

      <section className="card three">
        {homepageSections.map((item) => (
          <article key={item.title} className="listCard">
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="grid" style={{ marginTop: 24 }}>
        {comparisonBlocks.map((block) => (
          <section key={block.title} className="card stack">
            <h2>{block.title}</h2>
            <ul>
              {block.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        ))}
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h2>How to use this site</h2>
        <div className="three">
          <article className="listCard">
            <h3>1. Start with the invitation</h3>
            <p>Choose the stated dress code first. If there is no dress code, use the venue and time of day to set the floor for how polished your outfit should be.</p>
          </article>
          <article className="listCard">
            <h3>2. Adjust for venue and season</h3>
            <p>A hotel evening wedding usually needs more polish than a daytime garden wedding. Weather, coverage, and shoe practicality change the final answer.</p>
          </article>
          <article className="listCard">
            <h3>3. Use the guide pages for edge cases</h3>
            <p>If you are stuck on black, beach, black tie optional, or a fuzzy semi-formal invite, the supporting guides explain the nuance without fashion-magazine nonsense.</p>
          </article>
        </div>
      </section>

      <section className="card footerNote" id="guides">
        <h2>Core wedding guest guides</h2>
        <div className="three">
          {seoPages.map((page) => (
            <article key={page.slug} className="listCard">
              <h3>{page.h1}</h3>
              <p>{page.description}</p>
              <Link href={`/${page.slug}`} className="button secondary" style={{ marginTop: 8 }}>Read guide</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h2>Content cluster roadmap</h2>
        <div className="three">
          {contentCluster.map((cluster) => (
            <article key={cluster.cluster} className="listCard">
              <h3>{cluster.cluster}</h3>
              <ul>
                {cluster.pages.map((page) => <li key={page}>{page}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
