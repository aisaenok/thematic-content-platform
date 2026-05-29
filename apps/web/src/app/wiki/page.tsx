import type { Metadata } from 'next'
import { getArticles } from '@thematic-content-platform/content-source'

import { ArticleCard } from '@/entities/article'
import { EmptyState } from '@/shared/ui/empty-state'
import { Page } from '@/shared/ui/page'

export const metadata: Metadata = {
  title: 'Wiki | Thematic Content Platform',
  description:
    'Список wiki-статей демонстрационного домена Thematic Content Platform.',
}

export default function WikiPage() {
  const articles = getArticles()

  return (
    <Page size="lg">
      <Page.Header
        description="Первый вертикальный срез content-платформы: typed content model, mock content source и server-rendered список статей."
        eyebrow="Demo domain"
        title="Wiki articles"
      />

      <Page.Body
        ariaLabel="Wiki articles"
        variant={articles.length === 0 ? 'default' : 'grid'}
      >
        {articles.length === 0 ? (
          <EmptyState
            title="No articles yet"
            description="В текущем content source пока нет опубликованных wiki-статей."
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
