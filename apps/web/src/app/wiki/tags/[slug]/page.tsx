import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getArticlesByTagSlug,
  getTagBySlug,
  getTags,
} from '@thematic-content-platform/content-source'

import styles from './page.module.css'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { routes } from '@/shared/routing'
import { EmptyState } from '@/shared/ui/empty-state'
import { ArticleCard } from '@/entities/article'

type TagPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getTags().map((tag) => ({
    slug: tag.slug,
  }))
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { slug } = await params
  const tag = getTagBySlug(slug)

  if (!tag) {
    return {
      title: 'Tag not found | Thematic Content Platform',
    }
  }

  return {
    title: `${tag.title} | Wiki tags`,
    description: `Материалы по тегу ${tag.title} в demo wiki-срезе Thematic Content Platform.`,
    openGraph: {
      title: tag.title,
      description: `Материалы по тегу ${tag.title} в Thematic Content Platform.`,
      type: 'website',
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params
  const tag = getTagBySlug(slug)

  if (!tag) {
    notFound()
  }

  const articles = getArticlesByTagSlug(tag.slug)

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          {
            label: 'Home',
            href: routes.home(),
          },
          {
            label: 'Wiki',
            href: routes.wiki(),
          },
          {
            label: tag.title,
          },
        ]}
      />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>Wiki tag</p>

        <h1 className={styles.title}>{tag.title}</h1>

        <p className={styles.description}>
          Подборка опубликованных материалов, помеченных тегом {tag.title}.
        </p>
      </section>

      {articles.length === 0 ? (
        <EmptyState
          title="No articles with this tag"
          description="В текущем content source пока нет опубликованных статей с этим тегом."
        />
      ) : (
        <section className={styles.grid} aria-label={`${tag.title} articles`}>
          {articles.map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))}
        </section>
      )}
    </div>
  )
}
