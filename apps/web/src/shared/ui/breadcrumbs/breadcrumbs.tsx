import Link from 'next/link'

import styles from './breadcrumbs.module.css'

export type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  if (items.length === 0) {
    return null
  }

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1

          return (
            <li className={styles.item} key={`${item.href ?? item.label}-${index}`}>
              {item.href && !isLastItem ? (
                <Link className={styles.link} href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current} aria-current={isLastItem ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}