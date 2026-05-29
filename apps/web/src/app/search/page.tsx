import type { Metadata } from 'next'
import { searchContent } from '@thematic-content-platform/content-source'

import { Page } from '../../shared/ui/page'
import { SearchForm } from './_ui/search-form'
import { SearchResults } from './_ui/search-results'

type SearchPageProps = {
  searchParams: Promise<{
    q?: string
  }>
}

export const metadata: Metadata = {
  title: 'Search | Thematic Content Platform',
  description:
    'Search prototype for Thematic Content Platform demo content.',
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '' } = await searchParams
  const normalizedQuery = q.trim()
  const results = searchContent(normalizedQuery)

  return (
    <Page size="lg">
      <Page.Header
        description="Server-side search prototype across wiki articles and news items."
        eyebrow="Search prototype"
        title="Search content"
      />

      <Page.Body>
        <SearchForm defaultValue={normalizedQuery} />

        <SearchResults query={normalizedQuery} results={results} />
      </Page.Body>
    </Page>
  )
}
