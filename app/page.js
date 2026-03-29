import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <section className="hero card">
        <div>
          <span className="eyebrow">MVP launched</span>
          <h1>Wedding Dress Code Checker</h1>
          <p className="lead">A practical tool for wedding guests who want a fast answer: what to wear, what to avoid, and what is safest for the venue and dress code.</p>
          <Link href="/wedding-dress-code-checker" className="button">Open the checker</Link>
        </div>
        <aside className="heroAside">
          <strong>SEO-ready structure</strong>
          <p>Main tool page, FAQ content, and expandable static guides are already in place for the next content round.</p>
        </aside>
      </section>
    </main>
  );
}
