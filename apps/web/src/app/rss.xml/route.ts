import { contentApi } from '@thematic-content-platform/content-source'

import { siteConfig } from '../../shared/config/site'
import { routes } from '../../shared/routing'

type RssItem = {
  title: string
  description: string
  href: string
  publishedAt: string
}

const createAbsoluteUrl = (path: string): string => {
  return new URL(path, siteConfig.url).toString()
}

const escapeXml = (value: string): string => {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

const formatRssDate = (dateISOString: string): string => {
  return new Date(dateISOString).toUTCString()
}

const createRssItem = (item: RssItem): string => {
  const url = createAbsoluteUrl(item.href)

  return `
    <item>
      <title>${escapeXml(item.title)}</title>
      <description>${escapeXml(item.description)}</description>
      <link>${escapeXml(url)}</link>
      <guid>${escapeXml(url)}</guid>
      <pubDate>${formatRssDate(item.publishedAt)}</pubDate>
    </item>
  `
}

const getRssItems = (): RssItem[] => {
  const articleItems: RssItem[] = contentApi.getArticles().map((article) => ({
    title: article.title,
    description: article.description,
    href: routes.wikiArticle(article.slug),
    publishedAt: article.publishedAt,
  }))

  const newsItems: RssItem[] = contentApi.getNewsItems().map((newsItem) => ({
    title: newsItem.title,
    description: newsItem.description,
    href: routes.newsItem(newsItem.slug),
    publishedAt: newsItem.publishedAt,
  }))

  return [...articleItems, ...newsItems].sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() -
      new Date(left.publishedAt).getTime(),
  )
}

export function GET() {
  // RSS uses the public content-source API.
  // Current content-source implementation is mock/local.
  // Future CMS/API adapter should preserve the same public contract.
  const rssItems = getRssItems()

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <description>${escapeXml(
      'Portfolio-grade wiki/content platform prototype for thematic encyclopedia websites.',
    )}</description>
    <link>${escapeXml(siteConfig.url)}</link>
    <language>ru-RU</language>
    <lastBuildDate>${formatRssDate(new Date().toISOString())}</lastBuildDate>
    ${rssItems.map(createRssItem).join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
