/**
 * Post-build script to pretty-print sitemap XML files
 * so they are properly formatted for Google Search Console
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const distDir = './dist';

// Find all sitemap XML files
const files = readdirSync(distDir).filter(f => f.startsWith('sitemap') && f.endsWith('.xml'));

for (const file of files) {
  const filePath = join(distDir, file);
  const raw = readFileSync(filePath, 'utf-8');

  // Pretty-print the XML with proper indentation
  const formatted = raw
    // Add newline after XML declaration
    .replace(/\?></, '?>\n<')
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
    // Clean up any double newlines
    .replace(/\n{3,}/g, '\n\n')
    // Trim trailing whitespace on each line
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .trim() + '\n';

  writeFileSync(filePath, formatted, 'utf-8');
  console.log(`✅ Formatted: ${file}`);
}

console.log(`\n📋 Formatted ${files.length} sitemap file(s)`);
