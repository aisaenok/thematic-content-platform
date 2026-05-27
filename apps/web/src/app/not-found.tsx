import Link from 'next/link'

import { routes } from '../shared/routing'
import styles from './not-found.module.css'

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <section className={styles.content}>
        <p className={styles.eyebrow}>404</p>

        <h1 className={styles.title}>Page not found</h1>

        <p className={styles.description}>
          Такой страницы нет в текущем demo-срезе Thematic Content Platform.
          Вернитесь на главную или откройте список wiki-статей.
        </p>

        <div className={styles.actions}>
          <Link className={styles.primaryLink} href={routes.home()}>
            Go home
          </Link>

          <Link className={styles.secondaryLink} href={routes.wiki()}>
            Open wiki
          </Link>
        </div>
      </section>
    </div>
  )
}