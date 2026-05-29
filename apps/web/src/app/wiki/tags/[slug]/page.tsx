import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getArticlesByTagSlug,
  getTagBySlug,
  getTags,
} from '@thematic-content-platform/content-source'

import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { routes } from '@/shared/routing'
import { EmptyState } from '@/shared/ui/empty-state'
import { ArticleCard } from '@/entities/article'
import { Page } from '@/shared/ui/page'

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
            label: tag.title,
          },
        ]}
      />

      <Page.Header
        description={`Подборка опубликованных материалов, помеченных тегом ${tag.title}.`}
        eyebrow="Wiki tag"
        title={tag.title}
      />

      <Page.Body
        ariaLabel={`${tag.title} articles`}
        variant={articles.length === 0 ? 'default' : 'grid'}
      >
        {articles.length === 0 ? (
          <EmptyState
            title="No articles with this tag"
            description="В текущем content source пока нет опубликованных статей с этим тегом."
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
