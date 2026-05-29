import { routes } from '../shared/routing'
import { LinkButton } from '../shared/ui/link-button'
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
          <LinkButton href={routes.home()}>
            Go home
          </LinkButton>

          <LinkButton href={routes.wiki()} variant="secondary">
            Open wiki
          </LinkButton>
        </div>
      </section>
    </div>
  )
}
