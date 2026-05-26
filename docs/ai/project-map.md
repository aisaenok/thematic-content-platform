# Карта проекта

Этот документ описывает целевую структуру и архитектурные ориентиры проекта **Thematic Content Platform**.

## Назначение проекта

**Thematic Content Platform** — портфолио-прототип wiki/content-платформы для тематических энциклопедических сайтов.

Проект должен демонстрировать:

- современную frontend-архитектуру;
- работу с content-driven приложением;
- typed domain model;
- SSR/SEO-подход;
- модульную структуру;
- готовность к подключению CMS;
- осознанное упрощение state management;
- умение переосмыслить legacy custom SSR проект на современном стеке.

## Источник идеи

Проект основан на старом личном проекте **Alien Wiki**.

Старый проект был построен как:

- TypeScript monorepo;
- custom SSR React;
- React Router;
- Redux-Saga;
- Node.js/Express backend;
- MongoDB;
- Strapi CMS;
- Docker Compose;
- CI/CD pipeline.

Новая версия не является прямой миграцией старого кода. Это greenfield-модернизация идеи.

## Демо-домен

В качестве демонстрационной предметной области используется вселенная Alien.

Важно: проект не должен быть жестко зашит под Alien. Alien — это demo domain, на котором удобно показать:

- статьи;
- новости;
- персонажей;
- фильмы;
- книги;
- локации;
- технику;
- оружие;
- медиа-сущности;
- категории;
- теги;
- связанные материалы.

Целевая идея шире:

```text
платформа для тематического энциклопедического сайта
```

А не просто:

```text
фанатская wiki по Alien
```

## Целевой стек

На старте предполагается следующий стек:

```text
Monorepo:
- Nx

Frontend:
- Next.js App Router
- React
- TypeScript

Data:
- typed content model
- mock/local content source на первом этапе
- CMS adapter позже

State:
- local state по умолчанию
- server data layer через Next
- React Query/SWR только для клиентских интерактивных сценариев
- Zustand только при появлении реального shared UI-state
- без Redux-Saga

Quality:
- ESLint
- Prettier
- TypeScript strict mode
- tests позже по мере появления стабильной логики
```

## Нецели на первом этапе

На первом этапе не нужно делать:

- полноценную CMS;
- отдельный backend;
- авторизацию;
- админку;
- роли и права;
- сложный search engine;
- Docker;
- CI/CD;
- Storybook;
- полноценный дизайн-системный пакет;
- миграцию старого кода один к одному.

## Предполагаемая структура

Целевая структура может выглядеть так:

```text
thematic-content-platform/
  apps/
    web/
      app/
        page.tsx
        wiki/
          page.tsx
          [slug]/
            page.tsx
        news/
          page.tsx
          [slug]/
            page.tsx
      src/
        app/
        pages/
        widgets/
        features/
        entities/
        shared/

  packages/
    content-domain/
      src/
        article.ts
        category.ts
        content-relation.ts
        media-asset.ts
        index.ts

    content-source/
      src/
        mock/
        cms/
        types.ts
        index.ts

    ui/
      src/
        index.ts

  docs/
    ai/
      README.md
      operating-model.md
      project-map.md
      task-brief-template.md

    architecture.md
    modernization-notes.md
```

Структура может уточняться по мере развития проекта.

## Архитектурные слои

### `apps/web`

Next.js-приложение.

Отвечает за:

- маршрутизацию;
- страницы;
- layouts;
- metadata;
- server rendering;
- подключение content source;
- сборку UI из widgets/entities/shared components.

Не должно содержать низкоуровневую domain-логику, которую можно вынести в пакеты.

### `packages/content-domain`

Пакет с доменной моделью контента.

Отвечает за:

- типы статей;
- типы категорий;
- типы тегов;
- типы медиа;
- типы связей между материалами;
- общие value types: `Slug`, `ContentId`, `DateISOString`.

Не должен зависеть от:

- React;
- Next.js;
- CSS;
- UI-компонентов;
- CMS SDK;
- database clients.

### `packages/content-source`

Пакет с источниками данных.

Отвечает за:

- mock data source;
- будущий CMS adapter;
- функции чтения контента;
- нормализацию данных из внешних источников;
- единый интерфейс доступа к контенту.

На первом этапе основной источник:

```text
mock/local content source
```

