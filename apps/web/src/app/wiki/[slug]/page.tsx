import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getArticleBySlug,
  getArticles,
} from '@thematic-content-platform/content-source'

import styles from './page.module.css'

type ArticleDetailsPageProps = {
  params: Promise<{
    slug: string
  }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return getArticles().map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({
  params,
}: ArticleDetailsPageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Article not found | Thematic Content Platform',
    }
  }

  return {
    title: `${article.title} | Thematic Content Platform`,
    description: article.description,
  }
}

export default async function ArticleDetailsPage({
  params,
}: ArticleDetailsPageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const bodyParagraphs = article.body.split('\n\n')

  return (
    <main className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/wiki">Wiki</Link>
        <span aria-hidden="true">/</span>
        <span>{article.title}</span>
      </nav>

      <article className={styles.article}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{article.category.title}</p>

          <h1 className={styles.title}>{article.title}</h1>

          <p className={styles.description}>{article.description}</p>

          <div className={styles.meta}>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('ru-RU')}
            </time>

            <ul className={styles.tags} aria-label="Tags">
              {article.tags.map((tag) => (
                <li className={styles.tag} key={tag.id}>
                  {tag.title}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <div className={styles.content}>
          {bodyParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  )
}