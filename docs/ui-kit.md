# UI Kit и design-system подход

## Цель

Проект **Thematic Content Platform** использует собственный mini UI Kit / design-system approach, а не готовую библиотеку компонентов как основу интерфейсного слоя.

Цель такого подхода:

- показать умение строить UI layer, а не только собирать приложение из готовых виджетов;
- отделить visual primitives от domain components;
- использовать design tokens, reusable primitives, layout components и entity adapters;
- не превращать UI в хаотичный набор несвязанных CSS Modules.

## Почему не Ant Design / MUI / Mantine прямо сейчас

Ant Design, MUI и Mantine остаются нормальными и зрелыми вариантами для реальных продуктовых задач.

- Ant Design и MUI часто хорошо подходят для enterprise, B2B и fintech-интерфейсов;
- Mantine тоже удобен для SaaS и dashboard-сценариев;
- все эти решения помогают быстро собирать стабильный интерфейсный слой.

Для этого портфолио-прототипа выбран другой trade-off: важнее показать собственное архитектурное мышление вокруг UI layer.

Подключение готового UI Kit на текущем этапе частично скрыло бы:

- как устроены tokens;
- как выстроена композиция UI;
- как организованы reusable components;
- где проходит граница между visual layer и domain adapters.

При этом текущий подход не конфликтует с будущей миграцией на Ant Design, MUI, Mantine или headless primitives, если проекту позже понадобится другой баланс скорости разработки и кастомизации.

## Принцип слоев

```text
design-system/tokens
  → CSS custom properties: colors, spacing, typography, radius, shadows

shared/ui
  → reusable visual components and layout patterns

entities/article, entities/news
  → domain data → shared UI composition

app routes
  → page-level composition and routing
```

Такое разделение нужно, чтобы визуальная система росла независимо от domain-логики и маршрутизации.

## Текущие shared UI components

На текущем этапе в `shared/ui` уже есть несколько переиспользуемых building blocks:

- `ContentPreviewCard`;
- `ContentDetailsLayout`;
- `TagList`;
- `Breadcrumbs`;
- `EmptyState`.

Эти компоненты не являются domain engine. Это визуальные building blocks и layout patterns, которые могут переиспользоваться разными content entities.

## Правило композиции

Базовое правило композиции фиксируется так:

- `shared/ui` не должен импортировать `content-source`;
- `shared/ui` не должен знать про `Article`, `News` и конкретные routes;
- `shared/ui` должен принимать primitive props, children и slots;
- entity components должны мапить domain data в shared UI components.

Примеры:

```text
ArticleCard
  → maps ArticleSummary to ContentPreviewCard

NewsCard
  → maps NewsSummary to ContentPreviewCard
```

Такой подход удерживает чистую границу между domain representation и visual composition.

## Tokens-first подход

Проект движется в сторону tokens-first подхода.

Это означает, что:

- цвета постепенно выносятся в CSS custom properties;
- отступы, радиусы, тени и типографика также фиксируются в tokens;
- новые компоненты по возможности должны использовать tokens;
- существующие компоненты можно переводить на tokens постепенно, отдельными небольшими PR или commit-ами.

На этом этапе задача не состоит в массовом рефакторинге всех CSS Modules. Цель текущего слоя tokens — задать базовую систему значений и подключить ее глобально.

## Future work

Следующими естественными шагами для mini UI Kit выглядят:

- `Button`;
- `LinkButton`;
- `Badge`;
- `TextField`;
- `PageHeader`;
- `SectionHeader`;
- `Card` primitive;
- улучшение responsive rules;
- возможный Storybook позже;
- темизация и dark mode позже;
- i18n-friendly UI texts позже.
