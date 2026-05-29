import type { Meta, StoryObj } from '@storybook/nextjs'

import { LinkButton } from '../link-button'
import { Page } from './page'

const meta = {
  component: Page,
  title: 'Shared UI/Page',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>

export default meta

type Story = StoryObj<typeof meta>

const mockGridCardStyle = {
  padding: '24px',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
}

export const HeaderAndDefaultBody: Story = {
  render: () => (
    <Page size="lg">
      <Page.Header
        eyebrow="Search prototype"
        title="Search content"
        description="Server-side search prototype across wiki articles and news items."
      />

      <Page.Body>
        <div style={{ maxWidth: '720px' }}>
          <p>
            Default body variant is used when the page content manages its own
            composition, for example a route-local form and a results block.
          </p>
          <LinkButton href="#">Open wiki articles</LinkButton>
        </div>
      </Page.Body>
    </Page>
  ),
}

export const GridBody: Story = {
  render: () => (
    <Page size="lg">
      <Page.Header
        eyebrow="Demo domain"
        title="Wiki articles"
        description="Grid body variant for list pages."
      />

      <Page.Body ariaLabel="Wiki articles" variant="grid">
        <article style={mockGridCardStyle}>
          <h3>Facehugger</h3>
          <p>Preview card placeholder inside a page-level grid layout.</p>
        </article>
        <article style={mockGridCardStyle}>
          <h3>Xenomorph life cycle</h3>
          <p>Another card to demonstrate repeated content blocks.</p>
        </article>
        <article style={mockGridCardStyle}>
          <h3>Weyland-Yutani</h3>
          <p>Shared grid pattern for content list pages.</p>
        </article>
      </Page.Body>
    </Page>
  ),
}

export const StackSeparatedBody: Story = {
  render: () => (
    <Page size="md">
      <Page.Body ariaLabel="Article content" variant="stackSeparated">
        <section>
          <h2>Article details</h2>
          <p>
            Main details block for content pages. The layout variant adds the
            outer section rhythm.
          </p>
        </section>

        <section>
          <h2>Related content</h2>
          <p>
            Secondary block separated by the page layout, not by its own outer
            spacing rules.
          </p>
        </section>
      </Page.Body>
    </Page>
  ),
}
