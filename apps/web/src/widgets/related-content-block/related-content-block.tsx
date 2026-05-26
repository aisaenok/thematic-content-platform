import type { ContentRelation } from '@thematic-content-platform/content-domain'

import { RelatedContentCard } from './related-content-card'
import styles from './related-content-block.module.css'

type RelatedContentBlockProps = {
  relations: ContentRelation[]
}

export const RelatedContentBlock = ({ relations }: RelatedContentBlockProps) => {
  if (relations.length === 0) {
    return null
  }

  return (
    <section className={styles.block} aria-labelledby="related-content-title">
      <div className={styles.header}>
        <p className={styles.eyebrow}>Explore more</p>

        <h2 className={styles.title} id="related-content-title">
          Related content
        </h2>
      </div>

      <div className={styles.grid}>
        {relations.map((relation) => (
          <RelatedContentCard key={relation.id} relation={relation} />
        ))}
      </div>
    </section>
  )
}