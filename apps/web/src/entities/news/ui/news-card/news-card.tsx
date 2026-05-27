import type { NewsSummary } from '@thematic-content-platform/content-domain'
import Link from 'next/link'

import { formatDisplayDate } from '../../../../shared/lib/date'
import { routes } from '../../../../shared/routing'
import { TagList } from '../../../../shared/ui/tag-list'
import styles from './news-card.module.css'

type NewsCardProps = {
  newsItem: NewsSummary
}

export const NewsCard = ({ newsItem }: NewsCardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <span>{newsItem.category.title}</span>

        <time dateTime={newsItem.publishedAt}>
          {formatDisplayDate(newsItem.publishedAt)}
        </time>
      </div>

      <h2 className={styles.title}>
        <Link href={routes.newsItem(newsItem.slug)}>{newsItem.title}</Link>
      </h2>

      <p className={styles.description}>{newsItem.description}</p>

      <TagList
        getTagHref={(tag) => routes.wikiTag(tag.slug)}
        placement="card"
        tags={newsItem.tags}
      />
    </article>
  )
}
