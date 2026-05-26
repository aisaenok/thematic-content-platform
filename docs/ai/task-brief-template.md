# Шаблон задачи для Codex

Используй этот шаблон перед тем, как поручать задачу Codex или другому AI-ассистенту.

Главная цель — дать AI достаточно контекста и ограничений, чтобы он не сделал лишнего.

## Шаблон

```text
Задача:
[Кратко опиши, что нужно сделать.]

Контекст:
[Объясни, зачем это нужно и как связано с проектом.]

Проект:
Thematic Content Platform — portfolio-grade wiki/content platform prototype.
Стек: Nx, Next.js App Router, React, TypeScript.
На текущем этапе нет backend, CMS, Redux и Redux-Saga.

Файлы в scope:
- [путь к файлу]
- [путь к файлу]
- [путь к директории]

Что нужно сделать:
- [конкретное действие 1]
- [конкретное действие 2]
- [конкретное действие 3]

Ограничения:
- не менять файлы вне scope;
- не добавлять runtime-зависимости без необходимости;
- не добавлять backend;
- не добавлять CMS;
- не добавлять Redux/Redux-Saga/MobX;
- не смешивать domain-типы и UI;
- не делать cross-cutting refactoring;
- не менять архитектуру проекта.

Ожидаемый результат:
- [что должно появиться после выполнения задачи]
- [какие экспорты должны быть добавлены]
- [какое поведение должно работать]

Проверка:
- npm run lint
- npm run typecheck
- npm run test
- npm run build

Если какой-то команды еще нет, просто укажи это в результате.
```

## Пример 1. Domain model

```text
Задача:
Создать domain-модель для статей.

Контекст:
Нужно начать первый вертикальный срез content platform: typed content model → mock content source → Next page.
Article — первая базовая сущность платформы.

Проект:
Thematic Content Platform — portfolio-grade wiki/content platform prototype.
Стек: Nx, Next.js App Router, React, TypeScript.
На текущем этапе нет backend, CMS, Redux и Redux-Saga.

Файлы в scope:
- packages/content-domain/src/article.ts
- packages/content-domain/src/content-relation.ts
- packages/content-domain/src/shared.ts
- packages/content-domain/src/index.ts

Что нужно сделать:
- создать тип Slug;
- создать тип ContentId;
- создать тип DateISOString;
- создать тип Article;
- создать тип ArticleSummary;
- создать тип ContentRelation;
- экспортировать публичные типы из index.ts.

Ограничения:
- не добавлять runtime-зависимости;
- не добавлять React;
- не добавлять Next.js imports;
- не добавлять CMS-типы;
- не добавлять UI-компоненты;
- не менять apps/web;
- не создавать универсальный ContentEngine.

Ожидаемый результат:
- domain-типы для статей;
- строгие TypeScript-типы;
- публичные экспорты через index.ts;
- без runtime-кода, если он не нужен.

Проверка:
- npm run typecheck
```

## Пример 2. Mock content source

```text
Задача:
Создать mock content source для статей.

Контекст:
На первом этапе CMS не используется. Нужен локальный источник данных, который позволит собрать страницы списка статей и страницы статьи по slug.

Проект:
Thematic Content Platform — portfolio-grade wiki/content platform prototype.
Стек: Nx, Next.js App Router, React, TypeScript.
На текущем этапе нет backend, CMS, Redux и Redux-Saga.

Файлы в scope:
- packages/content-source/src/mock/articles.ts
- packages/content-source/src/articles.ts
- packages/content-source/src/index.ts

Что нужно сделать:
- создать массив mockArticles;
- добавить функцию getArticles();
- добавить функцию getArticleBySlug(slug);
- добавить функцию getRelatedArticles(articleId);
- использовать типы из packages/content-domain;
- добавить 3-5 demo articles по Alien-домену.

Ограничения:
- не добавлять CMS;
- не добавлять backend;
- не добавлять database client;
- не добавлять React-компоненты;
- не менять apps/web;
- не добавлять Redux/Redux-Saga;
- данные должны быть статичными in-memory.

Ожидаемый результат:
- mock data source для статей;
- функции чтения данных;
- типизация через content-domain;
- экспорт из index.ts.

Проверка:
- npm run typecheck
```

