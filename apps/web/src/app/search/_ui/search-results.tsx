import type { ContentSearchResult } from '@thematic-content-platform/content-source'

import { formatDisplayDate } from '../../../shared/lib/date'
import { getContentHref, routes } from '../../../shared/routing'
import { ContentPreviewCard } from '../../../shared/ui/content-preview-card'
import { EmptyState } from '../../../shared/ui/empty-state'
import { TagList } from '../../../shared/ui/tag-list'
import styles from './search-results.module.css'

type SearchResultsProps = {
  query: string
  results: ContentSearchResult[]
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled search result content type: ${value}`)
}

const getSearchResultTypeLabel = (
  contentType: ContentSearchResult['contentType'],
): string => {
  switch (contentType) {
    case 'article':
      return 'Wiki article'

    case 'news':
      return 'News'

    default:
      return assertNever(contentType)
  }
}

export const SearchResults = ({ query, results }: SearchResultsProps) => {
  if (!query) {
    return (
      <EmptyState
        title="Start with a search query"
        description="Введите запрос, чтобы найти материалы среди wiki-статей и news-сущностей."
      />
    )
  }

  if (results.length === 0) {
    return (
      <EmptyState
        title="No results found"
        description={`По запросу "${query}" ничего не найдено.`}
      />
    )
  }

  return (
    <section className={styles.results} aria-label="Search results">
      <p className={styles.summary}>
        Found {results.length} result{results.length === 1 ? '' : 's'} for "
        {query}"
      </p>

      <div className={styles.grid}>
        {results.map((result) => {
          const href = getContentHref({
            contentType: result.contentType,
            slug: result.slug,
          })

          if (!href) {
            return null
          }

          return (
            <ContentPreviewCard
              key={`${result.contentType}-${result.id}`}
              description={result.description}
              footer={
                <TagList
                  getTagHref={(tag) => routes.wikiTag(tag.slug)}
                  placement="card"
                  tags={result.tags}
                />
              }
              header={
                <>
                  <span>{getSearchResultTypeLabel(result.contentType)}</span>

                  <time dateTime={result.publishedAt}>
                    {formatDisplayDate(result.publishedAt)}
                  </time>
                </>
              }
              href={href}
              title={result.title}
            />
          )
        })}
      </div>
    </section>
  )
}
