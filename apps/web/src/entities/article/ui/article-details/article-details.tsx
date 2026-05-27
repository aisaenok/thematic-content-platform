import type { Article } from '@thematic-content-platform/content-domain'

import styles from './article-details.module.css'
import { getArticleBodyParagraphs } from '../../lib/get-article-body-paragraphs'

type ArticleDetailsProps = {
  article: Article
}

export const ArticleDetails = ({ article }: ArticleDetailsProps) => {
  const bodyParagraphs = getArticleBodyParagraphs(article)

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.metaRow}>
          <p className={styles.eyebrow}>{article.category.title}</p>

          <time className={styles.date} dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('ru-RU')}
          </time>
        </div>

        <h1 className={styles.title}>{article.title}</h1>

        <p className={styles.description}>{article.description}</p>

        <ul className={styles.tags} aria-label="Tags">
          {article.tags.map((tag) => (
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