import type { ContentId, Slug } from './shared.js'

export type Category = {
  id: ContentId
  slug: Slug
  title: string
  description?: string
}