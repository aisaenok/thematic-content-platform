import type { NewsItem } from '@thematic-content-platform/content-domain'

import { getContentBodyParagraphs } from '../../../shared/lib/content'

export const getNewsBodyParagraphs = (newsItem: NewsItem): string[] => {
  return getContentBodyParagraphs(newsItem.body)
}
