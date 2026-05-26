import styles from './site-footer.module.css'

export const SiteFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.text}>
          Portfolio-grade wiki/content platform prototype.
        </p>

        <p className={styles.text}>
          Demo domain: Alien universe.
        </p>
      </div>
    </footer>
  )
}