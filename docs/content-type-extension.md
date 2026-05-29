# Добавление нового content type

## Цель документа

Этот документ нужен как проверка платформенности текущей архитектуры. Главный вопрос здесь простой: насколько легко добавить новый тип контента без переписывания уже работающих слоев.

В качестве примеров будущих content types можно рассматривать:

- Character;
- Film;
- Book;
- Location;
- Timeline event.

Проект остается `frontend-focused content platform prototype`, поэтому задача документа не в том, чтобы описать production-ready CMS, а в том, чтобы честно показать текущую extensibility-модель и точки будущего platform work.

## Текущая модель

Сейчас в проекте есть два content types:

- Article;
- News.

Текущая архитектурная схема выглядит так:

```text
apps/web
  → contentApi
    → ContentSource contract
      → mockContentSource сейчас
      → CMS/API adapter позже
```

Важно, что web-приложение должно зависеть от `contentApi`, а не от mock-реализации напрямую. Это уже создает `platform-oriented architecture`: UI и routing слой знают про публичный content API, но не привязаны к конкретному способу получения данных.

## Какие слои затрагивает новый content type

### 1. Domain layer

`packages/content-domain`

Для нового content type обычно нужно добавить:

- основной domain type;
- summary type, если нужен list/search preview;
- discriminator или другое явное обозначение типа;
- поддержку relation types, если новый контент участвует в related content.

Именно здесь должен появляться typed contract сущности до того, как она дойдет до web-слоя.

### 2. Content source layer

`packages/content-source`

Для нового content type обычно нужно добавить:

- mock data;
- query factory;
- новые методы в `ContentSource`;
- реализацию этих методов в `mockContentSource`;
- доступ к ним через `contentApi`;
- unit tests для query logic;
- contract smoke test, если появляется новый важный публичный query surface.

Этот слой уже выделен как boundary доступа к контенту, поэтому добавление нового типа не должно требовать смешивания data access logic с route files.

### 3. Web routing layer

`apps/web/src/app`

Если новый content type должен быть публично доступен, обычно нужно добавить:

- list route, если нужен список;
- details route, если нужен detail page;
- `generateStaticParams`;
- `generateMetadata`;
- `notFound()` handling;
- route helpers.

Не каждый тип обязан иметь полный набор route patterns, но если он является полноценной публичной сущностью, эти точки расширения почти наверняка появятся.

### 4. Web content representation

Сейчас часть web-level знаний о content types размазана по разным местам приложения. Это включает:

- label content type для search result;
- href resolving;
- sitemap participation;
- RSS participation;
- related content rendering;
- preview card mapping.

Это еще не критическая проблема для двух типов контента, но при добавлении третьего или четвертого типа такая схема станет заметно более ручной. Поэтому это хороший кандидат на будущий `web content type registry`.

### 5. UI layer

У проекта уже есть набор переиспользуемых UI patterns:

- `ContentPreviewCard`;
- `ContentDetailsLayout`;
- `TagList`;
- `Breadcrumbs`;
- `Page`;
- `EmptyState`;
- `RelatedContentBlock`.

Новый content type должен сначала попробовать переиспользовать эти shared UI patterns, а не создавать новый UI с нуля. Это особенно важно для list/details layouts, потому что именно здесь платформа выигрывает от повторяемой структуры и устойчивого visual language.

### 6. Search

Для нового content type нужно проверить и, при необходимости, добавить:

- участие в search index/query;
- search result shape;
- label;
- href resolving;
- позже, возможно, ranking и highlighting rules.

Сейчас search уже существует как platform capability, но он пока prototype, поэтому добавление нового content type потребует явного ручного включения в search surface.

### 7. SEO / Sitemap / RSS

Для нового content type нужно проверить:

- попадает ли он в sitemap;
- нужен ли он в RSS;
- есть ли canonical metadata;
- есть ли `generateMetadata`;
- нужен ли Open Graph preview на уровне detail route.

Даже если новый контент не участвует в RSS, решение об этом должно быть явным, а не случайным следствием отсутствия реализации.

### 8. Tests

Для нового content type обычно нужно добавить:

- `content-source` query tests;
- route smoke coverage, если это публичный route;
- e2e route check, если route является основным;
- Storybook story, если появляется новый reusable UI component.

Это уже не только domain work, а проверка того, что новая сущность действительно встроена в платформу end-to-end.

## Текущие сильные стороны

На текущем этапе у архитектуры уже есть несколько сильных сторон:

- domain слой отделен от web-слоя;
- `contentApi` скрывает конкретную реализацию источника данных;
- shared UI patterns уже существуют и используются повторно;
- `Page` layout переиспользуется на list, search и details pages;
- search, sitemap и RSS уже существуют как platform capabilities;
- Storybook показывает UI Kit слой отдельно от route context;
- CI, e2e и deployment уже настроены.

Это означает, что добавление нового типа контента уже не начинается с хаотичного копирования route files. Базовая платформа для расширения есть.

## Текущие platform gaps

Следующие пункты лучше рассматривать не как недостатки проекта, а как честный список `future platform work`:

- добавление нового content type пока потребует ручных правок в нескольких местах;
- нет `web content type registry`;
- search пока остается prototype;
- `ContentSource` пока sync;
- реальный CMS/API adapter почти наверняка потребует отдельный async migration step;
- нет draft/published workflow;
- нет editorial/admin части;
- нет preview mode;
- нет content validation pipeline;
- нет i18n/localization content model.

Это ожидаемо для `frontend-focused content platform prototype`: архитектура уже выделяет важные границы, но часть cross-cutting platform behaviors еще не централизована.

## Следующий рекомендуемый шаг

Следующий логичный кодовый шаг для усиления платформенности:

```text
Web content type registry
```

Такой registry должен централизовать web-level metadata по content types:

- label;
- route builder;
- list route;
- search participation;
- sitemap participation;
- RSS participation.

Важно: такой registry должен оставаться web-level слоем. Он не должен попадать в `content-domain`, потому что route builders, labels, sitemap/RSS participation и preview mapping относятся к представлению контента в web-приложении, а не к чистой domain model.

Пример будущей идеи:

```text
article:
  label: 'Wiki article'
  detailHref: routes.wikiArticle
  listHref: routes.wiki
  searchable: true
  sitemap: true
  rss: false

news:
  label: 'News'
  detailHref: routes.newsItem
  listHref: routes.news
  searchable: true
  sitemap: true
  rss: true
```

Это только описание следующего шага. В рамках текущей задачи registry не реализуется.
