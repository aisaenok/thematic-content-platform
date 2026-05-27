# Modernization notes

Этот документ фиксирует контекст модернизации проекта **Thematic Content Platform**.

## Исходная точка

Проект создается как greenfield-модернизация старого личного проекта **Alien Wiki**.

Старая версия была реализована как full-stack TypeScript monorepo:

- custom React SSR;
- React Router;
- Redux-Saga;
- Node.js / Express backend;
- MongoDB;
- Strapi CMS;
- Docker Compose;
- CI/CD для сборки сервисов.

Новая версия не является прямой миграцией старого кода один к одному. Старый проект используется как источник идеи, доменной области, типов контента и архитектурных решений, которые нужно упростить или заменить.

## Цель новой версии

Новая версия рассматривается шире, чем просто сайт по вселенной Alien.

Цель проекта — портфолио-прототип wiki/content-платформы для тематических энциклопедических сайтов.

Вселенная Alien используется как demo domain, на котором удобно показать:

- статьи;
- категории;
- теги;
- связанные материалы;
- SEO-страницы;
- typed content model;
- server-rendered pages;
- возможность будущего подключения CMS.

## Почему не поднимается старая кодовая база

Старая кодовая база давно не запускалась локально, домен проекта больше не используется, а стек частично устарел.

Поднимать старый проект перед началом модернизации нецелесообразно по нескольким причинам:

- высокая стоимость реанимации старых зависимостей;
- устаревший custom SSR;
- устаревшая CMS-интеграция;
- наличие Redux-Saga без реальной необходимости для текущего content-driven сценария;
- ограниченное время;
- портфолио-цель проекта важнее прямой миграции legacy-кода.

Поэтому выбран подход greenfield modernization.

## Ключевые решения

### Nx + Next.js App Router

Custom SSR заменяется на Next.js App Router.

Причины:

- встроенная поддержка server rendering;
- динамические маршруты;
- generateStaticParams для content pages;
- generateMetadata для SEO;
- понятная структура приложения;
- меньше кастомной инфраструктуры.

### Internal packages вместо standalone Node ESM packages

Внутренние packages используются как source code dependencies для Next.js-приложения.

Текущая модель:

    apps/web → packages/content-source → packages/content-domain

Пакеты не рассматриваются как standalone Node ESM-библиотеки, которые сначала собираются в dist и потом импортируются приложением.

Для внутренних пакетов используется:

- TypeScript moduleResolution: "bundler";
- относительные импорты без .js-расширений;
- Next.js transpilePackages для workspace-пакетов.

Это решение принято после конфликта между Node ESM-style импортами с .js и тем, что Turbopack читает TypeScript-исходники напрямую.

### Без Redux-Saga

Redux-Saga не переносится в новую версию.

Причины:

- проект content-driven;
- основной сценарий — чтение и отображение контента;
- сложной оркестрации, race/cancel-flow и фоновых процессов пока нет;
- Next.js server layer лучше подходит для загрузки данных;
- клиентский state пока минимален.

Если позже появятся реальные client-side сценарии, можно отдельно рассмотреть:

- React Query / SWR для client-side server state;
- Zustand для shared UI-state;
- Context для небольших локальных сценариев.

### Без backend на первом этапе

Отдельный backend не входит в первый этап.

Причины:

- Next.js server layer достаточно для первого вертикального среза;
- backend усложнит проект раньше времени;
- цель первого этапа — показать frontend architecture и content platform design.

Backend можно рассмотреть позже, если появятся:

- сложный search;
- отдельный public API;
- авторизация;
- админка;
- интеграции;
- фоновые процессы.

### Без CMS на первом этапе

На первом этапе используется mock/local content source.

CMS должна подключаться позже через adapter layer, чтобы domain model и UI не зависели напрямую от конкретной CMS.

Потенциальные варианты:

- Strapi;
- Payload;
- Directus;
- Sanity;
- file-based content source.

### Testable content source

`content-source` реализован так, чтобы query-логика не была жестко зашита в demo data.

Фабрика `createArticleQueries(articles)` позволяет отдельно тестировать правила выборки статей, фильтрацию draft/published материалов и получение related content. Это упрощает будущий переход от mock data к CMS/API adapter.

## Первый вертикальный срез

Первый вертикальный срез уже покрывает базовую цепочку:

    typed content model
      → mock content source
        → /wiki list page
          → /wiki/[slug] details page
            → related content
              → SEO metadata
                → base layout/navigation

Реализованные элементы:

- content-domain package;
- content-source package;
- sample Alien demo content;
- список статей /wiki;
- страница статьи /wiki/[slug];
- related content block;
- generateMetadata для article pages;
- базовая навигация и layout.

## Что важно сохранить дальше

Проект должен развиваться маленькими вертикальными срезами.

Не нужно сразу добавлять:

- CMS;
- backend;
- admin panel;
- auth;
- roles;
- search engine;
- Storybook;
- Docker;
- CI/CD;
- Redux;
- Redux-Saga.

Следующий правильный шаг — улучшать уже существующий content slice, а не начинать новую большую подсистему.

## Возможные следующие направления

### Content model

- добавить News;
- добавить Character;
- добавить Location;
- добавить MediaAsset;
- аккуратно выделить общий ContentItem только после появления повторяемости.

### UI

- улучшить ArticleCard;
- добавить EmptyState;
- добавить Breadcrumbs-компонент;
- добавить базовую страницу Not Found;
- привести стили к единому визуальному языку.

### Routing

- централизовать content route mapping;
- расширить getContentRelationHref при появлении новых content types;
- сохранять exhaustiveness check через never.

### SEO

- добавить Open Graph images позже;
- добавить canonical URL позже;
- добавить sitemap позже;
- добавить RSS позже.

### Data source

- сохранить mock source как baseline;
- позже добавить CMS adapter без изменения UI;
- не протекать CMS-типами в content-domain.