'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { faqItems, seoPages, siteUrl } from '../content';

const OPTIONS = {
  dressCode: ['Cocktail', 'Semi-Formal', 'Formal', 'Black Tie Optional', 'Beach Formal', 'Garden Attire', 'No Dress Code'],
  venue: ['Indoor', 'Outdoor', 'Beach', 'Garden', 'Church', 'Hotel', 'Vineyard'],
  season: ['Spring', 'Summer', 'Fall', 'Winter'],
  time: ['Daytime', 'Evening'],
  style: ['Masculine', 'Feminine', 'Neutral']
};

const defaults = {
  dressCode: 'Cocktail',
  venue: 'Hotel',
  season: 'Spring',
  time: 'Evening',
  style: 'Neutral',
  note: ''
};

const BASE_RULES = {
  'Cocktail': {
    recommended: {
      Masculine: ['navy or charcoal suit', 'crisp shirt', 'leather loafers or oxfords'],
      Feminine: ['midi dress or polished jumpsuit', 'dressy flats or low heels', 'small evening bag'],
      Neutral: ['tailored separates', 'refined top or layer', 'polished dress shoes or sleek flats']
    },
    safe: ['clean lines', 'elevated fabric', 'one polished layer'],
    avoid: ['jeans', 'sneakers', 'clubwear', 'loud novelty prints'],
    why: 'Cocktail means polished and social, not gala-level formal and definitely not casual.',
    formulas: {
      Masculine: ['navy suit + white shirt + loafers', 'charcoal suit + knit polo + leather shoes'],
      Feminine: ['midi dress + block heels + light jewelry', 'jumpsuit + dressy sandal + clutch'],
      Neutral: ['tailored trousers + refined top + structured blazer']
    }
  },
  'Semi-Formal': {
    recommended: {
      Masculine: ['suit or blazer with dress pants', 'button-down or knit polo', 'leather shoes'],
      Feminine: ['dress with structure', 'polished separates', 'dressy flats, slingbacks, or heels'],
      Neutral: ['tailored trousers', 'dressy top or shell', 'blazer or smart outer layer']
    },
    safe: ['tailored pieces', 'dressy shoes', 'clean finish'],
    avoid: ['hoodies', 'denim', 'running shoes', 'too much sparkle for daytime'],
    why: 'Semi-formal still needs visible effort. It gives you flexibility, but not permission to dress down.',
    formulas: {
      Masculine: ['blazer + dress pants + white shirt + loafers'],
      Feminine: ['knee or midi dress + low heel + simple bag'],
      Neutral: ['tailored set + polished shoes + one elevated accessory']
    }
  },
  'Formal': {
    recommended: {
      Masculine: ['dark suit', 'dress shirt', 'tie and leather shoes'],
      Feminine: ['long dress or elevated midi', 'dress shoes', 'clean evening accessories'],
      Neutral: ['dark tailored outfit', 'structured layer', 'dressier shoes and finishing pieces']
    },
    safe: ['darker palette', 'dressier shoes', 'evening-ready finish'],
    avoid: ['casual cotton basics', 'short daytime dresses', 'sneakers'],
    why: 'Formal asks for a clear step up from cocktail. Think ceremony and evening polish.',
    formulas: {
      Masculine: ['dark suit + tie + oxfords'],
      Feminine: ['elevated midi dress + heels + clutch'],
      Neutral: ['dark matching separates + sharp layer + polished shoes']
    }
  },
  'Black Tie Optional': {
    recommended: {
      Masculine: ['dark suit or tuxedo', 'white shirt', 'tie or bow tie'],
      Feminine: ['floor-length dress or very polished midi', 'refined evening shoes', 'simple evening accessories'],
      Neutral: ['dark formal tailoring', 'dressy fabric', 'minimal but elevated accessories']
    },
    safe: ['dark colors', 'evening silhouettes', 'formal shoes'],
    avoid: ['officewear', 'casual summer fabrics', 'anything that reads daytime'],
    why: 'Black tie optional still leans formal. The safe move is to dress near black tie, not near casual cocktail.',
    formulas: {
      Masculine: ['dark suit + tie + polished leather shoes'],
      Feminine: ['long dress + evening shoes + compact bag'],
      Neutral: ['dark tailored set + formal shoes + sleek outer layer']
    }
  },
  'Beach Formal': {
    recommended: {
      Masculine: ['lightweight suit or linen blend tailoring', 'breathable shirt', 'loafers or refined sandals if appropriate'],
      Feminine: ['flowy dress in breathable fabric', 'dressy sandal or block heel', 'light accessories'],
      Neutral: ['lightweight separates', 'airy layer', 'outdoor-friendly polished shoes']
    },
    safe: ['breathable fabrics', 'lighter colors', 'shoes that handle uneven ground'],
    avoid: ['heavy wool', 'stilettos in sand', 'stiff dark layering'],
    why: 'Beach formal still means wedding-appropriate, but the setting changes fabric, shoe, and comfort choices.',
    formulas: {
      Masculine: ['linen-blend suit + open-collar shirt + loafers'],
      Feminine: ['flowy midi dress + block heel + light wrap'],
      Neutral: ['light trousers + polished top + breathable blazer']
    }
  },
  'Garden Attire': {
    recommended: {
      Masculine: ['light suit or blazer combination', 'soft shirt', 'loafer or dress shoe'],
      Feminine: ['floral or soft-toned dress', 'block heel or dressy flat', 'light layer'],
      Neutral: ['soft tailoring', 'lighter palette', 'polished but relaxed finish']
    },
    safe: ['soft colors', 'comfortable dress shoes', 'weather-aware layer'],
    avoid: ['all-black severe styling', 'spike heels on grass', 'heavy eveningwear'],
    why: 'Garden attire usually asks for polish with softness. You want to fit the setting without looking underdressed.',
    formulas: {
      Masculine: ['light blazer + dress pants + loafers'],
      Feminine: ['printed midi dress + flats or low heels + cardigan'],
      Neutral: ['tailored separates + softer color palette + polished flats']
    }
  },
  'No Dress Code': {
    recommended: {
      Masculine: ['suit or blazer with dress pants', 'shirt with structure', 'leather shoes'],
      Feminine: ['midi dress, jumpsuit, or polished separates', 'dressy shoes', 'simple accessories'],
      Neutral: ['tailored outfit', 'refined top layer', 'polished shoes']
    },
    safe: ['dress one level up from nice dinner clothes', 'use venue as guide', 'keep shoes polished'],
    avoid: ['jeans', 'athleisure', 'anything you would wear to brunch'],
    why: 'No dress code means you need to infer the answer from venue, time, and season. Default to slightly more polished.',
    formulas: {
      Masculine: ['blazer + trousers + loafers'],
      Feminine: ['midi dress + low heel + simple jewelry'],
      Neutral: ['tailored set + polished shoes + light outer layer']
    }
  }
};

