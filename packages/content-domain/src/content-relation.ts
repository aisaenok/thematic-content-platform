import type { ContentId, ContentType, Slug } from './shared'

export type ContentRelation = {
  id: ContentId
  targetId: ContentId
  targetSlug: Slug
  targetType: ContentType
  title: string
  description?: string
}