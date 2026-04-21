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
    console.log('Images optimized!');
  } catch (e) {
    console.error('Sharp not found or error:', e);
  }
}
run();
