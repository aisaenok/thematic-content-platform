import type { NewsSummary } from '@thematic-content-platform/content-domain'

import { formatDisplayDate } from '../../../../shared/lib/date'
import { routes } from '../../../../shared/routing'
import { ContentPreviewCard } from '../../../../shared/ui/content-preview-card'
import { TagList } from '../../../../shared/ui/tag-list'

type NewsCardProps = {
  newsItem: NewsSummary
}

export const NewsCard = ({ newsItem }: NewsCardProps) => {
  const footer =
    newsItem.tags.length > 0 ? (
      <TagList
        getTagHref={(tag) => routes.wikiTag(tag.slug)}
        placement="card"
        tags={newsItem.tags}
      />
    ) : undefined

  return (
    <ContentPreviewCard
      description={newsItem.description}
      footer={footer}
      header={
        <>
          <span>{newsItem.category.title}</span>

          <time dateTime={newsItem.publishedAt}>
            {formatDisplayDate(newsItem.publishedAt)}
          </time>
        </>
      }
      href={routes.newsItem(newsItem.slug)}
      title={newsItem.title}
    />
  )
}
