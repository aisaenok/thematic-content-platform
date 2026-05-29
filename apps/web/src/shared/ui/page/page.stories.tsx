import type { Meta, StoryObj } from '@storybook/nextjs'

import { LinkButton } from '../link-button'
import { Page } from './page'

const meta = {
  component: Page,
  title: 'UI Kit/Layout/Page',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>

export default meta

type Story = StoryObj<typeof meta>

const mockGridCardStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '12px',
  padding: '24px',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  background: 'var(--color-surface)',
}

const mockSectionStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '16px',
  maxWidth: '760px',
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
        <div style={mockSectionStyle}>
          <p style={{ margin: 0 }}>
            Default body variant is used when the page content manages its own
            composition, for example a route-local form plus a results block or
            a short explanatory section with CTA actions.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <LinkButton href="#">Open wiki articles</LinkButton>
            <LinkButton href="#" variant="secondary">
              Explore news
            </LinkButton>
          </div>
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
        description="Grid body variant for list pages with reusable content cards."
      />

      <Page.Body ariaLabel="Wiki articles" variant="grid">
        <article style={mockGridCardStyle}>
          <h3 style={{ margin: 0 }}>Typed content model</h3>
          <p style={{ margin: 0 }}>
            Preview card placeholder inside a page-level grid layout.
          </p>
        </article>
        <article style={mockGridCardStyle}>
          <h3 style={{ margin: 0 }}>Search prototype</h3>
          <p style={{ margin: 0 }}>
            Another card to demonstrate repeated content blocks.
          </p>
        </article>
        <article style={mockGridCardStyle}>
          <h3 style={{ margin: 0 }}>SEO routes</h3>
          <p style={{ margin: 0 }}>Shared grid pattern for content list pages.</p>
        </article>
      </Page.Body>
    </Page>
  ),
}

export const StackSeparatedBody: Story = {
  render: () => (
    <Page size="md">
      <Page.Body ariaLabel="Article content" variant="stackSeparated">
        <section style={mockSectionStyle}>
          <h2 style={{ margin: 0 }}>Article details block</h2>
          <p style={{ margin: 0 }}>
            Main details-like section for content pages. The layout variant adds
            the outer rhythm while the section itself stays focused on its own
            content.
          </p>
        </section>

        <section style={mockSectionStyle}>
          <h2 style={{ margin: 0 }}>Related content block</h2>
          <p style={{ margin: 0 }}>
            Secondary section separated by the page layout, not by its own outer
            spacing rules.
          </p>
        </section>
      </Page.Body>
    </Page>
  ),
}
