import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticles } from '@thematic-content-platform/content-source'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Wiki | Thematic Content Platform',
  description:
    'Список wiki-статей демонстрационного домена Thematic Content Platform.',
}

export default function WikiPage() {
  const articles = getArticles()

  return (
    <main className={styles.page}>
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
          <article className={styles.card} key={article.id}>
            <div className={styles.cardMeta}>
              <span>{article.category.title}</span>
              <span>{new Date(article.publishedAt).toLocaleDateString('ru-RU')}</span>
            </div>

            <h2 className={styles.cardTitle}>
              <Link href={`/wiki/${article.slug}`}>{article.title}</Link>
            </h2>

            <p className={styles.cardDescription}>{article.description}</p>

            <ul className={styles.tags} aria-label="Tags">
              {article.tags.map((tag) => (
                <li className={styles.tag} key={tag.id}>
                  {tag.title}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  )
}
