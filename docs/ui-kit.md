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

## Page layout pattern

`Page` — это compound layout component для page-level композиции.

Он задает:

- ширину страницы;
- горизонтальные ограничения;
- вертикальный rhythm;
- стандартную header-зону страницы;
- body-зону;
- footer-зону при необходимости.

Базовый пример:

```tsx
<Page size="lg">
  <Page.Header
    eyebrow="Demo domain"
    title="Wiki articles"
    description="..."
  />

  <Page.Body variant="grid" ariaLabel="Wiki articles">
    ...
  </Page.Body>
</Page>
```

### Page

`Page` отвечает за внешний контейнер страницы.

- `size="lg"` используется для list, search, category и tag pages;
- `size="md"` используется для details pages.

`Page` не является domain component и не должен знать про:

- `Article`;
- `News`;
- `Category`;
- `Tag`;
- `content-source`;
- `routes`.

Его задача — только page-level layout pattern. Domain/page components сами решают, какие данные и какие дочерние блоки положить внутрь `Page`.

### Page.Header

`Page.Header` отвечает за hero/header-зону страницы:

- eyebrow;
- `h1` title;
- description.

`Breadcrumbs` не нужно помещать внутрь `Page.Header`. Это отдельная navigation zone внутри `Page`.

Правильная модель:

```tsx
<Page size="md">
  <Breadcrumbs items={...} />

  <Page.Body>
    ...
  </Page.Body>
</Page>
```

### Page.Body

`Page.Body` отвечает за основную область страницы.

Поддерживаемые variants:

#### default

Обычная body-зона без дополнительного layout-паттерна.

Используется, когда содержимое само управляет своим layout или содержит route-local composition.

Пример:

```tsx
<Page.Body>
  <SearchForm />
  <SearchResults />
</Page.Body>
```

#### grid

Карточная сетка для списков контента.

Используется для:

- wiki article list;
- news list;
- category article list;
- tag article list.

Пример:

```tsx
<Page.Body variant="grid" ariaLabel="Wiki articles">
  {articles.map((article) => (
    <ArticleCard article={article} key={article.id} />
  ))}
</Page.Body>
```

#### stackSeparated

Вертикальный stack секций с визуальным разделителем между соседними детьми.

Используется для details pages:

- article details + related content;
- news details + related content.

Пример:

```tsx
<Page.Body variant="stackSeparated" ariaLabel="Article content">
  <ArticleDetails article={article} />
  <RelatedContentBlock relations={article.related} />
</Page.Body>
```

### Page.Footer

`Page.Footer` — необязательная footer-зона страницы, если конкретному page-level сценарию нужно завершение после основной body-области.

### EmptyState внутри Page.Body

`EmptyState` должен рендериться внутри `Page.Body`, а не заменять `Page.Body`.

Правильно:

```tsx
<Page.Body variant={items.length === 0 ? 'default' : 'grid'}>
  {items.length === 0 ? (
    <EmptyState ... />
  ) : (
    items.map(...)
  )}
</Page.Body>
```

Неправильно:

```tsx
{items.length === 0 ? (
  <EmptyState ... />
) : (
  <Page.Body variant="grid">
    ...
  </Page.Body>
)}
```

Причина простая: `EmptyState` — это состояние содержимого страницы, а не альтернатива основной body-зоне.

### Разделение секций

Разделение секций на странице должно принадлежать layout-компоненту, если это внешний page-level spacing.

Например, `Page.Body variant="stackSeparated"` отвечает за separator между:

- `ArticleDetails` и `RelatedContentBlock`;
- `NewsDetails` и `RelatedContentBlock`.

Правильное распределение ответственности:

```text
Page.Body stackSeparated
  → внешний rhythm между секциями
  → divider между соседними секциями

RelatedContentBlock
  → собственный внутренний layout
  → header
  → grid
  → cards
  → typography
```

Неправильная модель:

```css
RelatedContentBlock {
  padding-top: 40px;
  border-top: 1px solid ...;
}
```

Такой подход смешивает внутренний UI блока и внешний layout относительно предыдущей секции.

## Tokens-first подход

Проект движется в сторону tokens-first подхода.

Это означает, что:

- цвета постепенно выносятся в CSS custom properties;
- отступы, радиусы, тени и типографика также фиксируются в tokens;
- новые компоненты по возможности должны использовать tokens;
- существующие компоненты можно переводить на tokens постепенно, отдельными небольшими PR или commit-ами.

На этом этапе задача не состоит в массовом рефакторинге всех CSS Modules. Цель текущего слоя tokens — задать базовую систему значений и подключить ее глобально.

### Primitive tokens и semantic/component tokens

На текущем этапе первый уровень design tokens в проекте — это primitive tokens.

Примеры primitive tokens:

- `--space-1`;
- `--space-2`;
- `--color-text-primary`;
- `--color-surface-muted`;
- `--radius-pill`;
- `--font-size-sm`.

Primitive tokens описывают базовую шкалу значений:

- цвета;
- отступы;
- радиусы;
- типографику;
- тени.

Primitive tokens отвечают на вопрос:

```text
какие значения допустимы в дизайн-системе?
```

Например:

```css
--space-4: 16px;
```

Такой token означает:

```text
16px входит в разрешенную spacing scale проекта.
```

Но он не означает:

```text
все компоненты, которые используют --space-4, можно безопасно изменить одним изменением значения token.
```

Это особенно важно для spacing и других geometric tokens. Primitive token вроде `--space-4` не является стабильным публичным API конкретного компонента. Он только фиксирует, что такое значение разрешено внутри общей шкалы.

