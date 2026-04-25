import fs from 'fs';
import translate from 'translate';

// Configure translate to use google engine without API key
translate.engine = 'google';

const uiFile = 'src/i18n/ui.ts';
let uiContent = fs.readFileSync(uiFile, 'utf8');

// Categories
const categories = [
  { name: "Trending", desc: "The hottest topics breaking across the UK right now" },
  { name: "Guides", desc: "In-depth guides and how-to articles on popular subjects" },
  { name: "Questions", desc: "Answers to the questions Google hasn't answered yet" }
];

// FAQs
const faqs = [
  { q: "What is Blog Worms?", a: "Blog Worms is a UK-based content platform that covers trending topics, viral stories, and questions that haven't been properly answered online." },
  { q: "How often is Blog Worms updated?", a: "We publish new content regularly, often multiple times per week, monitoring UK Google Trends and social media." },
  { q: "Is Blog Worms free to read?", a: "Yes, absolutely! All our content is completely free to read and accessible to everyone." }
];

// Latest Posts (Titles and Descriptions)
const postFiles = fs.readdirSync('src/content/blog').filter(f => f.endsWith('.mdx'));
const posts = postFiles.map(f => {
  const content = fs.readFileSync('src/content/blog/' + f, 'utf8');
  const titleMatch = content.match(/title:\s*['"]?(.*?)['"]?\n/);
  const descMatch = content.match(/description:\s*['"]?(.*?)['"]?\n/);
  return { 
    id: f.replace('.mdx', ''),
    title: titleMatch ? titleMatch[1] : '', 
    desc: descMatch ? descMatch[1] : '' 
  };
});

async function run() {
  const langs = ['en', 'es', 'fr', 'de', 'ar'];

  for (const lang of langs) {
    console.log(`Translating for ${lang}...`);
    let additions = [];
    
    // Categories
    for (let i = 0; i < categories.length; i++) {
      const cat = categories[i];
      const tName = lang === 'en' ? cat.name : await translate(cat.name, { from: 'en', to: lang });
      const tDesc = lang === 'en' ? cat.desc : await translate(cat.desc, { from: 'en', to: lang });
      additions.push(`'cat.${i}.name': '${tName.replace(/'/g, "\\'")}',`);
      additions.push(`'cat.${i}.desc': '${tDesc.replace(/'/g, "\\'")}',`);
    }

    // FAQs
    for (let i = 0; i < faqs.length; i++) {
      const faq = faqs[i];
      const tQ = lang === 'en' ? faq.q : await translate(faq.q, { from: 'en', to: lang });
      const tA = lang === 'en' ? faq.a : await translate(faq.a, { from: 'en', to: lang });
      additions.push(`'faq.${i}.q': '${tQ.replace(/'/g, "\\'")}',`);
      additions.push(`'faq.${i}.a': '${tA.replace(/'/g, "\\'")}',`);
    }

    // Posts
    for (const post of posts) {
      if (post.title) {
        const tTitle = lang === 'en' ? post.title : await translate(post.title, { from: 'en', to: lang });
        additions.push(`'post.${post.id}.title': '${tTitle.replace(/'/g, "\\'")}',`);
      }
      if (post.desc) {
        const tDesc = lang === 'en' ? post.desc : await translate(post.desc, { from: 'en', to: lang });
        additions.push(`'post.${post.id}.desc': '${tDesc.replace(/'/g, "\\'")}',`);
      }
    }

    // Insert into uiContent
    const blockRegex = new RegExp(`${lang}: \\{[\\s\\S]*?\\n\\s*\\},`, 'g');
    uiContent = uiContent.replace(blockRegex, match => {
      // insert before the closing brace
      return match.replace(/\n\s*\},/, `\n    ${additions.join('\\n    ')}\n  },`);
    });
  }

  fs.writeFileSync(uiFile, uiContent);
  console.log('Done!');
}

run();
