import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = 'Raif Mondal, Founder & CEO of IndiQuant. The Founder Issue.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The share card is the magazine cover in miniature: strip, masthead, thesis.
export default async function OpengraphImage() {
  const [regular, italic] = await Promise.all([
    readFile(join(process.cwd(), 'app/_fonts/InstrumentSerif-Regular.ttf')),
    readFile(join(process.cwd(), 'app/_fonts/InstrumentSerif-Italic.ttf')),
  ]);
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#f4f0e8', color: '#141414', padding: '56px 72px', fontFamily: 'Instrument Serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, letterSpacing: 4, paddingBottom: 18, borderBottom: '2px solid #141414' }}>
          <span>ISSUE NO. 22</span>
          <span>THE FOUNDER ISSUE</span>
        </div>
        <div style={{ display: 'flex', marginTop: 40, fontSize: 196, lineHeight: 0.9, letterSpacing: -6 }}>
          <span>Raif&nbsp;</span>
          <span style={{ fontStyle: 'italic', color: '#1f3b2d' }}>Mondal</span>
        </div>
        <div style={{ display: 'flex', marginTop: 'auto', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ fontStyle: 'italic', fontSize: 44, lineHeight: 1.15, maxWidth: 760 }}>
            I build systems that trade, so that discipline never depends on mood.
          </div>
          <div style={{ fontSize: 26, color: '#1f3b2d' }}>Founder &amp; CEO, IndiQuant</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Instrument Serif', data: regular, style: 'normal' },
        { name: 'Instrument Serif', data: italic, style: 'italic' },
      ],
    },
  );
}
