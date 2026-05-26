import Link from 'next/link'

import { Breadcrumbs } from '../../shared/ui/breadcrumbs'
import styles from './not-found.module.css'

export default function ArticleNotFoundPage() {
  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          {
            label: 'Home',
            href: '/',
          },
          {
            label: 'Wiki',
            href: '/wiki',
          },
          {
            label: 'Article not found',
          },
        ]}
      />

      <section className={styles.content}>
        <p className={styles.eyebrow}>404</p>

        <h1 className={styles.title}>Article not found</h1>

        <p className={styles.description}>
          Такой статьи нет в текущем mock content source. Возможно, slug устарел
          или материал еще не добавлен в демо-домен.
        </p>

        <Link className={styles.link} href="/wiki">
          Back to wiki articles
        </Link>
      </section>
    </div>
  )
}