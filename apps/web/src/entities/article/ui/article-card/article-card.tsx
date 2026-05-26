import type { ArticleSummary } from '@thematic-content-platform/content-domain'
import Link from 'next/link'

import styles from './article-card.module.css'
import { routes } from '@/shared/routing'

type ArticleCardProps = {
  article: ArticleSummary
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <span>{article.category.title}</span>

        <time dateTime={article.publishedAt}>
          {new Date(article.publishedAt).toLocaleDateString('ru-RU')}
        </time>
      </div>

      <h2 className={styles.title}>
        <Link href={routes.wikiArticle(article.slug)}>{article.title}</Link>
      </h2>

      <p className={styles.description}>{article.description}</p>

      <ul className={styles.tags} aria-label="Tags">
        {article.tags.map((tag) => (
          <li className={styles.tag} key={tag.id}>
            {tag.title}
          </li>
        ))}
      </ul>
    </article>
  )
}