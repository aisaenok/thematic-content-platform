# Portfolio case: Thematic Content Platform

## Краткое описание

**Thematic Content Platform** — это `portfolio-grade prototype` wiki/content-платформы для тематических энциклопедических сайтов.

Проект создается как greenfield-модернизация старого личного проекта **Alien Wiki**. Новая версия не является прямой миграцией legacy-кода: это переосмысление исходной идеи на современном frontend-стеке с акцентом на frontend architecture, content-driven pages, SEO, monorepo-организацию и typed data layer.

В качестве demo domain используется вселенная **Alien**. Она дает достаточно богатую предметную область, чтобы показать работу со статьями, новостями, категориями, тегами, связанными материалами и поисковыми маршрутами, не усложняя проект лишней инфраструктурой на раннем этапе.

## Demo

Production demo:

https://thematic-content-platform-web.vercel.app/

## Исходная точка: Alien Wiki

Исходный проект **Alien Wiki** был реализован как full-stack TypeScript monorepo со следующим стеком:

- custom React SSR;
- Express backend;
- MongoDB;
- Strapi CMS;
- Redux-Saga;
- Docker Compose;
- CI/CD.

Со временем этот проект перестал регулярно запускаться и деплоиться, а старый публичный домен больше не используется.

Важно, что новая версия не переносит старую кодовую базу один к одному. Текущий проект использует старую систему как источник:

- идеи и продуктового направления;
- доменной области;
- типов контента;
- архитектурных уроков о том, что стоит упростить или заменить.

## Стратегия модернизации

Для новой версии был выбран подход **greenfield modernization**, а не реанимация старой кодовой базы.

Причины такого выбора:

- высокая стоимость восстановления старых зависимостей и окружения;
- устаревший custom SSR по сравнению с современным стеком Next.js;
- избыточность Redux-Saga для текущего content-driven сценария;
- ограниченное время на реализацию портфолио-проекта;
- цель проекта состоит в демонстрации современного архитектурного подхода, а не в механическом переносе legacy.

## Цели проекта

- заменить custom SSR на Next.js App Router;
- показать content-driven frontend architecture;
- разделить domain model, data source и UI;
- сделать typed content model;
- использовать Nx monorepo;
- показать SEO-oriented pages;
- показать расширяемость через второй content type;
- не вводить backend/CMS раньше времени;
- сохранить возможность будущего CMS/API adapter.

## Технологический стек

- Nx;
- Next.js App Router;
- React;
- TypeScript;
- pnpm;
- CSS Modules;
- Vitest для тестов `content-source`;
- Playwright для smoke e2e;
- Vercel;
- GitHub Actions CI;
- Makefile.

## Архитектура

Высокоуровневая архитектура проекта выглядит так:

```text
content-domain
  → domain types: Article, NewsItem, Category, Tag, ContentRelation

content-source
  → query API поверх текущего mock/local content
  → article/news/category/tag/search queries
  → testable query factories

apps/web
  → Next.js routes
  → server-rendered content pages
  → SEO metadata
  → sitemap/RSS/search

shared/ui
  → reusable visual layouts and UI primitives

entities/article и entities/news
  → domain data → shared UI composition
```

Слои `shared/ui` и `entities/*` находятся внутри `apps/web/src` и отвечают за UI-композицию поверх доменных данных, а `packages/content-domain` и `packages/content-source` остаются независимыми от Next.js-страниц.

## Основные маршруты

В текущем вертикальном срезе реализованы следующие публичные маршруты:

- `/`
- `/wiki`
- `/wiki/[slug]`
- `/wiki/categories/[slug]`
- `/wiki/tags/[slug]`
- `/news`
- `/news/[slug]`
- `/search?q=xenomorph`
- `/sitemap.xml`
- `/rss.xml`

## Ключевые инженерные решения

Ниже перечислены ключевые решения и связанные с ними trade-offs.

### Next.js App Router вместо custom SSR

`Next.js App Router` выбран вместо собственного SSR-слоя, потому что он позволяет убрать лишнюю кастомную инфраструктуру и использовать встроенные механизмы платформы:

- server rendering и metadata API из коробки;
- `generateStaticParams` для content pages;
- `generateMetadata` для SEO;
- route handlers для RSS;
- встроенную поддержку sitemap-маршрутов.

