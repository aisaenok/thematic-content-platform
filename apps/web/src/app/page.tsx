import styles from './page.module.css'
import { LinkButton } from '../shared/ui/link-button'
import {
  homePageArchitectureHighlights,
  homePageFeatures,
  homePageProjectSnapshot,
} from './_content/home-page-content'
import { routes } from '@/shared/routing'

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
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
        </div>

        <aside className={styles.heroPanel} aria-label="Краткое описание проекта">
          <p className={styles.heroPanelEyebrow}>Project snapshot</p>

          <h2 className={styles.heroPanelTitle}>Что видно сразу</h2>

          <div className={styles.heroPanelGrid}>
            {homePageProjectSnapshot.map((item) => (
              <span className={styles.heroPanelItem} key={item}>
                {item}
              </span>
            ))}
          </div>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Что уже реализовано</h2>

          <p className={styles.sectionDescription}>
            Прототип уже покрывает основные content platform slices и
            поддерживающую инженерную инфраструктуру.
          </p>
        </div>

        <div className={styles.featureGrid}>
          {homePageFeatures.map((feature, index) => (
            <article className={styles.featureCard} key={feature.title}>
              <span className={styles.cardIndex}>
                {String(index + 1).padStart(2, '0')}
              </span>

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

        <div className={styles.architectureList}>
          {homePageArchitectureHighlights.map((item) => (
            <article className={styles.architectureItem} key={item.title}>
              <span className={styles.architectureMarker} />

              <div className={styles.architectureContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>

                <p className={styles.cardDescription}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Изучить прототип</h2>
        </div>

        <div className={styles.exploreBox}>
          <p className={styles.sectionDescription}>
            Начните со списков контента, затем откройте details pages,
            category/tag navigation или server-side search.
          </p>

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
        </div>
      </section>
    </div>
  )
}
