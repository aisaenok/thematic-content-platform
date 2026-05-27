import Link from 'next/link'

import styles from './site-header.module.css'
import { routes } from '../../shared/routing'

const navigationItems = [
  {
    href: routes.home(),
    label: 'Home',
  },
  {
    href: routes.wiki(),
    label: 'Wiki',
  },
  {
    href: routes.news(),
    label: 'News',
  },
  {
    href: routes.search(),
    label: 'Search',
  },
]

export const SiteHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} href={routes.home()}>
          Thematic Content Platform
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {navigationItems.map((item) => (
            <Link className={styles.navLink} href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
