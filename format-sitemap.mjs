/**
 * Post-build script to:
 * 1. Pretty-print sitemap XML files
 * 2. Inject XSL stylesheet so browsers render them as formatted tables
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const distDir = './dist';

// Find all sitemap XML files
const files = readdirSync(distDir).filter(f => f.startsWith('sitemap') && f.endsWith('.xml'));

for (const file of files) {
  const filePath = join(distDir, file);
  let raw = readFileSync(filePath, 'utf-8');

  // Inject XSL stylesheet reference right after the XML declaration
  raw = raw.replace(
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>'
  );

  // Pretty-print the XML with proper indentation
  const formatted = raw
    // Add newline after XSL processing instruction and before root tag
    .replace(/\?>\s*<(urlset|sitemapindex)/g, '?>\n<$1')
    // Add newline after opening root tags
    .replace(/(<(?:urlset|sitemapindex)[^>]*>)/g, '$1\n')
    // Add newline before closing root tags
    .replace(/<\/(urlset|sitemapindex)>/g, '\n</$1>')
    // Each <url> or <sitemap> on its own line with indentation
    .replace(/<(url|sitemap)>/g, '\n  <$1>')
    // Closing </url> or </sitemap>
    .replace(/<\/(url|sitemap)>/g, '\n  </$1>')
    // Each child element inside <url> on its own line
    .replace(/<(loc|lastmod|changefreq|priority)>/g, '\n    <$1>')
    // Each xhtml:link on its own line
    .replace(/<xhtml:link/g, '\n    <xhtml:link')
    // Clean up any triple+ newlines
    .replace(/\n{3,}/g, '\n\n')
    // Trim trailing whitespace on each line
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .trim() + '\n';

  writeFileSync(filePath, formatted, 'utf-8');
  console.log(`✅ Formatted: ${file}`);
}

console.log(`\n📋 Formatted ${files.length} sitemap file(s) with XSL stylesheet`);
