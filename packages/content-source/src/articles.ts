import type {
  Article,
  ArticleSummary,
  ContentId,
  Slug,
} from '@thematic-content-platform/content-domain'
import { mockArticles } from './mock/articles'

const toArticleSummary = ({
  id,
  slug,
  title,
  description,
  publishedAt,
  category,
  tags,
}: Article): ArticleSummary => ({
  id,
  slug,
  title,
  description,
  publishedAt,
  category,
  tags,
})

export const createArticleQueries = (articles: Article[]) => {
  const getArticles = (): ArticleSummary[] =>
    articles
      .filter((article) => article.status === 'published')
      .map(toArticleSummary)

  const getArticleById = (id: ContentId): Article | undefined =>
    articles.find((article) => article.id === id && article.status === 'published')

  const getArticleBySlug = (slug: Slug): Article | undefined =>
    articles.find((article) => article.slug === slug && article.status === 'published')

  const getRelatedArticles = (articleId: ContentId): ArticleSummary[] => {
    const article = getArticleById(articleId)

    if (!article) {
      return []
    }

    const relatedArticleIds = new Set(
      article.related
        .filter((relation) => relation.targetType === 'article')
        .map((relation) => relation.targetId),
    )

    return getArticles().filter((relatedArticle) =>
      relatedArticleIds.has(relatedArticle.id),
    )
  }

  return {
    getArticles,
    getArticleById,
    getArticleBySlug,
    getRelatedArticles,
  }
}

export const {
  getArticles,
  getArticleById,
  getArticleBySlug,
  getRelatedArticles,
} = createArticleQueries(mockArticles)