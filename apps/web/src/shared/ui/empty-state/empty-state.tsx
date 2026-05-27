import type { ReactNode } from 'react'

import styles from './empty-state.module.css'

type EmptyStateProps = {
  title: string
  description?: string
  action?: ReactNode
}

export const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <section className={styles.emptyState}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Empty state</p>

        <h2 className={styles.title}>{title}</h2>

        {description ? (
          <p className={styles.description}>{description}</p>
        ) : null}

        {action ? <div className={styles.action}>{action}</div> : null}
      </div>
    </section>
  )
}