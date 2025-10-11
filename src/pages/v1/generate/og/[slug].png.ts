import { Resvg, type ResvgRenderOptions } from '@resvg/resvg-js';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
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

// Brutalist color palette
const colors = [
  '#ff0000', // red
  '#0000ff', // blue
  '#00ff00', // green
  '#ffff00', // yellow
  '#ff69b4', // pink
  '#800080', // purple
  '#ffa500', // orange
  '#008080', // teal
  '#00ffff', // cyan
  '#00ff00', // lime
  '#50c878', // emerald
  '#ff00ff', // fuchsia
  '#8a2be2', // violet
  '#ff69b4', // rose
  '#87ceeb', // sky
  '#ffbf00', // amber
];

const posts = await getCollection('blog');

export function getStaticPaths() {
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { title: post.data.title, description: post.data.description },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const title = props.title.trim() ?? 'Blogpost';
  const description = props.description ?? null;

  // Pick a random color based on title (deterministic so same post always gets same color)
  const colorIndex = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const bgColor = colors[colorIndex];

  const html = toReactElement(`
  <div style="background-color: ${bgColor}; display: flex; flex-direction: column; height: 100%; padding: 3rem; width: 100%">
    <div style="display:flex; position: relative; height: 100%; width: 100%; background-color: white; border: 6px solid black; border-radius: 0.5rem; padding: 2rem; filter: drop-shadow(6px 6px 0 rgb(0 0 0 / 1));">
      <img src="${logoBase64}" style="position: absolute; top: -2rem; right: -2rem; width: 150px; height: 150px;" />
      <div style="display: flex; flex-direction: column; justify-content: space-between; width: 100%; padding-right: 11rem;">
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <p style="font-size: 48px;">eph baum dot dev</p>
          <p style="font-size: 38px;">${title}</p>
        </div>
        <div style="display: flex;">
          <p style="font-size: 24px;">${description}</p>
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
      mode: 'width', // If you need to change the size
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
