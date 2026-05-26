import type { Metadata } from 'next'
import { getArticles } from '@thematic-content-platform/content-source'

import styles from './page.module.css'
import { ArticleCard } from '@/entities/article'

export const metadata: Metadata = {
  title: 'Wiki | Thematic Content Platform',
  description:
    'Список wiki-статей демонстрационного домена Thematic Content Platform.',
}

export default function WikiPage() {
  const articles = getArticles()

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Demo domain</p>

        <h1 className={styles.title}>Wiki articles</h1>

        <p className={styles.description}>
          Первый вертикальный срез content-платформы: typed content model,
          mock content source и server-rendered список статей.
        </p>
      </section>

      <section className={styles.grid} aria-label="Wiki articles">
        {articles.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </section>
    </div>
  )
}