Это делает проект проще в сопровождении и лучше соответствует цели показать современный frontend-подход.

### Internal packages как source dependencies

Внутренние пакеты используются как workspace source dependencies, а не как отдельно публикуемые Node ESM-пакеты.

Это означает:

- `packages/content-domain` и `packages/content-source` импортируются в приложение как исходники;
- Next.js транспилирует эти пакеты во время сборки приложения;
- используется `moduleResolution: bundler`;
- внутри TypeScript source не используются Node ESM-style импорты с `.js`-расширением.

Такой подход упрощает разработку внутри monorepo и соответствует тому, как Next.js/Turbopack работает с workspace-пакетами.

### Отказ от Redux-Saga

Redux-Saga не переносится в новую версию, потому что текущий проект решает в первую очередь content-driven задачу:

- основной поток состоит из чтения и отображения данных;
- нет сложной orchestration-логики;
- нет race/cancel-flow;
- нет выраженной необходимости в централизованной обработке side effects.

На текущем этапе server layer Next.js закрывает потребности проекта лучше и проще.

### Без backend/CMS на первом этапе

На первом этапе проект сознательно обходится без отдельного backend и без реальной CMS-интеграции.

Причины:

- mock/local content source достаточно для первого вертикального среза;
- backend и CMS преждевременно усложнили бы проект;
- CMS/API adapter можно добавить позже без пересборки всей UI-архитектуры.

Такой trade-off позволяет сначала доказать архитектурную схему, а затем расширять источники данных.

### UI composition вместо универсального ContentEngine

Вместо преждевременного создания абстрактного универсального `ContentEngine` проект использует композицию:

- общие визуальные паттерны вынесены в `shared/ui`;
- компоненты статьи и новости остаются entity adapters;
- повторное использование строится через layout и primitive components, а не через слишком раннюю универсализацию.

Например, `ContentPreviewCard` и `ContentDetailsLayout` выступают как layout-компоненты, а не как универсальный domain engine.

### Makefile и CI

`Makefile` используется как единая точка входа для локальной разработки, Codex-сценариев, CI и Vercel deployment flow.

Это дает несколько преимуществ:

- команды стандартизированы между локальной средой и автоматизацией;
- GitHub Actions использует те же project-level checks;
- Vercel build также опирается на Makefile-команды;
- версии Node.js и pnpm зафиксированы и воспроизводимы.

## Тестирование и quality gates

В проекте уже настроены базовые quality gates:

- `Vitest` покрывает query-логику в `content-source`;
- `Playwright` используется для smoke e2e тестов публичных маршрутов;
- `GitHub Actions CI` запускает project-level checks;
- локальная quality gate выполняется через `make check`;
- production smoke test запускается через `make e2e-prod`.

При этом Playwright smoke tests пока намеренно не включены в стандартный `make check`, чтобы не утяжелять базовый локальный и CI-поток до стабилизации e2e-набора.

## Deployment

Production deployment размещен на **Vercel**.

Публичный production URL:

https://thematic-content-platform-web.vercel.app/

Preview/deployment-specific URLs защищены через **Vercel Standard Protection** и не должны использоваться как публичные ссылки в документации или портфолио.

Переменная `NEXT_PUBLIC_SITE_URL` используется для генерации абсолютных URL в `sitemap.xml` и `rss.xml`, поэтому она должна совпадать с production URL.

## Что проект демонстрирует работодателю

Этот проект показывает не только набор экранов, но и инженерный подход к разработке:

- умение модернизировать legacy-идею без слепой миграции старого кода;
- архитектурное мышление и работу с trade-offs;
- frontend system design для content-driven приложения;
- организацию monorepo и внутренних пакетов;
- typed domain modeling;
- проектирование SEO-oriented pages;
- понимание CI и deployment constraints;
- способность удерживать баланс между переиспользованием и преждевременной абстракцией.

## Возможное развитие

Следующие направления выглядят естественным продолжением проекта:

- CMS/API adapter spike;
- richer content model;
- better visual design;
- Open Graph images;
- sitemap splitting при росте объема контента;
- улучшение поиска;
- Playwright в CI;
- content localization / i18n.
