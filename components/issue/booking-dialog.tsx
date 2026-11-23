'use client';

import * as Dialog from '@radix-ui/react-dialog';
import styles from './issue.module.css';

export const CALENDLY = 'https://calendly.com/raifmondal';

/** Calendly scheduling inside the page, so booking never sends the visitor away. */
export function BookingDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const src = `${CALENDLY}?embed_type=Inline&embed_domain=${typeof window === 'undefined' ? '' : window.location.hostname}&hide_gdpr_banner=1&background_color=f4f0e8&text_color=141414&primary_color=1f3b2d`;
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay}>
          <Dialog.Content className={`${styles.panel} ${styles.bookingPanel}`}>
            <Dialog.Close className={styles.close}>Close</Dialog.Close>
            <p className={styles.kicker} style={{ margin: 0 }}>
              Book a meeting
            </p>
            <Dialog.Title className={styles.panelTitle}>Pick a time that suits you.</Dialog.Title>
            <Dialog.Description className="sr-only">Choose a slot in Raif Mondal&apos;s calendar.</Dialog.Description>
            {open && <iframe className={styles.bookingFrame} src={src} title="Raif Mondal's booking calendar" loading="lazy" />}
            <a href={CALENDLY} target="_blank" rel="noopener" className={styles.link} style={{ display: 'inline-block', marginTop: 14, fontSize: 13 }}>
              Calendar not loading? Open it in a new tab
            </a>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
