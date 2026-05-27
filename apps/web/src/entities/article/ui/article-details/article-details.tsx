import type { Article } from '@thematic-content-platform/content-domain'
import Link from 'next/link'

import { getArticleBodyParagraphs } from '../../lib'
import { formatDisplayDate } from '../../../../shared/lib/date'
import { routes } from '../../../../shared/routing'
import { ContentDetailsLayout } from '../../../../shared/ui/content-details-layout'
import { TagList } from '../../../../shared/ui/tag-list'
import styles from './article-details.module.css'

type ArticleDetailsProps = {
  article: Article
}

export const ArticleDetails = ({ article }: ArticleDetailsProps) => {
  const bodyParagraphs = getArticleBodyParagraphs(article)

  return (
    <ContentDetailsLayout
      body={bodyParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      description={article.description}
      header={
        <>
          <Link
            className={styles.categoryLink}
            href={routes.wikiCategory(article.category.slug)}
          >
            {article.category.title}
          </Link>

          <time className={styles.date} dateTime={article.publishedAt}>
            {formatDisplayDate(article.publishedAt)}
          </time>
        </>
      }
      tags={
        <TagList
          getTagHref={(tag) => routes.wikiTag(tag.slug)}
          placement="details"
          tags={article.tags}
        />
      }
      title={article.title}
    />
  )
}
