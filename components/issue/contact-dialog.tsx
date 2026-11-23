'use client';

import { useState, type FormEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './issue.module.css';

const EMAIL = 'raifmondal@indiquantresearch.in';

export function ContactDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [sent, setSent] = useState(false);

  // Static site, no backend: hand the note to the visitor's mail app so nothing typed is lost.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') || '');
    const from = String(data.get('email') || '');
    const message = String(data.get('message') || '');
    const subject = encodeURIComponent(`A note from ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${from}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setTimeout(() => setSent(false), 300);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay}>
          <Dialog.Content className={styles.panel}>
            <Dialog.Close className={styles.close}>Close</Dialog.Close>
            <p className={styles.kicker} style={{ margin: 0 }}>
              Correspondence
            </p>
            <Dialog.Title className={styles.panelTitle}>{sent ? 'Your mail app should now be open.' : 'Write to me.'}</Dialog.Title>
            <Dialog.Description className="sr-only">Send Raif Mondal a note.</Dialog.Description>

            {sent ? (
              <p style={{ margin: 0, color: 'var(--ink-soft)' }}>
                If nothing opened, write to{' '}
                <a href={`mailto:${EMAIL}`} className={styles.link}>
                  {EMAIL}
                </a>
                .
              </p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <label className={styles.label}>
                  Name
                  <input name="name" required autoComplete="name" placeholder="Your name" className={styles.field} />
                </label>
                <label className={styles.label}>
                  Email
                  <input name="email" type="email" required autoComplete="email" placeholder="you@firm.com" className={styles.field} />
                </label>
                <label className={styles.label}>
                  Your note
                  <textarea name="message" rows={4} required placeholder="What would you like to discuss?" className={styles.field} style={{ resize: 'vertical' }} />
                </label>
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
                  <a href={`mailto:${EMAIL}`} className={styles.link} style={{ fontSize: 15 }}>
                    Or email directly
                  </a>
                  <button type="submit" className={styles.send}>
                    Send
                  </button>
                </div>
              </form>
            )}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
