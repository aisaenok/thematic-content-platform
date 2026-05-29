export type HomePageCard = {
  title: string
  description: string
}

export const homePageFeatures: HomePageCard[] = [
  {
    title: 'Wiki articles',
    description:
      'Server-rendered страницы статей с typed content model, SEO metadata и блоком связанных материалов.',
  },
  {
    title: 'News content type',
    description:
      'Второй content slice, который показывает, что платформа не ограничивается только wiki-сценарием.',
  },
  {
    title: 'Category and tag navigation',
    description:
      'Фильтруемые category и tag routes, построенные поверх той же content model.',
  },
  {
    title: 'Search prototype',
    description:
      'Server-side поиск по wiki-статьям и news-материалам с общим content preview UI.',
  },
  {
    title: 'Sitemap and RSS',
    description:
      'SEO routes и machine-readable feeds, работающие через публичный content source layer.',
  },
  {
    title: 'CI, deployment и smoke tests',
    description:
      'GitHub Actions checks, Vercel deployment и Playwright smoke coverage для основных публичных routes.',
  },
]

export const homePageArchitectureHighlights: HomePageCard[] = [
  {
    title: 'content-domain',
    description: 'Typed domain model для статей, news, тегов, категорий и связей.',
  },
  {
    title: 'content-source',
    description: 'Query API поверх текущего mock/local content с testable factories.',
  },
  {
    title: 'apps/web',
    description: 'Next.js App Router pages, SEO routes, search, RSS и sitemap.',
  },
  {
    title: 'shared/ui',
    description: 'UI Kit layer с tokens, reusable primitives и page-level layout patterns.',
  },
  {
    title: 'Page layout',
    description: 'Compound layout pattern для list, search, category, tag и details pages.',
  },
]
