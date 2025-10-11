import { Resvg, type ResvgRenderOptions } from '@resvg/resvg-js';
import type { APIRoute } from 'astro';
import satori from 'satori';
import { html as toReactElement } from 'satori-html';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// @TODO: Find a public link or add the font to the project
const fontFile = await fetch(
  'https://og-playground.vercel.app/inter-latin-ext-700-normal.woff'
);

const fontData: ArrayBuffer = await fontFile.arrayBuffer();

// Read the logo image from the local filesystem and convert to base64 data URI
// Use process.cwd() to get the project root, which works both in dev and build
const logoPath = join(process.cwd(), 'public/img/ephbaum_dot_dev.png');
const logoBuffer = readFileSync(logoPath);
const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;

const height = 630;
const width = 1200;

export const GET: APIRoute = async () => {
  const link = 'https://ephbaum.dev';
  const html = toReactElement(`
  <div style="background-color: white; display: flex; flex-direction: column; height: 100%; padding: 3rem; width: 100%">
    <div style="display:flex; height: 100%; width: 100%; background-color: white; border: 6px solid black; border-radius: 0.5rem; padding: 2rem; filter: drop-shadow(6px 6px 0 rgb(0 0 0 / 1));">
      <div style="display: flex; flex-direction: column; justify-content: space-between; width: 100%; filter: drop-shadow()">
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">  
          <p style="font-size: 48px;">eph baum dot dev</p>
          <p style="font-size: 38px;">Eph Words</p>
          <p style="font-size: 38px;">A blog about tech and engineering</p>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; padding-top: -2rem;">
          <p style="font-size: 32px">${link}</p>
          <img src="${logoBase64}" style="width: 200px; height: 200px; border: 3px solid black; border-radius: 0.5rem;" />
        </div>
      </div>
    </div>
  </div>
  `);

  const svg = await satori(html, {
    fonts: [
      {
        name: 'Inter Latin',
        data: fontData,
        style: 'normal',
      },
    ],

    height,
    width,
  });

  const opts: ResvgRenderOptions = {
    fitTo: {
      mode: 'width',
      value: width,
    },
  };
  const resvg = new Resvg(svg, opts);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(new Uint8Array(pngBuffer), {
    headers: {
      'content-type': 'image/png',
    },
  });
};
