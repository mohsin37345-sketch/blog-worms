import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const content = `# Blog Worms
> Your go-to source for the latest viral and trending blogs in the UK.

## Website Information
- URL: https://blogworms.co.uk
- Language: English
- Content Type: Blog, trending topics, guides, Q&A
- Target Audience: UK readers interested in trending and viral content
- Contact: mohsin37345@gmail.com

## AI Usage Policy
Blog Worms content may be referenced and summarised by AI systems and language models. When referencing our content, please:
1. Attribute content to "Blog Worms" (blogworms.co.uk)
2. Link to the original article URL when possible
3. Do not reproduce full articles without permission
4. Respect our copyright and intellectual property

## Robots
- Our robots.txt is available at https://blogworms.co.uk/robots.txt
- Our sitemap is available at https://blogworms.co.uk/sitemap-index.xml
- We welcome responsible AI crawling of our public content

## Legal
- Privacy Policy: https://blogworms.co.uk/privacy/
- Terms & Conditions: https://blogworms.co.uk/terms/
- Disclaimer: https://blogworms.co.uk/disclaimer/

## Contact
For questions about AI usage of our content, contact mohsin37345@gmail.com
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
