<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <!-- Sitemap Index Template -->
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap — Blog Worms</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <style type="text/css">
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            color: #1a1a2e;
            background: #f8f9fa;
            padding: 2rem;
          }
          .container {
            max-width: 1000px;
            margin: 0 auto;
          }
          h1 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.25rem;
            color: #1a1a2e;
          }
          .subtitle {
            color: #6b7280;
            font-size: 0.875rem;
            margin-bottom: 1.5rem;
          }
          .info-box {
            background: #e8f4fd;
            border: 1px solid #bee3f8;
            border-radius: 8px;
            padding: 1rem 1.25rem;
            margin-bottom: 1.5rem;
            font-size: 0.85rem;
            color: #2b6cb0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          }
          th {
            background: #1a1a2e;
            color: #fff;
            text-align: left;
            padding: 0.75rem 1rem;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          td {
            padding: 0.6rem 1rem;
            border-bottom: 1px solid #f0f0f0;
            font-size: 0.85rem;
          }
          tr:hover td { background: #f8f9fa; }
          a { color: #2563eb; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .priority { text-align: center; }
          .changefreq { text-align: center; }
          .count {
            color: #6b7280;
            font-size: 0.8rem;
            margin-top: 1rem;
          }
          .badge {
            display: inline-block;
            background: #e2e8f0;
            color: #475569;
            padding: 0.15rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🐛 Blog Worms — XML Sitemap</h1>
          <p class="subtitle">
            This is an XML sitemap, meant for consumption by search engines.
            You can find more info at <a href="https://www.sitemaps.org/">sitemaps.org</a>.
          </p>
          <div class="info-box">
            This sitemap is automatically generated and contains all indexable pages on blogworms.co.uk.
            Submit <strong>https://blogworms.co.uk/sitemap-index.xml</strong> to Google Search Console.
          </div>

          <!-- Sitemap Index -->
          <xsl:if test="sitemap:sitemapindex">
            <table>
              <thead>
                <tr>
                  <th>Sitemap URL</th>
                  <th>Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                  <tr>
                    <td>
                      <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                    </td>
                    <td>
                      <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
            <p class="count">
              Total: <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/> sitemap(s)
            </p>
          </xsl:if>

          <!-- URL Set -->
          <xsl:if test="sitemap:urlset">
            <table>
              <thead>
                <tr>
                  <th style="width:50%">URL</th>
                  <th>Hreflang</th>
                  <th class="changefreq">Change Freq</th>
                  <th class="priority">Priority</th>
                  <th>Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                    </td>
                    <td>
                      <xsl:if test="xhtml:link">
                        <xsl:for-each select="xhtml:link">
                          <span class="badge"><xsl:value-of select="@hreflang"/></span>
                          <xsl:text> </xsl:text>
                        </xsl:for-each>
                      </xsl:if>
                    </td>
                    <td class="changefreq">
                      <xsl:value-of select="sitemap:changefreq"/>
                    </td>
                    <td class="priority">
                      <xsl:value-of select="sitemap:priority"/>
                    </td>
                    <td>
                      <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
            <p class="count">
              Total: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URL(s)
            </p>
          </xsl:if>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
