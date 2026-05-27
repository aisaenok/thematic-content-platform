# Архитектура

Этот документ описывает целевую архитектуру проекта **Thematic Content Platform**.

## Назначение

**Thematic Content Platform** — портфолио-прототип wiki/content-платформы для тематических энциклопедических сайтов.

Проект должен показать не количество фич, а качество инженерных решений:

- понятную domain-модель;
- разделение UI, domain и data source;
- современный SSR/SEO-подход;
- возможность подключить CMS позже;
- отказ от лишней клиентской сложности;
- контролируемую monorepo-структуру.

Проект создается как greenfield-модернизация старого личного проекта **Alien Wiki**. Старая версия используется как источник идеи, доменной области и набора контентных сущностей, но новая версия не является прямой миграцией старого кода один к один.

## Базовая архитектурная идея

```text
Next.js route
  → content source
    → content domain model
      → page composition
        → UI blocks
          → SEO metadata
```

Пример для статьи:

```text
/wiki/[slug]
  → getArticleBySlug(slug)
    → Article
      → ArticlePage
        → ArticleHeader + ArticleBody + RelatedContent
          → generateMetadata()
```

## Целевые слои

### `apps/web`

Next.js-приложение.

Отвечает за:

- маршруты;
- layouts;
- pages;
- metadata;
- server rendering;
- composition UI-блоков;
- подключение content source.

Не должно содержать низкоуровневую domain-логику, которую можно вынести в packages.

### `packages/content-domain`

Пакет с доменной моделью контента.

Отвечает за:

- типы статей;
- типы категорий;
- типы тегов;
- типы связей между материалами;
- value types: `Slug`, `ContentId`, `DateISOString`.

Не должен зависеть от:

- React;
- Next.js;
- CSS;
- UI-компонентов;
- CMS SDK;
- database clients.

Правильное направление зависимости:

```text
apps/web → packages/content-source → packages/content-domain
```

Неправильное направление зависимости:

```text
packages/content-domain → apps/web
packages/content-domain → React components
packages/content-domain → Next.js types
```

### `packages/content-source`

Пакет с источниками данных.

На первом этапе содержит mock/local content source.

Позже может получить CMS adapter:

```text
MockContentSource
StrapiContentSource
PayloadContentSource
DirectusContentSource
FileSystemContentSource
```

Задача слоя — скрыть конкретный источник данных от приложения.

Приложение не должно знать, откуда пришел контент: из mock-данных, CMS, файловой системы или внешнего API.

`content-source` разделяет:

- набор данных;
- query-логику;
- публичный API источника контента.

Базовая query-логика создается через фабрику:

    createArticleQueries(articles)

Это позволяет тестировать поведение `getArticles`, `getArticleBySlug`, `getArticleById` и `getRelatedArticles` на изолированном test dataset, не завязываясь на demo-контент.

Текущий mock source использует ту же фабрику поверх `mockArticles`.

Такой подход нужен, чтобы позже можно было добавить CMS/API adapter, не переписывая UI и не смешивая данные, query-логику и транспорт.

### `packages/ui`

Пакет для переиспользуемых UI-компонентов.

На старте может быть минимальным или отсутствовать. Не нужно преждевременно выносить каждый компонент в `packages/ui`.

Выносить в `packages/ui` стоит только то, что реально переиспользуется между несколькими частями приложения.

## Модель использования внутренних пакетов

На текущем этапе внутренние `packages/*` используются как source code dependencies для Next.js-приложения.

Это означает:

```text
apps/web
  → imports TypeScript source from packages/*
  → Next.js/Turbopack transpiles these packages during app build
```

Пакеты `content-domain` и `content-source` не рассматриваются как standalone Node ESM-пакеты, которые сначала собираются в `dist`, а затем импортируются приложением как готовые npm-пакеты.

Поэтому для внутренних пакетов используется модель:

```text
TypeScript moduleResolution: "bundler"
extensionless relative imports
Next.js transpilePackages
```

Пример корректного относительного импорта:

```ts
import { mockArticles } from './mock/articles'
```

Не используем Node ESM-style импорт с `.js`-расширением:

```ts
import { mockArticles } from './mock/articles.js'
```

Причина: Next.js читает workspace-пакеты как TypeScript-исходники. Если внутри исходного `.ts`-файла указан путь `./articles.js`, Turbopack пытается найти физический файл `articles.js` рядом с `articles.ts`, что приводит к ошибке сборки.

