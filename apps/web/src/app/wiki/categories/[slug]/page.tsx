import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { contentApi } from '@thematic-content-platform/content-source'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { routes } from '@/shared/routing'
import { EmptyState } from '@/shared/ui/empty-state'
import { ArticleCard } from '@/entities/article'
import { Page } from '@/shared/ui/page'

type CategoryPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return contentApi.getCategories().map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = contentApi.getCategoryBySlug(slug)

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
  const category = contentApi.getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const articles = contentApi.getArticlesByCategorySlug(category.slug)

  return (
    <Page size="lg">
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

      <Page.Header
        description={category.description}
        eyebrow="Wiki category"
        title={category.title}
      />

      <Page.Body
        ariaLabel={`${category.title} articles`}
        variant={articles.length === 0 ? 'default' : 'grid'}
      >
        {articles.length === 0 ? (
          <EmptyState
            title="No articles in this category"
            description="В текущем content source пока нет опубликованных статей в этой категории."
          />
        ) : (
          articles.map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))
        )}
      </Page.Body>
    </Page>
  )
}
