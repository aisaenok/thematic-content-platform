import styles from './page.module.css'
import { LinkButton } from '../shared/ui/link-button'
import { routes } from '@/shared/routing'

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Portfolio-grade prototype</p>

        <h1 className={styles.title}>Thematic Content Platform</h1>

        <p className={styles.description}>
          Wiki/content-платформа для тематических энциклопедических сайтов.
          Первый demo domain построен вокруг вселенной Alien.
        </p>

        <LinkButton href={routes.wiki()}>
          Open wiki articles
        </LinkButton>
      </section>
    </div>
  )
}
