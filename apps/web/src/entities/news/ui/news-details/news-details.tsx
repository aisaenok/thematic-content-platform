import type { NewsItem } from '@thematic-content-platform/content-domain'
import Link from 'next/link'

import { getNewsBodyParagraphs } from '../../lib'
import { formatDisplayDate } from '../../../../shared/lib/date'
import { routes } from '../../../../shared/routing'
import { ContentDetailsLayout } from '../../../../shared/ui/content-details-layout'
import { TagList } from '../../../../shared/ui/tag-list'
import styles from './news-details.module.css'

type NewsDetailsProps = {
  newsItem: NewsItem
}

export const NewsDetails = ({ newsItem }: NewsDetailsProps) => {
  const bodyParagraphs = getNewsBodyParagraphs(newsItem)

  return (
    <ContentDetailsLayout
      body={bodyParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      description={newsItem.description}
      header={
        <>
          <Link
            className={styles.categoryLink}
            href={routes.wikiCategory(newsItem.category.slug)}
          >
            {newsItem.category.title}
          </Link>

          <time className={styles.date} dateTime={newsItem.publishedAt}>
            {formatDisplayDate(newsItem.publishedAt)}
          </time>
        </>
      }
      tags={
        <TagList
          getTagHref={(tag) => routes.wikiTag(tag.slug)}
          placement="details"
          tags={newsItem.tags}
        />
      }
      title={newsItem.title}
    />
  )
}
