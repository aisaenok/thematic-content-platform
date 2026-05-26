import type { ContentId, ContentType } from './shared.js'

export type ContentRelation = {
  id: ContentId
  targetId: ContentId
  targetType: ContentType
  title: string
  description?: string
}