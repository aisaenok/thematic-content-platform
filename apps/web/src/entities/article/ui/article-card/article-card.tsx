import type { ArticleSummary } from '@thematic-content-platform/content-domain'
import Link from 'next/link'

import styles from './article-card.module.css'
import { formatDisplayDate } from '@/shared/lib/date'
import { routes } from '@/shared/routing'
import { TagList } from '@/shared/ui/tag-list'

type ArticleCardProps = {
  article: ArticleSummary
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <Link href={routes.wikiCategory(article.category.slug)}>
          {article.category.title}
        </Link>

        <time dateTime={article.publishedAt}>{formatDisplayDate(article.publishedAt)}</time>
      </div>

      <h2 className={styles.title}>
        <Link href={routes.wikiArticle(article.slug)}>{article.title}</Link>
      </h2>

      <p className={styles.description}>{article.description}</p>

      <TagList
        getTagHref={(tag) => routes.wikiTag(tag.slug)}
        placement="card"
        tags={article.tags}
      />
    </article>
  )
}