Позже можно добавить:

```text
StrapiContentSource
PayloadContentSource
DirectusContentSource
FileSystemContentSource
```

### `packages/ui`

Пакет переиспользуемых UI-компонентов.

На старте может быть минимальным или вообще отсутствовать.

Не нужно преждевременно выносить каждый компонент в `packages/ui`. Лучше выносить только то, что реально переиспользуется между несколькими частями приложения.

## Принятые ограничения

## Правило для внутренних packages

Внутренние `packages/*` используются приложением Next.js как source code dependencies.

Codex не должен переводить их в standalone Node ESM package style без отдельного архитектурного решения.

Правила:

- использовать `moduleResolution: "bundler"` для внутренних пакетов;
- писать относительные импорты без `.js`-расширений;
- не добавлять `.js` в импорты внутри `.ts`-файлов;
- не настраивать пакеты так, будто они обязательно должны собираться и импортироваться только из `dist`;
- если пакет импортируется в `apps/web`, он должен быть добавлен в `transpilePackages` в Next.js config.

Правильно:

```ts
import { tags } from './tags'
```

Неправильно для текущей модели проекта:

```ts
import { tags } from './tags.js'
```

Текущая модель проекта:

```text
apps/web → packages/content-source → packages/content-domain
```

Все эти зависимости остаются внутренними зависимостями монорепозитория.

## Основной поток данных

Целевой поток для content page:

```text
Next route
  → content source
    → content domain types
      → page-level composition
        → UI components
          → SEO metadata
```

Пример:

```text
/wiki/[slug]
  → getArticleBySlug(slug)
    → Article
      → ArticlePage
        → ArticleHeader + ArticleBody + RelatedContent
          → metadata
```

## Первый вертикальный срез

Первый milestone должен быть маленьким.

```text
MVP-1: Content platform shell
```

Состав:

- Nx workspace;
- Next.js app;
- базовый layout;
- главная страница;
- список wiki-статей;
- страница wiki-статьи по slug;
- typed Article model;
- mock content source;
- breadcrumbs;
- related content block;
- metadata для статьи;
- README с описанием проекта.

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

На первом этапе не нужно реализовывать все.

Начать лучше с:

```text
Article
Category
Tag
ContentRelation
```

Потом расширять.

## Принцип расширения

Не нужно сразу делать универсальную абстракцию для всего.

Правильный путь:

```text
1. Сделать Article хорошо.
2. Выделить общее только после появления News/Character/Location.
3. Не создавать абстрактный ContentEngine до появления реальной повторяемости.
```

## State management

По умолчанию:

- server data загружается через Next server layer;
- локальный UI-state хранится в компонентах;
- формы получают отдельное решение, если появятся;
- глобальный клиентский state не добавляется без причины.

Redux-Saga не используется.

Redux Toolkit, Zustand, React Query или SWR можно рассмотреть только под конкретный сценарий.

## Backend

Отдельный backend пока не входит в scope.

Причина:

- проект content-driven;
- Next server layer достаточно для первого этапа;
- отдельный backend усложнит проект раньше времени;
- цель — показать frontend architecture и content platform design.

Backend можно добавить позже, если появится реальная потребность.

## CMS

CMS пока не входит в первый этап.

На старте используется mock/local content source.

CMS должна подключаться через adapter, чтобы приложение не зависело напрямую от конкретной CMS.

## README-позиционирование

Рекомендуемая формулировка:

```text
Thematic Content Platform is a portfolio-grade prototype of a wiki/content platform for building thematic encyclopedia websites.

The project is a greenfield modernization of my old Alien Wiki project. Instead of rebuilding the old codebase directly, this version rethinks the original idea using a modern frontend architecture: Nx monorepo, Next.js App Router, typed content models, SEO-oriented rendering and a pluggable content source layer.

The Alien universe is used as a demo domain to showcase structured content such as articles, news, characters, locations, media entities, categories, tags and related materials.
```

## Что важно для портфолио

Проект должен демонстрировать не количество фич, а качество инженерных решений:

- понятные границы;
- типизированная domain-модель;
- современный Next.js-подход;
- осознанный отказ от лишнего state management;
- архитектура, которую можно объяснить на собеседовании;
- документация;
- поэтапный roadmap;
- история модернизации legacy-идеи.
