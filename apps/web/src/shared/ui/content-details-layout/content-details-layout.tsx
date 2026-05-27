import type { ReactNode } from 'react'

import styles from './content-details-layout.module.css'

type ContentDetailsLayoutProps = {
  header: ReactNode
  title: string
  description: string
  tags?: ReactNode
  children: ReactNode
}

export const ContentDetailsLayout = ({
  header,
  title,
  description,
  tags,
  children,
}: ContentDetailsLayoutProps) => {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.headerRow}>{header}</div>

        <h1 className={styles.title}>{title}</h1>

        <p className={styles.description}>{description}</p>

        {tags ? <div className={styles.tags}>{tags}</div> : null}
      </header>

      <div className={styles.content}>{children}</div>
    </article>
  )
}
