import type { ContentId, Slug } from './shared'

export type Category = {
  id: ContentId
  slug: Slug
  title: string
  description?: string
}