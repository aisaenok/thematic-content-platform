import type { Metadata } from 'next'
import { searchContent } from '@thematic-content-platform/content-source'

import { routes } from '../../shared/routing'
import { SearchResults } from './_ui/search-results'
import styles from './page.module.css'

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
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Search prototype</p>

        <h1 className={styles.title}>Search content</h1>

        <p className={styles.description}>
          Server-side search prototype across wiki articles and news items.
        </p>
      </section>

      <form className={styles.form} action={routes.search()} method="get">
        <label className={styles.label} htmlFor="search-query">
          Search query
        </label>

        <div className={styles.controls}>
          <input
            className={styles.input}
            defaultValue={normalizedQuery}
            id="search-query"
            name="q"
            placeholder="Try xenomorph, platform, facehugger..."
            type="search"
          />

          <button className={styles.button} type="submit">
            Search
          </button>
        </div>
      </form>

      <SearchResults query={normalizedQuery} results={results} />
    </div>
  )
}
