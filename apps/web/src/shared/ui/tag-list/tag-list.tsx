import type { Tag } from '@thematic-content-platform/content-domain'
import Link from 'next/link'

import styles from './tag-list.module.css'

type TagListPlacement = 'card' | 'details'

type TagListProps = {
  tags: Tag[]
  placement: TagListPlacement
  getTagHref?: (tag: Tag) => string
}

export const TagList = ({ tags, placement, getTagHref }: TagListProps) => {
  if (tags.length === 0) {
    return null
  }

  return (
    <ul className={styles.list} data-placement={placement} aria-label="Tags">
      {tags.map((tag) => {
        const href = getTagHref?.(tag)

        return (
          <li className={styles.item} key={tag.id}>
            {href ? (
              <Link className={styles.tag} href={href}>
                {tag.title}
              </Link>
            ) : (
              <span className={styles.tag}>{tag.title}</span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
