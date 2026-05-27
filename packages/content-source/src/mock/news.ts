import type { NewsItem } from '@thematic-content-platform/content-domain'

import { alienUniverseCategory, xenomorphsCategory } from './categories'
import { tags } from './tags'

export const mockNewsItems: NewsItem[] = [
  {
    id: 'news-alien-romulus-archive',
    slug: 'alien-romulus-archive',
    title: 'Alien universe archive expands with new research notes',
    description:
      'Демо-новость о расширении архива материалов по вселенной Alien внутри content-платформы.',
    body: [
      'Thematic Content Platform использует news-сущность, чтобы показать поддержку второго типа контента.',
      'В отличие от wiki-статей, новости можно использовать для коротких обновлений, анонсов и редакционных материалов.',
      'На уровне архитектуры это проверяет, что content-domain, content-source, routing и related content не завязаны только на Article.',
    ].join('\n\n'),
    status: 'published',
    publishedAt: '2026-05-27T09:00:00.000Z',
    category: alienUniverseCategory,
    tags: [tags.alien],
    related: [
      {
        id: 'relation-news-romulus-to-weyland-yutani',
        targetId: 'article-weyland-yutani',
        targetSlug: 'weyland-yutani',
        targetType: 'article',
        title: 'Weyland-Yutani',
        description: 'Корпоративный контекст мира Alien.',
      },
    ],
  },
  {
    id: 'news-xenomorph-field-report',
    slug: 'xenomorph-field-report',
    title: 'Xenomorph field report added to demo content source',
    description:
      'Демо-новость о добавлении полевого отчета по ксеноморфам в mock content source.',
    body: [
      'News-сущность помогает проверить сценарий, где related content может вести не только между статьями, но и между разными типами материалов.',
      'Пока данные остаются mock/local, но публичный API content-source проектируется так, чтобы позже его можно было заменить CMS adapter.',
      'Этот материал связан со статьями о жизненном цикле ксеноморфа и facehugger.',
    ].join('\n\n'),
    status: 'published',
    publishedAt: '2026-05-27T09:15:00.000Z',
    category: xenomorphsCategory,
    tags: [tags.alien, tags.xenomorph, tags.facehugger],
    related: [
      {
        id: 'relation-news-field-report-to-xenomorph-life-cycle',
        targetId: 'article-xenomorph-life-cycle',
        targetSlug: 'xenomorph-life-cycle',
        targetType: 'article',
        title: 'Жизненный цикл ксеноморфа',
        description: 'Базовая wiki-статья о стадиях развития ксеноморфа.',
      },
      {
        id: 'relation-news-field-report-to-facehugger',
        targetId: 'article-facehugger',
        targetSlug: 'facehugger',
        targetType: 'article',
        title: 'Facehugger',
        description: 'Материал о промежуточной стадии жизненного цикла.',
      },
    ],
  },
  {
    id: 'news-demo-platform-notes',
    slug: 'demo-platform-notes',
    title: 'Platform notes: second content type enabled',
    description:
      'Демо-новость о том, что платформа получила второй тип контента после wiki-статей.',
    body: [
      'Добавление News проверяет расширяемость первого вертикального среза.',
      'Если Article и News используют похожие паттерны, позже можно будет аккуратно выделить общие абстракции.',
      'Важно не создавать универсальный ContentEngine заранее, пока повторяемость не стала очевидной.',
    ].join('\n\n'),
    status: 'published',
    publishedAt: '2026-05-27T09:30:00.000Z',
    category: alienUniverseCategory,
    tags: [tags.alien],
    related: [
      {
        id: 'relation-news-platform-notes-to-news-field-report',
        targetId: 'news-xenomorph-field-report',
        targetSlug: 'xenomorph-field-report',
        targetType: 'news',
        title: 'Xenomorph field report added to demo content source',
        description: 'Пример related content между news-материалами.',
      },
    ],
  },
]
