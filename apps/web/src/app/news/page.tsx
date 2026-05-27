import type { Metadata } from 'next'
import { getNewsItems } from '@thematic-content-platform/content-source'

import { NewsCard } from '../../entities/news'
import { EmptyState } from '../../shared/ui/empty-state'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'News | Thematic Content Platform',
  description:
    'News-срез демонстрационного домена Thematic Content Platform.',
}

export default function NewsPage() {
  const newsItems = getNewsItems()

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Second content type</p>

        <h1 className={styles.title}>News</h1>

        <p className={styles.description}>
          News-сущность показывает, что платформа может поддерживать несколько
          типов контента, а не только wiki-статьи.
        </p>
      </section>

      {newsItems.length === 0 ? (
        <EmptyState
          title="No news yet"
          description="В текущем content source пока нет опубликованных news-материалов."
        />
      ) : (
        <section className={styles.grid} aria-label="News items">
          {newsItems.map((newsItem) => (
            <NewsCard key={newsItem.id} newsItem={newsItem} />
          ))}
        </section>
      )}
    </div>
  )
}
