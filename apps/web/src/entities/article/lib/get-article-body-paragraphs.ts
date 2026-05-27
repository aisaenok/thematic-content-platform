import type { Article } from '@thematic-content-platform/content-domain'

import { getContentBodyParagraphs } from '../../../shared/lib/content'

export const getArticleBodyParagraphs = (article: Article): string[] => {
  return getContentBodyParagraphs(article.body)
}
