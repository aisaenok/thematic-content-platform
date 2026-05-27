import type { ArticleSummary } from '@thematic-content-platform/content-domain'
import Link from 'next/link'

import { formatDisplayDate } from '@/shared/lib/date'
import { routes } from '@/shared/routing'
import { ContentPreviewCard } from '@/shared/ui/content-preview-card'
import { TagList } from '@/shared/ui/tag-list'

type ArticleCardProps = {
  article: ArticleSummary
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const footer =
    article.tags.length > 0 ? (
      <TagList
        getTagHref={(tag) => routes.wikiTag(tag.slug)}
        placement="card"
        tags={article.tags}
      />
    ) : undefined

  return (
    <ContentPreviewCard
      description={article.description}
      footer={footer}
      header={
        <>
          <Link href={routes.wikiCategory(article.category.slug)}>
            {article.category.title}
          </Link>

          <time dateTime={article.publishedAt}>
            {formatDisplayDate(article.publishedAt)}
          </time>
        </>
      }
      href={routes.wikiArticle(article.slug)}
      title={article.title}
    />
  )
}
