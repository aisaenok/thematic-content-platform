import type { ContentId, Slug } from './shared.js'

export type Tag = {
  id: ContentId
  slug: Slug
  title: string
}