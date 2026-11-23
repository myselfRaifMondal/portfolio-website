import type { Metadata } from 'next';
import styles from '@/components/issue/issue.module.css';

export const metadata: Metadata = {
  title: 'Page not found | Raif Mondal',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className={styles.root}>
      <div className={styles.wrap}>
        <div className={`${styles.coverStrip} ${styles.kicker}`}>
          <span>Issue No. 22</span>
          <span>Errata</span>
          <span>The Founder Issue</span>
        </div>
        <div className={styles.notFound}>
          <p className={styles.kicker}>p. 404</p>
          <h1 className={styles.bigTitle}>This page is not in the issue.</h1>
          <p className={styles.standfirst}>The link may be old, or mistyped. Everything I have published is on the front page.</p>
          <a href="/" className={styles.bookButton}>
            Back to the cover
          </a>
        </div>
      </div>
    </main>
  );
}
