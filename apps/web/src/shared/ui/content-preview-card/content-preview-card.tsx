import type { ReactNode } from 'react'
import Link from 'next/link'

import styles from './content-preview-card.module.css'

type ContentPreviewCardProps = {
  title: string
  href: string
  description: string
  header?: ReactNode
  footer?: ReactNode
}

export const ContentPreviewCard = ({
  title,
  href,
  description,
  header,
  footer,
}: ContentPreviewCardProps) => {
  return (
    <article className={styles.card}>
      {header ? <div className={styles.header}>{header}</div> : null}

      <h2 className={styles.title}>
        <Link href={href}>{title}</Link>
      </h2>

      <p className={styles.description}>{description}</p>

      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </article>
  )
}
