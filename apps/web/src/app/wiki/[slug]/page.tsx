import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getArticleBySlug,
  getArticles,
} from '@thematic-content-platform/content-source'
import { RelatedContentBlock } from '../../../widgets/related-content-block'

import styles from './page.module.css'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { routes } from '@/shared/routing'
import { ArticleDetails } from '@/entities/article'

type ArticleDetailsPageProps = {
  params: Promise<{
    slug: string
  }>
}

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
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

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
            label: article.title,
          },
        ]}
      />
      <ArticleDetails article={article} />
      <RelatedContentBlock relations={article.related} />
    </div>
  )
}