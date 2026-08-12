'use client';

import { useState, type FormEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './shore.module.css';

export function ContactModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 600);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setTimeout(() => setStatus('idle'), 300);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={styles.modalOverlay}>
          <Dialog.Content
            className={styles.modalPanel}
            onOpenAutoFocus={(e) => {
              if (status === 'sent') e.preventDefault();
            }}
          >
            <Dialog.Close
              aria-label="Close"
              className={styles.plainButton}
              style={{
                position: 'absolute',
                right: 20,
                top: 18,
                fontSize: 12,
                color: 'var(--shore-muted)',
                border: 'none',
              }}
            >
              Close
            </Dialog.Close>

            <p
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--shore-muted)',
                margin: 0,
              }}
            >
              {status === 'sent' ? 'Received' : 'Write to me'}
            </p>
            <Dialog.Title
              style={{
                margin: '12px 0 24px',
                fontWeight: 300,
                fontSize: status === 'sent' ? 24 : 30,
                letterSpacing: '-0.02em',
              }}
            >
              {status === 'sent' ? "I'll get back to you directly." : "Tell me what you're building."}
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Send a message to Raif Mondal about research, capital, or partnership context.
            </Dialog.Description>

            {status !== 'sent' ? (
              <div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <label
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 11,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--shore-muted)',
                    }}
                  >
                    Name
                    <input name="name" type="text" required placeholder="Your name" className={styles.formField} />
                  </label>
                  <label
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 11,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--shore-muted)',
                    }}
                  >
                    Email
                    <input name="email" type="email" required placeholder="you@firm.com" className={styles.formField} />
                  </label>
                  <label
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 11,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--shore-muted)',
                    }}
                  >
                    Context
                    <textarea
                      name="message"
                      rows={3}
                      required
                      placeholder="Research, capital, or partnership context."
                      className={styles.formField}
                      style={{ resize: 'vertical' }}
                    />
                  </label>
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
                    <a
                      href="mailto:raifmondal@indiquantresearch.in"
                      className={styles.quietLink}
                      style={{ fontFamily: 'var(--mono)', fontSize: 11 }}
                    >
                      Or email directly
                    </a>
                    <button type="submit" disabled={status === 'sending'} className={styles.plainButton} style={{ fontSize: 13 }}>
                      {status === 'sending' ? 'Sending…' : 'Send'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <Dialog.Close className={styles.plainButton} style={{ marginTop: 8, fontSize: 13 }}>
                  Close
                </Dialog.Close>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
