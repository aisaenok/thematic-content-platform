import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getNewsItemBySlug,
  getNewsItems,
} from '@thematic-content-platform/content-source'

import { NewsDetails } from '../../../entities/news'
import { routes } from '../../../shared/routing'
import { Breadcrumbs } from '../../../shared/ui/breadcrumbs'
import { RelatedContentBlock } from '../../../widgets/related-content-block'
import styles from './page.module.css'

type NewsDetailsPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getNewsItems().map((newsItem) => ({
    slug: newsItem.slug,
  }))
}

export async function generateMetadata({
  params,
}: NewsDetailsPageProps): Promise<Metadata> {
  const { slug } = await params
  const newsItem = getNewsItemBySlug(slug)

  if (!newsItem) {
    return {
      title: 'News item not found | Thematic Content Platform',
    }
  }

  return {
    title: `${newsItem.title} | News`,
    description: newsItem.description,
    openGraph: {
      title: newsItem.title,
      description: newsItem.description,
      type: 'article',
      publishedTime: newsItem.publishedAt,
    },
  }
}

export default async function NewsDetailsPage({
  params,
}: NewsDetailsPageProps) {
  const { slug } = await params
  const newsItem = getNewsItemBySlug(slug)

  if (!newsItem) {
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
            label: 'News',
            href: routes.news(),
          },
          {
            label: newsItem.title,
          },
        ]}
      />
      <NewsDetails newsItem={newsItem} />
      <RelatedContentBlock relations={newsItem.related} />
    </div>
  )
}
