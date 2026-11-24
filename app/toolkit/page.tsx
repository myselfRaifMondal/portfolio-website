import type { Metadata } from 'next';
import { ArticleShell } from '@/components/notes/article-shell';
import { NOTES } from '@/components/notes/notes';
import styles from '@/components/notes/article.module.css';

export const metadata: Metadata = {
  title: 'Toolkit | Raif Mondal',
  description: 'The languages, libraries, data sources and methods I use for quantitative research, set as a type specimen.',
  alternates: { canonical: '/toolkit/' },
};

// Only what appears in my public quantitative repositories.
const KIT = [
  { group: 'Languages', name: 'Python', items: 'Python for research and engines; TypeScript for interfaces; SQL for storage.' },
  { group: 'Numerical', name: 'NumPy & pandas', items: 'NumPy, pandas, SciPy optimisation, statsmodels (Holt-Winters forecasting), Decimal for money.' },
  { group: 'Modelling', name: 'scikit-learn', items: 'Neural-network regression, logistic regression, ensembles, grid search with cross-validation; FinBERT through Hugging Face transformers.' },
  { group: 'Market data', name: 'Angel One SmartAPI', items: 'Live NSE ticks over WebSocket, Yahoo Finance, screener.in balance sheets, the BSE listing, Moneycontrol and Investing.com news.' },
  { group: 'Methods', name: 'Black-Scholes', items: 'Option pricing, maximum-likelihood credit buckets, probability of default and expected loss, Sharpe, drawdown and profit factor, execution simulation with spread and slippage.' },
  { group: 'Building', name: 'FastAPI & Streamlit', items: 'FastAPI, Flask, SQLAlchemy with SQLite and Postgres, Streamlit dashboards, Docker Compose, pytest.' },
  { group: 'Charts', name: 'Matplotlib', items: 'Matplotlib, seaborn and Plotly for research; hand-drawn SVG for this site.' },
];

export default function ToolkitPage() {
  return (
    <ArticleShell>
      <div className={`${styles.strip} ${styles.kicker}`}>
        <span>The Founder Issue · Specimen</span>
        <span>Toolkit</span>
      </div>
      <header className={styles.head}>
        <div className={styles.kicker}>What I work with</div>
        <h1 className={styles.title}>The toolkit</h1>
        <p className={styles.dek}>Set like a type specimen: each tool in its own size, with the work it does. Only what my public research actually uses.</p>
      </header>
      <section className={styles.specimen} aria-label="Tools by group">
        {KIT.map((k) => (
          <div key={k.group}>
            <div className={styles.kicker}>{k.group}</div>
            <div className={styles.specimenName}>{k.name}</div>
            <p className={styles.specimenItems}>{k.items}</p>
          </div>
        ))}
      </section>
      <nav className={styles.foot} aria-label="Research notes">
        {NOTES.slice(0, 2).map((n) => (
          <a key={n.slug} href={`/notes/${n.slug}/`} className={styles.footLink}>
            <span className={styles.kicker}>Research note No. {n.no}</span>
            <span className={styles.footTitle}>{n.title}</span>
          </a>
        ))}
      </nav>
    </ArticleShell>
  );
}
