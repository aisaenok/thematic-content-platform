import type { Article } from '@thematic-content-platform/content-domain'

import styles from './article-details.module.css'
import { getArticleBodyParagraphs } from '../../lib/get-article-body-paragraphs'
import Link from 'next/link'
import { formatDisplayDate } from '@/shared/lib/date'
import { routes } from '@/shared/routing'
import { TagList } from '@/shared/ui/tag-list'

type ArticleDetailsProps = {
  article: Article
}

export const ArticleDetails = ({ article }: ArticleDetailsProps) => {
  const bodyParagraphs = getArticleBodyParagraphs(article)

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.metaRow}>
          <Link
            className={styles.eyebrow}
            href={routes.wikiCategory(article.category.slug)}
          >
            {article.category.title}
          </Link>

          <time className={styles.date} dateTime={article.publishedAt}>
            {formatDisplayDate(article.publishedAt)}
          </time>
        </div>

        <h1 className={styles.title}>{article.title}</h1>

        <p className={styles.description}>{article.description}</p>

        <TagList
          getTagHref={(tag) => routes.wikiTag(tag.slug)}
          placement="details"
          tags={article.tags}
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
