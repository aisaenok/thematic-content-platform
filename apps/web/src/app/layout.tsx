import type { Metadata } from 'next'
import { SiteFooter } from '../widgets/site-footer'
import { SiteHeader } from '../widgets/site-header'

import './global.css'

export const metadata: Metadata = {
  title: {
    default: 'Thematic Content Platform',
    template: '%s | Thematic Content Platform',
  },
  description:
    'Portfolio-grade wiki/content platform prototype for thematic encyclopedia websites.',
}

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru">
      <body>
        <div className="app-shell">
          <SiteHeader />

          <main className="app-main">{children}</main>

          <SiteFooter />
        </div>
      </body>
    </html>
  )
}