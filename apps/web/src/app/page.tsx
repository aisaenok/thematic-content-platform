import Link from 'next/link'

import styles from './page.module.css'

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Portfolio-grade prototype</p>

        <h1 className={styles.title}>Thematic Content Platform</h1>

        <p className={styles.description}>
          Wiki/content-платформа для тематических энциклопедических сайтов.
          Первый demo domain построен вокруг вселенной Alien.
        </p>

        <Link className={styles.link} href="/wiki">
          Open wiki articles
        </Link>
      </section>
    </main>
  )
}