function applyModifiers(form) {
  const base = BASE_RULES[form.dressCode];
  const styleKey = form.style;
  const recommended = [...base.recommended[styleKey]];
  const safe = [...base.safe];
  const avoid = [...base.avoid];
  const formulas = [...base.formulas[styleKey]].slice(0, 3);
  const why = [base.why];

  if (form.venue === 'Church') {
    recommended.push('an added layer or more covered silhouette');
    avoid.push('anything too short, too low-cut, or overly bare');
    why.push('Church settings usually call for a little more restraint and coverage.');
  }
  if (form.venue === 'Beach') {
    safe.push('lighter fabrics and lower heel pressure');
    avoid.push('shoes that sink or slip');
    why.push('Beach conditions make fabric weight and shoe choice part of dressing correctly.');
  }
  if (form.venue === 'Garden' || form.venue === 'Outdoor' || form.venue === 'Vineyard') {
    safe.push('stable shoes for grass, stone, or uneven paths');
    why.push('Outdoor venues reward comfort and stability, not delicate shoes that fail on the ground.');
  }
  if (form.venue === 'Hotel' && form.time === 'Evening') {
    recommended.push('a slightly dressier finish than daytime looks');
    why.push('Hotel evening weddings usually read more formal than the same dress code outdoors in daylight.');
  }
  if (form.season === 'Summer') {
    safe.push('breathable fabric');
    avoid.push('heavy layering');
  }
  if (form.season === 'Winter') {
    recommended.push('a polished coat or formal outer layer');
    safe.push('closed-toe shoes and richer fabric');
  }
  if (form.time === 'Evening') {
    safe.push('slightly darker or dressier styling');
  }
  if (form.note.toLowerCase().includes('destination')) {
    safe.push('packable pieces that resist wrinkles');
    why.push('Destination weddings reward outfit choices that travel well and still look finished on arrival.');
  }
  if (form.note.toLowerCase().includes('luxury')) {
    recommended.push('one elevated accessory or sharper formal piece');
    why.push('Luxury venues usually tolerate dressing up more than dressing down.');
  }

  return {
    recommended: [...new Set(recommended)].slice(0, 5),
    safe: [...new Set(safe)].slice(0, 5),
    avoid: [...new Set(avoid)].slice(0, 5),
    formulas: [...new Set(formulas)].slice(0, 3),
    why: why.join(' ')
  };
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer }
  }))
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Wedding Dress Code Checker',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Web',
  url: `${siteUrl}/wedding-dress-code-checker`,
  description: 'A free wedding dress code checker for practical wedding guest outfit recommendations.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
};

