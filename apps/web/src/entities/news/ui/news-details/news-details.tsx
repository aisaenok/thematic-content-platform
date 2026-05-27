import type { NewsItem } from '@thematic-content-platform/content-domain'

import { getNewsBodyParagraphs } from '../../lib'
import { formatDisplayDate } from '../../../../shared/lib/date'
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

        <ul className={styles.tags} aria-label="Tags">
          {newsItem.tags.map((tag) => (
            <li className={styles.tag} key={tag.id}>
              {tag.title}
            </li>
          ))}
        </ul>
      </header>

      <div className={styles.content}>
        {bodyParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}
