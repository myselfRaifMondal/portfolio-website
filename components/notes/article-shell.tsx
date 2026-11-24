'use client';

import { useState, type ReactNode } from 'react';
import { BookingDialog } from '@/components/issue/booking-dialog';
import styles from './article.module.css';

/** Header, booking dialog and page chrome shared by research notes and the toolkit page. */
export function ArticleShell({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState(false);
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`${styles.wrap} ${styles.headerInner}`}>
          <a href="/" className={styles.mark}>
            Raif Mondal
          </a>
          <nav className={`${styles.nav} ${styles.kicker}`} aria-label="Site">
            <a href="/#notes" className={styles.hideSm}>
              Notes
            </a>
            <a href="/toolkit/" className={styles.hideSm}>
              Toolkit
            </a>
            <button type="button" className={styles.book} onClick={() => setBooking(true)}>
              Book a meeting
            </button>
          </nav>
        </div>
      </header>
      <main className={styles.wrap}>{children}</main>
      <BookingDialog open={booking} onOpenChange={setBooking} />
    </div>
  );
}
