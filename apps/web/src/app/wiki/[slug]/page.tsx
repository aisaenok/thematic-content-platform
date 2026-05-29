import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { contentApi } from '@thematic-content-platform/content-source'
import { RelatedContentBlock } from '../../../widgets/related-content-block'
import { Page } from '../../../shared/ui/page'

import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { routes } from '@/shared/routing'
import { ArticleDetails } from '@/entities/article'

type ArticleDetailsPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return contentApi.getArticles().map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({
  params,
}: ArticleDetailsPageProps): Promise<Metadata> {
  const { slug } = await params
  const article = contentApi.getArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Article not found | Thematic Content Platform',
    }
  }

  return {
    title: `${article.title} | Thematic Content Platform`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
    },
  }
}

export default async function ArticleDetailsPage({
  params,
}: ArticleDetailsPageProps) {
  const { slug } = await params
  const article = contentApi.getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <Page size="md">
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
            label: article.title,
          },
        ]}
      />

      <Page.Body ariaLabel="Article content" variant="stackSeparated">
        <ArticleDetails article={article} />
        <RelatedContentBlock relations={article.related} />
      </Page.Body>
    </Page>
  )
}
