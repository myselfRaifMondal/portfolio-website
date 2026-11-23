import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  const italic = await readFile(join(process.cwd(), 'app/_fonts/InstrumentSerif-Italic.ttf'));
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f0e8', color: '#1f3b2d', fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 96 }}>
        RM
      </div>
    ),
    { ...size, fonts: [{ name: 'Instrument Serif', data: italic, style: 'italic' }] },
  );
}
