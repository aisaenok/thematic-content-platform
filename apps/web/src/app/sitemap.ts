import type { MetadataRoute } from 'next'
import {
  getArticles,
  getCategories,
  getNewsItems,
  getTags,
} from '@thematic-content-platform/content-source'

import { siteConfig } from '../shared/config/site'
import { routes } from '../shared/routing'

const createAbsoluteUrl = (path: string): string => {
  return new URL(path, siteConfig.url).toString()
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Sitemap uses the public content-source API.
  // Current content-source implementation is mock/local.
  // Future CMS/API adapter should preserve the same public contract.
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: createAbsoluteUrl(routes.home()),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: createAbsoluteUrl(routes.wiki()),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: createAbsoluteUrl(routes.news()),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const articleRoutes: MetadataRoute.Sitemap = getArticles().map((article) => ({
    url: createAbsoluteUrl(routes.wikiArticle(article.slug)),
    lastModified: article.publishedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const categoryRoutes: MetadataRoute.Sitemap = getCategories().map(
    (category) => ({
      url: createAbsoluteUrl(routes.wikiCategory(category.slug)),
      changeFrequency: 'weekly',
      priority: 0.6,
    }),
  )

  const tagRoutes: MetadataRoute.Sitemap = getTags().map((tag) => ({
    url: createAbsoluteUrl(routes.wikiTag(tag.slug)),
    changeFrequency: 'weekly',
    priority: 0.5,
  }))

  const newsRoutes: MetadataRoute.Sitemap = getNewsItems().map((newsItem) => ({
    url: createAbsoluteUrl(routes.newsItem(newsItem.slug)),
    lastModified: newsItem.publishedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    ...staticRoutes,
    ...articleRoutes,
    ...categoryRoutes,
    ...tagRoutes,
    ...newsRoutes,
  ]
}
