import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getArticlesByCategorySlug,
  getCategories,
  getCategoryBySlug,
} from '@thematic-content-platform/content-source'
import styles from './page.module.css'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { routes } from '@/shared/routing'
import { EmptyState } from '@/shared/ui/empty-state'
import { ArticleCard } from '@/entities/article'

type CategoryPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getCategories().map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    return {
      title: 'Category not found | Thematic Content Platform',
    }
  }

  return {
    title: `${category.title} | Wiki categories`,
    description:
      category.description ??
      `Материалы категории ${category.title} в demo wiki-срезе Thematic Content Platform.`,
    openGraph: {
      title: category.title,
      description:
        category.description ??
        `Материалы категории ${category.title} в Thematic Content Platform.`,
      type: 'website',
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const articles = getArticlesByCategorySlug(category.slug)

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
            label: category.title,
          },
        ]}
      />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>Wiki category</p>

        <h1 className={styles.title}>{category.title}</h1>

        {category.description ? (
          <p className={styles.description}>{category.description}</p>
        ) : null}
      </section>

      {articles.length === 0 ? (
        <EmptyState
          title="No articles in this category"
          description="В текущем content source пока нет опубликованных статей в этой категории."
        />
      ) : (
        <section className={styles.grid} aria-label={`${category.title} articles`}>
          {articles.map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))}
        </section>
      )}
    </div>
  )
}