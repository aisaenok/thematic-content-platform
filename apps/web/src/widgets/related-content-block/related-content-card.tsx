import type { ContentRelation } from '@thematic-content-platform/content-domain'
import Link from 'next/link'

import { getContentRelationHref } from '../../shared/routing/content-routes'
import styles from './related-content-block.module.css'

type RelatedContentCardProps = {
  relation: ContentRelation
}

export const RelatedContentCard = ({ relation }: RelatedContentCardProps) => {
  const href = getContentRelationHref(relation)

  if (!href) {
    return null
  }

  return (
    <article className={styles.card}>
      <h3 className={styles.cardTitle}>
        <Link href={href}>{relation.title}</Link>
      </h3>

      {relation.description ? (
        <p className={styles.cardDescription}>{relation.description}</p>
      ) : null}
    </article>
  )
}