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
  search: (query?: string) => {
    if (!query) {
      return '/search'
    }

    const searchParams = new URLSearchParams({
      q: query,
    })

    return `/search?${searchParams.toString()}`
  },
}

type ContentRouteTarget = {
  contentType: ContentType
  slug: Slug
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

export const getContentHref = ({
  contentType,
  slug,
}: ContentRouteTarget): string | undefined => {
  const routePrefix = getContentTypeRoutePrefix(contentType)

  if (!routePrefix) {
    return undefined
  }

  return `${routePrefix}/${slug}`
}

export const getContentRelationHref = (
  relation: ContentRelation,
): string | undefined => {
  return getContentHref({
    contentType: relation.targetType,
    slug: relation.targetSlug,
  })
}