## Пример 3. Страница статьи

```text
Задача:
Создать страницу wiki-статьи по slug.

Контекст:
Нужно собрать первый end-to-end сценарий: пользователь открывает /wiki/[slug], Next загружает статью из content-source и рендерит страницу.

Проект:
Thematic Content Platform — portfolio-grade wiki/content platform prototype.
Стек: Nx, Next.js App Router, React, TypeScript.
На текущем этапе нет backend, CMS, Redux и Redux-Saga.

Файлы в scope:
- apps/web/app/wiki/[slug]/page.tsx
- apps/web/app/wiki/[slug]/not-found.tsx
- apps/web/src/widgets/article-page/
- apps/web/src/entities/article/

Что нужно сделать:
- создать динамическую страницу /wiki/[slug];
- загрузить статью через getArticleBySlug;
- обработать случай, когда статья не найдена;
- отрендерить title, description, body, tags;
- добавить блок related content, если данные есть;
- добавить generateMetadata для SEO.

Ограничения:
- не добавлять client component без необходимости;
- не добавлять React Query/SWR;
- не добавлять Redux/Redux-Saga;
- не добавлять backend;
- не добавлять CMS;
- не менять routing strategy;
- не менять domain model, если это не требуется явно.

Ожидаемый результат:
- работает страница статьи по slug;
- статья рендерится на сервере;
- есть metadata;
- есть обработка not found;
- код разделен на page-level composition и UI-блоки.

Проверка:
- npm run typecheck
- npm run lint
- npm run build
```

## Пример 4. README

```text
Задача:
Обновить README проекта.

Контекст:
Нужно зафиксировать позиционирование проекта как portfolio-grade wiki/content platform prototype и описать связь со старым Alien Wiki.

Проект:
Thematic Content Platform — portfolio-grade wiki/content platform prototype.
Стек: Nx, Next.js App Router, React, TypeScript.

Файлы в scope:
- README.md

Что нужно сделать:
- добавить краткое описание проекта;
- объяснить, что это greenfield-модернизация старого Alien Wiki;
- описать demo domain;
- описать целевой стек;
- добавить roadmap;
- добавить статус проекта;
- не обещать production-ready SaaS platform.

Ограничения:
- не преувеличивать масштаб проекта;
- не писать, что это полноценная CMS-платформа;
- не писать, что проект production-ready;
- не добавлять инструкции по несуществующим командам;
- не упоминать фичи, которых еще нет, как готовые.

Ожидаемый результат:
- README честно описывает проект;
- видно назначение проекта;
- понятно, что это portfolio-grade prototype;
- есть roadmap и текущий статус.

Проверка:
- визуально прочитать README;
- убедиться, что нет завышенных обещаний.
```

## Мини-чеклист перед отправкой задачи Codex

Перед запуском Codex проверь:

- задача помещается в 1 небольшой scope;
- перечислены конкретные файлы;
- указано, что нельзя менять;
- явно запрещены backend/CMS/Redux/Saga, если они не нужны;
- описан ожидаемый результат;
- понятно, как проверить результат;
- ты сам можешь объяснить, зачем эта задача нужна.

## Мини-чеклист после ответа Codex

После генерации проверь:

- Codex не изменил лишние файлы;
- не добавил зависимости без причины;
- не усложнил архитектуру;
- не смешал domain и UI;
- не добавил client component без необходимости;
- не добавил глобальный state manager;
- не оставил debug-код;
- код проходит typecheck/lint/build, если команды доступны;
- результат можно объяснить на собеседовании.
