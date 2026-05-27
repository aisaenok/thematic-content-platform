import type { Category } from './category'
import type { ContentRelation } from './content-relation'
import type { ContentId, ContentStatus, DateISOString, Slug } from './shared'
import type { Tag } from './tag'

export type NewsItem = {
  id: ContentId
  slug: Slug
  title: string
  description: string
  body: string
  status: ContentStatus
  publishedAt: DateISOString
  updatedAt?: DateISOString
  category: Category
  tags: Tag[]
  related: ContentRelation[]
}

export type NewsSummary = Pick<
  NewsItem,
  'id' | 'slug' | 'title' | 'description' | 'publishedAt' | 'category' | 'tags'
>
