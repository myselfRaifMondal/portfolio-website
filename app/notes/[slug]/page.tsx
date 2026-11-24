import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleShell } from '@/components/notes/article-shell';
import { OptionPricer } from '@/components/notes/option-pricer';
import { RiskSizer } from '@/components/notes/risk-sizer';
import { NOTES } from '@/components/notes/notes';
import styles from '@/components/notes/article.module.css';

const FIGURES = { pricer: OptionPricer, sizer: RiskSizer };

export const dynamicParams = false;

export function generateStaticParams() {
  return NOTES.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = NOTES.find((n) => n.slug === slug);
  if (!note) return {};
  const title = `${note.title} | Raif Mondal`;
  return {
    title,
    description: note.dek,
    alternates: { canonical: `/notes/${note.slug}/` },
    openGraph: { type: 'article', url: `/notes/${note.slug}/`, title, description: note.dek },
    twitter: { title, description: note.dek },
  };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = NOTES.findIndex((n) => n.slug === slug);
  if (i < 0) notFound();
  const note = NOTES[i];
  const next = NOTES[(i + 1) % NOTES.length];

  return (
    <ArticleShell>
      <div className={`${styles.strip} ${styles.kicker}`}>
        <span>The Founder Issue · Research notes</span>
        <span>Note No. {note.no}</span>
      </div>
      <article>
        <header className={styles.head}>
          <div className={styles.kicker}>{note.kicker}</div>
          <h1 className={styles.title}>{note.title}</h1>
          <p className={styles.dek}>{note.dek}</p>
          <div className={`${styles.byline} ${styles.kicker}`}>
            <span>By Raif Mondal</span>
            {note.repo && (
              <a href={`https://github.com/myselfRaifMondal/${note.repo}`} target="_blank" rel="noopener" className={styles.source}>
                Code: {note.repo}
              </a>
            )}
          </div>
        </header>
        <div className={styles.body}>
          {note.body.map((block, k) => {
            if ('h' in block) return <h2 key={k}>{block.h}</h2>;
            if ('pull' in block) return <blockquote key={k} className={styles.pull}>{block.pull}</blockquote>;
            if ('figure' in block) {
              const Figure = FIGURES[block.figure];
              return <Figure key={k} />;
            }
            return <p key={k}>{block.p}</p>;
          })}
        </div>
      </article>
      <nav className={styles.foot} aria-label="More from the issue">
        <a href={`/notes/${next.slug}/`} className={styles.footLink}>
          <span className={styles.kicker}>Next note</span>
          <span className={styles.footTitle}>{next.title}</span>
        </a>
        <a href="/#notes" className={styles.footLink}>
          <span className={styles.kicker}>Back to the issue</span>
          <span className={styles.footTitle}>All research notes</span>
        </a>
      </nav>
    </ArticleShell>
  );
}
