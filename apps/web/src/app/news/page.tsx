import type { Metadata } from 'next'
import { getNewsItems } from '@thematic-content-platform/content-source'

import { NewsCard } from '../../entities/news'
import { EmptyState } from '../../shared/ui/empty-state'
import { Page } from '../../shared/ui/page'

export const metadata: Metadata = {
  title: 'News | Thematic Content Platform',
  description:
    'News-срез демонстрационного домена Thematic Content Platform.',
}

export default function NewsPage() {
  const newsItems = getNewsItems()

  return (
    <Page size="lg">
      <Page.Header
        description="News-сущность показывает, что платформа может поддерживать несколько типов контента, а не только wiki-статьи."
        eyebrow="Second content type"
        title="News"
      />

      <Page.Body
        ariaLabel="News items"
        variant={newsItems.length === 0 ? 'default' : 'grid'}
      >
        {newsItems.length === 0 ? (
          <EmptyState
            title="No news yet"
            description="В текущем content source пока нет опубликованных news-материалов."
          />
        ) : (
          newsItems.map((newsItem) => (
            <NewsCard key={newsItem.id} newsItem={newsItem} />
          ))
        )}
      </Page.Body>
    </Page>
  )
}
