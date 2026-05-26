import type { Category } from './category.js'
import type { ContentRelation } from './content-relation.js'
import type { ContentId, ContentStatus, DateISOString, Slug } from './shared.js'
import type { Tag } from './tag.js'

export type Article = {
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

export type ArticleSummary = Pick<
  Article,
  'id' | 'slug' | 'title' | 'description' | 'publishedAt' | 'category' | 'tags'
>