export default function ToolClient() {
  const [form, setForm] = useState(defaults);
  const result = useMemo(() => applyModifiers(form), [form]);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />

      <section className="hero card">
        <div>
          <span className="eyebrow">Wedding guest outfit tool</span>
          <h1>What Does This Wedding Dress Code Actually Mean?</h1>
          <p className="lead">Get a clear, practical outfit recommendation in seconds. Choose the dress code, venue, season, and style preference, then get specific wedding guest guidance you can actually follow.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
            <a href="#checker" className="button">Check My Wedding Outfit</a>
            <a href="#faq" className="button secondary">Read common questions</a>
          </div>
        </div>
        <aside className="heroAside">
          <span className="eyebrow">Built for speed</span>
          <strong>30-second answer</strong>
          <p>No fashion-magazine fluff. Just what to wear, what to avoid, and a few safe outfit formulas that work for real wedding guests.</p>
        </aside>
      </section>

      <section className="grid" id="checker">
        <section className="card stack">
          <div>
            <h2>Wedding Dress Code Checker</h2>
            <p className="small">Pick the dress code and context. The result stays practical on purpose: specific items, safer choices, and common mistakes to avoid.</p>
          </div>
          <div className="formGrid">
            {Object.entries(OPTIONS).map(([field, items]) => (
              <label key={field}>
                {field === 'dressCode' ? 'Dress code' : field === 'time' ? 'Time of day' : field === 'style' ? 'Style preference' : field.charAt(0).toUpperCase() + field.slice(1)}
                <select value={form[field]} onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}>
                  {items.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
            ))}
            <label style={{ gridColumn: '1 / -1' }}>
              Optional note
              <textarea placeholder="church ceremony, luxury hotel, destination wedding..." value={form.note} onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))} />
            </label>
          </div>
          <a href="#result" className="button">See Recommendation</a>
        </section>

        <section className="card stack" id="result">
          <div className="resultHero">
            <h2 style={{ marginBottom: 0 }}>Your safe outfit answer</h2>
            <span className="badge">{form.dressCode}</span>
          </div>
          <div className="listCard good">
            <h3>What to wear</h3>
            <ul>{result.recommended.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="listCard">
            <h3>Safe choices</h3>
            <ul>{result.safe.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="listCard bad">
            <h3>What to avoid</h3>
            <ul>{result.avoid.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="listCard">
            <h3>Why this works</h3>
            <p>{result.why}</p>
          </div>
          <div className="listCard">
            <h3>Safe outfit formulas</h3>
            <ul>{result.formulas.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>
      </section>

      <section className="card three">
        <article>
          <h3>Results first</h3>
          <p>This tool leads with the answer because most wedding guests are trying to avoid wearing the wrong thing, not read a long style essay.</p>
        </article>
        <article>
          <h3>Venue changes the answer</h3>
          <p>A church, beach, hotel, and garden wedding can all shift the right interpretation of the exact same dress code.</p>
        </article>
        <article>
          <h3>Specific beats vague</h3>
          <p>Each result falls back to items and combinations you can actually wear: suit, loafers, midi dress, sandals, blazer, dress pants.</p>
        </article>
      </section>

      <section className="card cta" style={{ marginTop: 24 }}>
        <h2>Get the wedding guest outfit checklist</h2>
        <p>Use this CTA block to plug your future email capture, PDF checklist, or affiliate funnel. For MVP, the section is present and indexable.</p>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
          <input aria-label="Email address" placeholder="Enter your email" style={{ maxWidth: 360 }} />
          <button className="button">Get the checklist</button>
        </div>
      </section>

      <section className="card" style={{ marginTop: 24 }} id="faq">
        <h2>Wedding Dress Code FAQ</h2>
        <div className="three">
          {faqItems.map((item) => (
            <article key={item.question} className="listCard">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card footerNote">
        <h2>More wedding guest guides</h2>
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
    </main>
  );
}
