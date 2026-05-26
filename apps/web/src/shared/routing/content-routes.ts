import type { ContentRelation, ContentType } from '@thematic-content-platform/content-domain'

const assertNever = (value: never): never => {
  throw new Error(`Unhandled content type: ${value}`)
}

const getContentTypeRoutePrefix = (contentType: ContentType): string | undefined => {
  switch (contentType) {
    case 'article':
      return '/wiki'

    case 'news':
      return '/news'

    case 'character':
      return '/characters'

    case 'location':
      return '/locations'

    case 'film':
      return '/films'

    case 'book':
      return '/books'

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