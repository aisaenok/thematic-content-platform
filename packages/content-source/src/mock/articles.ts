import type { Article } from '@thematic-content-platform/content-domain'
import { alienUniverseCategory, xenomorphsCategory } from './categories.js'
import { tags } from './tags.js'

export const mockArticles: Article[] = [
  {
    id: 'article-xenomorph-life-cycle',
    slug: 'xenomorph-life-cycle',
    title: 'Жизненный цикл ксеноморфа',
    description:
      'Краткий обзор стадий развития ксеноморфа: от яйца и лицехвата до взрослой особи.',
    body: [
      'Ксеноморф — одна из ключевых биологических угроз во вселенной Alien.',
      'Его жизненный цикл строится вокруг нескольких стадий: яйцо, лицехват, эмбриональная стадия внутри носителя и взрослая особь.',
      'Для wiki/content-платформы эта статья демонстрирует базовую article-страницу, теги, категорию и связанные материалы.',
    ].join('\n\n'),
    status: 'published',
    publishedAt: '2026-05-26T10:00:00.000Z',
    category: xenomorphsCategory,
    tags: [tags.alien, tags.xenomorph, tags.facehugger],
    related: [
      {
        id: 'relation-xenomorph-to-facehugger',
        targetId: 'article-facehugger',
        targetSlug: 'facehugger',
        targetType: 'article',
        title: 'Facehugger',
        description: 'Стадия заражения носителя в жизненном цикле ксеноморфа.',
      },
      {
        id: 'relation-xenomorph-to-weyland-yutani',
        targetId: 'article-weyland-yutani',
        targetSlug: 'weyland-yutani',
        targetType: 'article',
        title: 'Weyland-Yutani',
        description: 'Корпорация, заинтересованная в изучении и использовании ксеноморфов.',
      },
    ],
  },
  {
    id: 'article-facehugger',
    slug: 'facehugger',
    title: 'Facehugger',
    description:
      'Лицехват как промежуточная стадия жизненного цикла ксеноморфа и механизм заражения носителя.',
    body: [
      'Facehugger — стадия жизненного цикла ксеноморфа, предназначенная для заражения носителя.',
      'С точки зрения content model эта статья показывает, как отдельная сущность может быть связана с основной статьей через related content.',
      'Такие связи важны для энциклопедических сайтов: пользователь может переходить между связанными темами без ручного поиска.',
    ].join('\n\n'),
    status: 'published',
    publishedAt: '2026-05-26T10:10:00.000Z',
    category: xenomorphsCategory,
    tags: [tags.alien, tags.xenomorph, tags.facehugger],
    related: [
      {
        id: 'relation-facehugger-to-xenomorph',
        targetId: 'article-xenomorph-life-cycle',
        targetSlug: 'xenomorph-life-cycle',
        targetType: 'article',
        title: 'Жизненный цикл ксеноморфа',
        description: 'Общая статья о стадиях развития ксеноморфа.',
      },
    ],
  },
  {
    id: 'article-weyland-yutani',
    slug: 'weyland-yutani',
    title: 'Weyland-Yutani',
    description:
      'Корпорация Weyland-Yutani как повторяющийся элемент мира Alien и источник конфликтов вокруг биологических угроз.',
    body: [
      'Weyland-Yutani — одна из ключевых организаций во вселенной Alien.',
      'В рамках демо-домена эта статья показывает, что платформа может описывать не только существ, но и организации, технологии, места и события.',
      'В будущем такие материалы можно выделить в отдельные content types, но на первом этапе достаточно универсальной article-модели.',
    ].join('\n\n'),
    status: 'published',
    publishedAt: '2026-05-26T10:20:00.000Z',
    category: alienUniverseCategory,
    tags: [tags.alien, tags.weylandYutani],
    related: [
      {
        id: 'relation-weyland-yutani-to-xenomorph',
        targetId: 'article-xenomorph-life-cycle',
        targetSlug: 'xenomorph-life-cycle',
        targetType: 'article',
        title: 'Жизненный цикл ксеноморфа',
        description: 'Биологическая угроза, представляющая интерес для корпорации.',
      },
    ],
  },
  {
    id: 'article-uscss-nostromo',
    slug: 'uscss-nostromo',
    title: 'USCSS Nostromo',
    description:
      'Космический буксир Nostromo как пример технической и локационной сущности внутри тематической wiki.',
    body: [
      'USCSS Nostromo — один из узнаваемых объектов в мире Alien.',
      'На уровне платформы такая статья демонстрирует возможность описывать корабли, локации и технические объекты.',
      'Позже подобные материалы можно вынести в отдельные типы контента, например Vehicle или Location.',
    ].join('\n\n'),
    status: 'published',
    publishedAt: '2026-05-26T10:30:00.000Z',
    category: alienUniverseCategory,
    tags: [tags.alien, tags.nostromo],
    related: [
      {
        id: 'relation-nostromo-to-weyland-yutani',
        targetId: 'article-weyland-yutani',
        targetSlug: 'weyland-yutani',
        targetType: 'article',
        title: 'Weyland-Yutani',
        description: 'Корпоративный контекст событий вокруг Nostromo.',
      },
    ],
  },
]