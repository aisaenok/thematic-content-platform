import Link from 'next/link'

import styles from './site-header.module.css'

const navigationItems = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/wiki',
    label: 'Wiki',
  },
]

export const SiteHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} href="/">
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