Они не обязаны объяснять бизнес-смысл конкретного решения. Например, `margin-top: var(--space-1)` говорит, что используется значение из spacing scale, но не объясняет само дизайн-решение, почему именно такой отступ выбран в конкретном UI-контексте.

Один и тот же primitive token может использоваться в разных смыслах:

- `gap` между элементами карточки;
- `padding` внутри кнопки;
- `margin` между секциями;
- внутренний отступ `input`;
- расстояние между `title` и `description`.

Формально значение может быть одинаковым, но семантически это разные UI-решения.

Поэтому в проекте используется двухуровневая модель tokens.

Первый уровень — primitive tokens:

```text
--space-4
--color-text-primary
--radius-lg
--font-size-md
```

Они отвечают на вопрос:

```text
какие значения допустимы в дизайн-системе?
```

Второй уровень — semantic/component tokens:

```text
--content-preview-card-padding
--content-preview-card-gap
--button-padding-x
--page-section-gap
--tag-list-details-margin-top
```

Они отвечают на вопрос:

```text
какое значение должно использоваться в конкретном UI-контексте?
```

Semantic tokens или component-level tokens вводятся не сразу, а только когда для этого появляется причина:

- значение начинает повторяться в нескольких компонентах или состояниях;
- значение становится частью публичного API компонента;
- значение отражает отдельное дизайн-решение, которое нужно стабилизировать;
- значение сложно безопасно менять через primitive token без влияния на другие места;
- значение относится к ключевому shared/ui компоненту.

Пример semantic/component token:

```css
--tag-list-details-margin-top: var(--space-1);
```

Пример для `ContentPreviewCard`.

Для маленького или локального компонента допустимо использовать primitive tokens напрямую:

```css
.card {
  padding: var(--space-6);
  gap: var(--space-4);
}
```

Но для ключевого shared/ui компонента со временем можно перейти на component-level tokens:

```css
:root {
  --content-preview-card-padding: var(--space-6);
  --content-preview-card-gap: var(--space-4);
  --content-preview-card-radius: var(--radius-lg);
  --content-preview-card-border-color: var(--color-border);
  --content-preview-card-background: var(--color-surface);
}

.card {
  padding: var(--content-preview-card-padding);
  gap: var(--content-preview-card-gap);
  border-radius: var(--content-preview-card-radius);
  border-color: var(--content-preview-card-border-color);
  background: var(--content-preview-card-background);
}
```

Это не означает, что такой второй слой нужно вводить сразу для каждого свойства. Сначала primitive tokens, потом semantic/component tokens там, где появилась повторяемость, стабильный контракт или отдельное дизайн-решение.

Но такие tokens не нужно вводить заранее для каждого локального значения, иначе дизайн-система быстро станет шумной и сложной в поддержке.

Текущее правило проекта:

- используем primitive tokens по умолчанию для локальных и простых случаев;
- вводим semantic/component tokens только при повторяемости, публичности или наличии отдельного дизайн-решения;
- маленькие локальные компоненты могут использовать primitive tokens напрямую;
- ключевые `shared/ui` компоненты постепенно могут получать component-level tokens;
- layout/page spacing со временем может получить semantic layout tokens;
- изменение primitive token не должно рассматриваться как безопасный способ точечной настройки конкретного компонента.

Практическое правило для текущего проекта:

- `--space-4` — primitive token;
- `--content-preview-card-gap` — component token;
- `--button-padding-x` — component token;
- `--page-section-gap` — semantic layout token.

### Когда достаточно primitive tokens

Primitive tokens достаточно для простых, централизованных и вспомогательных компонентов, если:

- компонент имеет небольшую CSS-модель;
- у компонента нет нескольких visual variants;
- компонент не требует отдельной темизации или density modes;
- компонент не предполагает внешних переопределений;
- все стили компонента уже централизованы в одном CSS Module;
- значения не являются стабильным публичным visual API компонента.

Примеры компонентов, где primitive tokens могут быть достаточны:

- `Breadcrumbs`;
- `TagList` в текущей версии;
- простые `Badge`, `Button`, `TextField` в первой версии;
- `SiteFooter`;
- небольшие локальные layout-компоненты.

Для `Breadcrumbs` сейчас выбран подход:

```text
Breadcrumbs → primitive tokens only
```

Причина в том, что компонент простой, централизованный и пока не требует отдельного component-token слоя. Сам факт использования на нескольких страницах еще не делает его кандидатом на собственные `--breadcrumbs-*` tokens.

### Когда нужны component-level tokens

Component-level tokens вводятся не просто потому, что компонент часто используется.

Частота использования сама по себе не является достаточным основанием.

Component-level tokens нужны, когда компонент:

- имеет сложную визуальную модель;
- является ключевым building block для нескольких экранов;
- имеет несколько variants, sizes или density states;
- требует темизации;
- должен поддерживать внешние переопределения;
- отражает стабильный visual contract дизайн-системы;
- содержит значения, которые рискованно менять напрямую через primitive tokens.

Примеры:

- `ContentPreviewCard`;
- `ContentDetailsLayout`;
- `EmptyState`;
- будущие сложные компоненты вроде `Modal`, `DataGrid/Table`, `NavigationShell`, `FormField`.

Для `ContentPreviewCard` и `ContentDetailsLayout` выбран подход:

```text
key shared UI layout components → component-level tokens
```

Причина в том, что они задают важные визуальные паттерны для `Article`, `News` и `Search` UI.

### Практическое правило выбора

```text
Повторное использование компонента на разных страницах — это аргумент за shared/ui компонент.
Повторение visual pattern между разными компонентами, наличие variants/theme overrides/stable visual contract — это аргумент за component-level tokens.
```

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
