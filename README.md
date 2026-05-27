# Thematic Content Platform

**Thematic Content Platform** — портфолио-прототип wiki/content-платформы для тематических энциклопедических сайтов.

Проект создается как greenfield-модернизация старого личного проекта **Alien Wiki**. Вместо прямой миграции старой кодовой базы новая версия переосмысляет исходную идею на современном frontend-стеке: **Nx**, **Next.js App Router**, **React**, **TypeScript**, typed content model, SEO-oriented rendering и подключаемый content source layer.

Вселенная Alien используется как демонстрационная предметная область, на которой можно показать работу платформы со структурированным контентом: статьями, новостями, персонажами, локациями, фильмами, книгами, категориями, тегами и связанными материалами.

## Статус

Проект находится на раннем этапе разработки.

Это не production-ready CMS/SaaS-платформа, а **portfolio-grade prototype**, цель которого — показать архитектурный подход к разработке content-driven frontend-приложения.

## Текущий вертикальный срез

На текущем этапе реализован первый минимальный вертикальный срез content-платформы:

- typed content model;
- mock content source;
- sample Alien demo content;
- список статей `/wiki`;
- страница статьи `/wiki/[slug]`;
- related content block;
- SEO metadata для article pages;
- базовая навигация и layout.

Этот срез показывает основной поток данных проекта:

    content-domain
      → content-source
        → Next.js server page
          → UI blocks
            → SEO metadata

## Цели проекта

- показать современную архитектуру content-driven приложения;
- заменить legacy custom SSR-подход на Next.js App Router;
- использовать Nx как основу для монорепозитория;
- выделить typed domain model для контента;
- отделить domain-модель от UI и источников данных;
- начать с mock/local content source;
- позже добавить CMS adapter;
- не использовать Redux-Saga без реальной необходимости;
- собрать маленький, но законченный вертикальный срез.

## Legacy origin

Старый Alien Wiki был реализован как TypeScript monorepo с custom React SSR, Express backend, MongoDB, Strapi CMS, Redux-Saga, Docker Compose и CI/CD.

Новая версия не переносит старый код один к одному. Старый проект используется как источник:

- идеи;
- доменной области;
- набора контентных сущностей;
- архитектурных решений, которые нужно упростить или заменить.

## Целевой стек

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
- server data layer через Next.js
- React Query/SWR только для клиентских интерактивных сценариев
- без Redux-Saga

Quality:
- ESLint
- Prettier
- TypeScript
- Vitest
```

## Roadmap

### Milestone 0: Repository foundation

- [x] Initialize Nx monorepo with Next.js app
- [x] Add base README and modernization story
- [x] Add docs/architecture.md
- [x] Add docs/ai/project-map.md
- [x] Add docs/modernization-notes.md

### Milestone 1: Content domain

- [x] Add content-domain package
- [x] Add mock content-source package
- [x] Add sample Alien demo content
- [x] Add testable article query layer
- [x] Cover article queries with tests

### Milestone 2: First vertical slice

- [x] Add first Article list page
- [x] Add Article details page by slug
- [x] Add related content block
- [x] Add SEO metadata for article pages
- [x] Add base navigation and layout

### Milestone 3: Article slice stabilization

- [x] Extract ArticleCard component
- [x] Extract ArticleDetails component
- [x] Extract article body parsing helper
- [x] Extract Breadcrumbs component
- [x] Add route helpers
- [x] Add global not found page
- [x] Add EmptyState component

### Milestone 4: Content navigation

- [x] Add category pages
- [x] Add tag pages
- [x] Add article filtering by category
- [x] Add article filtering by tag
- [x] Add empty states for filtered content
- [x] Add metadata for category and tag pages

### Milestone 5: Second content type

- [x] Add News domain model
- [x] Add mock news content source
- [x] Add news query API
- [x] Cover news queries with tests
- [x] Add news list page
- [x] Add news details page
- [x] Add related content support for news
- [x] Extend route helpers for news routes

### Milestone 6: Platform features

- [ ] Add sitemap generation
- [ ] Add RSS feed
- [ ] Add search prototype
- [ ] Add CMS adapter spike
- [ ] Add deployment notes
- [ ] Add CI checks