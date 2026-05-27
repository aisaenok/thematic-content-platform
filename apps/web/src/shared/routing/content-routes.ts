import type { ContentRelation, ContentType, Slug } from '@thematic-content-platform/content-domain'

const assertNever = (value: never): never => {
  throw new Error(`Unhandled content type: ${value}`)
}

export const routes = {
  home: () => '/',
  wiki: () => '/wiki',
  wikiArticle: (slug: Slug) => `/wiki/${slug}`,
  wikiCategory: (slug: Slug) => `/wiki/categories/${slug}`,
  wikiTag: (slug: Slug) => `/wiki/tags/${slug}`,
  news: () => '/news',
  newsItem: (slug: Slug) => `/news/${slug}`,
}

const getContentTypeRoutePrefix = (
  contentType: ContentType,
): string | undefined => {
  switch (contentType) {
    case 'article':
      return routes.wiki()

    case 'news':
      return routes.news()

    case 'character':
      return undefined

    case 'location':
      return undefined

    case 'film':
      return undefined

    case 'book':
      return undefined

    default:
      return assertNever(contentType)
  }
}

export const getContentRelationHref = (
  relation: ContentRelation,
): string | undefined => {
  const routePrefix = getContentTypeRoutePrefix(relation.targetType)

  if (!routePrefix) {
    return undefined
  }

  return `${routePrefix}/${relation.targetSlug}`
}
