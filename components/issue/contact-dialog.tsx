'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { EMAIL } from './site';
import styles from './issue.module.css';

export function ContactDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [sent, setSent] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // The submit button unmounts on success, so move focus to the new title for screen readers.
  useEffect(() => {
    if (sent) titleRef.current?.focus();
  }, [sent]);

  // Static site, no backend: hand the note to the visitor's mail app so nothing typed is lost.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') || '');
    const from = String(data.get('email') || '');
    const message = String(data.get('message') || '');
    const subject = encodeURIComponent(`A note from ${name}`);
    const body = encodeURIComponent(`${message}\r\n\r\n${name}\r\n${from}`); // RFC 6068 line breaks
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setSent(false);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} data-lenis-prevent>
          <Dialog.Content className={styles.panel}>
            <Dialog.Close className={styles.close}>Close</Dialog.Close>
            <p className={styles.kicker} style={{ margin: 0 }}>
              Correspondence
            </p>
            <Dialog.Title ref={titleRef} tabIndex={-1} className={styles.panelTitle} style={{ outline: 'none' }}>
              {sent ? 'Your mail app should now be open.' : 'Write to me.'}
            </Dialog.Title>
            <Dialog.Description className="sr-only">Send Raif Mondal a note. It opens in your own mail app.</Dialog.Description>

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
                <p className={styles.label} style={{ textTransform: 'none', letterSpacing: 0, fontSize: 13 }}>
                  All fields are required. Your note opens in your own mail app, ready to send.
                </p>
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
                  <textarea
                    name="message"
                    rows={4}
                    required
                    maxLength={1500}
                    placeholder="What would you like to discuss?"
                    className={styles.field}
                    style={{ resize: 'vertical' }}
                  />
                </label>
                <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
                  <a href={`mailto:${EMAIL}`} className={styles.link} style={{ fontSize: 15 }}>
                    Or email directly
                  </a>
                  <button type="submit" className={styles.send}>
                    Open in my mail app
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
