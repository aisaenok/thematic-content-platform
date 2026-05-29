import type { ReactNode } from 'react'
import Link from 'next/link'

import styles from './link-button.module.css'

type LinkButtonVariant = 'primary' | 'secondary'

type LinkButtonProps = {
  href: string
  children: ReactNode
  variant?: LinkButtonVariant
}

export const LinkButton = ({
  href,
  children,
  variant = 'primary',
}: LinkButtonProps) => {
  return (
    <Link className={`${styles.linkButton} ${styles[variant]}`} href={href}>
      {children}
    </Link>
  )
}
