import styles from './page.module.css'
import { LinkButton } from '../shared/ui/link-button'
import {
  homePageArchitectureHighlights,
  homePageFeatures,
} from './_content/home-page-content'
import { routes } from '@/shared/routing'

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>
          Портфолио-прототип content platform
        </p>

        <h1 className={styles.title}>Thematic Content Platform</h1>

        <p className={styles.description}>
          Портфолио-прототип content-driven frontend platform на Next.js App
          Router, Nx и TypeScript. Проект показывает typed content modeling,
          multiple content types, category и tag navigation, search, SEO
          metadata, RSS, sitemap, CI checks и Vercel deployment.
        </p>

        <div className={styles.actions}>
          <LinkButton href={routes.wiki()}>Открыть wiki-статьи</LinkButton>

          <LinkButton href={routes.news()} variant="secondary">
            Открыть news
          </LinkButton>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Что уже реализовано</h2>

          <p className={styles.sectionDescription}>
            Прототип уже покрывает основные content platform slices и
            поддерживающую инженерную инфраструктуру.
          </p>
        </div>

        <div className={styles.grid}>
          {homePageFeatures.map((feature) => (
            <article className={styles.card} key={feature.title}>
              <h3 className={styles.cardTitle}>{feature.title}</h3>

              <p className={styles.cardDescription}>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Архитектурные акценты</h2>

          <p className={styles.sectionDescription}>
            Прототип content platform, построенный чтобы показать frontend
            architecture decisions в routing, content modeling, UI composition
            и delivery.
          </p>
        </div>

        <div className={styles.grid}>
          {homePageArchitectureHighlights.map((item) => (
            <article className={styles.card} key={item.title}>
              <h3 className={styles.cardTitle}>{item.title}</h3>

              <p className={styles.cardDescription}>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Изучить прототип</h2>

          <p className={styles.sectionDescription}>
            Откройте основные публичные routes и посмотрите на текущие вертикальные срезы.
          </p>
        </div>

        <div className={styles.linkGrid}>
          <LinkButton href={routes.wiki()} variant="secondary">
            Wiki
          </LinkButton>

          <LinkButton href={routes.news()} variant="secondary">
            News
          </LinkButton>

          <LinkButton href={routes.search()} variant="secondary">
            Search
          </LinkButton>
        </div>
      </section>
    </div>
  )
}
