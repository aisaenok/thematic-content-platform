import type { ReactNode } from 'react'

import styles from './page.module.css'

type PageSize = 'md' | 'lg'

type PageProps = {
  children: ReactNode
  size?: PageSize
}

type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
}

type PageBodyVariant = 'default' | 'grid' | 'stackSeparated'

type PageBodyProps = {
  children: ReactNode
  variant?: PageBodyVariant
  ariaLabel?: string
}

type PageFooterProps = {
  children: ReactNode
}

const PageRoot = ({ children, size = 'lg' }: PageProps) => {
  return <div className={`${styles.page} ${styles[size]}`}>{children}</div>
}

const PageHeader = ({ eyebrow, title, description }: PageHeaderProps) => {
  return (
    <section className={styles.header}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}

      <h1 className={styles.title}>{title}</h1>

      {description ? <p className={styles.description}>{description}</p> : null}
    </section>
  )
}

const PageBody = ({
  children,
  variant = 'default',
  ariaLabel,
}: PageBodyProps) => {
  const className = [
    styles.body,
    variant === 'grid' ? styles.grid : undefined,
    variant === 'stackSeparated' ? styles.stackSeparated : undefined,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section aria-label={ariaLabel} className={className}>
      {children}
    </section>
  )
}

const PageFooter = ({ children }: PageFooterProps) => {
  return <footer className={styles.footer}>{children}</footer>
}

export const Page = Object.assign(PageRoot, {
  Header: PageHeader,
  Body: PageBody,
  Footer: PageFooter,
})
