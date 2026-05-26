# Thematic Content Platform

**Thematic Content Platform** — портфолио-прототип wiki/content-платформы для тематических энциклопедических сайтов.

Проект создается как greenfield-модернизация старого личного проекта **Alien Wiki**. Вместо прямой миграции старой кодовой базы новая версия переосмысляет исходную идею на современном frontend-стеке: **Nx**, **Next.js App Router**, **React**, **TypeScript**, typed content model, SEO-oriented rendering и подключаемый content source layer.

Вселенная Alien используется как демонстрационная предметная область, на которой можно показать работу платформы со структурированным контентом: статьями, новостями, персонажами, локациями, фильмами, книгами, категориями, тегами и связанными материалами.

## Статус

Проект находится на раннем этапе разработки.

Это не production-ready CMS/SaaS-платформа, а **portfolio-grade prototype**, цель которого — показать архитектурный подход к разработке content-driven frontend-приложения.

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