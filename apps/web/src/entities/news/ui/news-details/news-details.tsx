import type { NewsItem } from '@thematic-content-platform/content-domain'

import { getNewsBodyParagraphs } from '../../lib'
import { formatDisplayDate } from '../../../../shared/lib/date'
import { routes } from '../../../../shared/routing'
import { TagList } from '../../../../shared/ui/tag-list'
import styles from './news-details.module.css'

type NewsDetailsProps = {
  newsItem: NewsItem
}

export const NewsDetails = ({ newsItem }: NewsDetailsProps) => {
  const bodyParagraphs = getNewsBodyParagraphs(newsItem)

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.metaRow}>
          <p className={styles.eyebrow}>{newsItem.category.title}</p>

          <time className={styles.date} dateTime={newsItem.publishedAt}>
            {formatDisplayDate(newsItem.publishedAt)}
          </time>
        </div>

        <h1 className={styles.title}>{newsItem.title}</h1>

        <p className={styles.description}>{newsItem.description}</p>

        <TagList
          getTagHref={(tag) => routes.wikiTag(tag.slug)}
          placement="details"
          tags={newsItem.tags}
        />
      </header>

      <div className={styles.content}>
        {bodyParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}
