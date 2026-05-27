import type { Article } from '@thematic-content-platform/content-domain'

export const getArticleBodyParagraphs = (article: Article): string[] => {
  return article.body
    .split('\n\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}