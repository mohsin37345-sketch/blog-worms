import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

async function run() {
  try {
    const sharp = require('sharp');
    console.log('Sharp found, optimizing...');
    await sharp('public/images/blog-worms-logo.png')
      .resize(104, 104) // 52px * 2 for retina
      .webp({ quality: 80 })
      .toFile('public/images/blog-worms-logo.webp');
      
    await sharp('public/images/john-ternus-apple-ceo.png')
      .resize(800)
      .webp({ quality: 80 })
      .toFile('public/images/john-ternus-apple-ceo.webp');

    await sharp('public/images/london-tube-strikes-2026.png')
      .resize(800)
      .webp({ quality: 80 })
      .toFile('public/images/london-tube-strikes-2026.webp');

    await sharp('public/images/beverley-callard-illness-im-a-celebrity.png')
      .resize(800)
      .webp({ quality: 80 })
      .toFile('public/images/beverley-callard-illness-im-a-celebrity.webp');

    await sharp('public/images/morrisons-store-closures-2026.png')
      .resize(800)
      .webp({ quality: 80 })
      .toFile('public/images/morrisons-store-closures-2026.webp');

    await sharp('public/images/claudia-doumit-biography.png')
      .resize(800)
      .webp({ quality: 80 })
      .toFile('public/images/claudia-doumit-biography.webp');
    console.log('Images optimized!');
  } catch (e) {
    console.error('Sharp not found or error:', e);
  }
}
run();