Если в будущем какой-то пакет потребуется публиковать или использовать как standalone Node ESM package, для него нужно будет отдельно пересмотреть `tsconfig`, формат сборки, exports и правила импортов.

## Первый вертикальный срез

Первый законченный сценарий:

```text
Пользователь открывает список статей
  → видит список ArticleCard
  → переходит на /wiki/[slug]
  → видит статью
  → видит связанные материалы
  → страница имеет SEO metadata
```

Этот сценарий важнее, чем попытка сразу сделать всю платформу.

На первом этапе достаточно реализовать:

- список статей;
- страницу статьи по slug;
- mock content source;
- related content block;
- базовую навигацию;
- SEO metadata.

## State management

По умолчанию:

- server data загружается через Next.js server layer;
- локальный UI-state остается внутри компонентов;
- глобальный state manager не добавляется без необходимости.

Redux-Saga не используется, потому что на текущем этапе нет:

- сложных бизнес-процессов;
- race/cancel-flow;
- фоновой оркестрации;
- сложных пользовательских сценариев;
- необходимости в централизованной обработке side effects.

Для content-driven приложения основная задача — чтение и отображение данных. Это лучше ложится на server-side data fetching в Next.js.

Если позже появятся клиентские интерактивные сценарии, можно отдельно рассмотреть:

- React Query / SWR для client-side server state;
- Zustand для shared UI-state;
- Context для небольших локальных сценариев.

## Backend

Отдельный backend не входит в первый этап.

Причина:

- проект content-driven;
- Next.js server layer достаточно для первого вертикального среза;
- отдельный backend усложнит архитектуру раньше времени;
- цель проекта — показать frontend architecture и content platform design.

Backend можно рассмотреть позже, если появятся:

- сложный search;
- отдельный public API;
- авторизация;
- админка;
- интеграции;
- фоновые процессы;
- требования к независимому масштабированию API.

## CMS

CMS не входит в первый этап.

На старте используется mock/local content source.

CMS должна подключаться через adapter, чтобы domain-модель и UI не зависели напрямую от конкретной CMS.

Потенциальные варианты CMS:

- Strapi;
- Payload;
- Directus;
- Sanity;
- собственный простой file/content source.

Выбор CMS — отдельное архитектурное решение.

## SEO

Для страниц контента используются статические или динамические metadata.

На первом этапе SEO покрывается через:

- metadata для главной страницы;
- metadata для списка статей;
- `generateMetadata` для страницы статьи;
- человекочитаемые slug;
- title;
- description;
- canonical-friendly route structure.

Целевая структура маршрутов:

```text
/
  Главная страница

/wiki
  Список wiki-статей

/wiki/[slug]
  Страница конкретной статьи

/news
  Список новостей, позже

/news/[slug]
  Страница новости, позже
```

## Контентные сущности

Потенциальные сущности платформы:

```text
ContentItem
Article
News
Category
Tag
Character
Location
Vehicle
Weapon
Film
Book
MediaAsset
ContentRelation
```

На первом этапе не нужно реализовывать все сущности.

Начинаем с:

```text
Article
Category
Tag
ContentRelation
```

Потом расширяем модель по мере появления реальной необходимости.

## Принцип развития

Не строить всю платформу заранее.

Правильный порядок:

```text
1. Article
2. Category / Tag
3. Related content
4. News
5. Дополнительные content types
6. CMS adapter
7. Search
8. Deploy / CI
```

Общие абстракции выделять только после появления повторяемости.

Не нужно создавать универсальный `ContentEngine` до того, как появятся реальные повторяющиеся сценарии между `Article`, `News`, `Character`, `Location` и другими сущностями.

## Нецели первого этапа

На первом этапе не делаем:

- полноценную CMS;
- отдельный backend;
- авторизацию;
- роли и права;
- админку;
- сложный search engine;
- Docker;
- CI/CD;
- Storybook;
- Redux;
- Redux-Saga;
- универсальный content framework.

## Критерий качества

Проект должен быть небольшим, но цельным.

Хороший результат первого этапа:

```text
Есть рабочий вертикальный срез:
typed content model → mock content source → Next page → UI blocks → SEO metadata.
```

Плохой результат первого этапа:

```text
Есть много заготовок под CMS, backend, search и admin panel, но нет законченного пользовательского сценария.
```

Главный принцип:

> Сначала маленький законченный сценарий, потом расширение платформы.
