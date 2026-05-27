import type { NewsItem } from '@thematic-content-platform/content-domain'

export const getNewsBodyParagraphs = (newsItem: NewsItem): string[] => {
  return newsItem.body
    .split('\n\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}
