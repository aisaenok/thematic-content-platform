import type { Metadata } from 'next'
import { SiteFooter } from '../widgets/site-footer'
import { SiteHeader } from '../widgets/site-header'
import { siteConfig } from '../shared/config/site'

import './global.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  generator: 'Next.js',
  keywords: [
    'content platform',
    'Next.js',
    'React',
    'TypeScript',
    'Nx',
    'SEO',
    'RSS',
    'sitemap',
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.shortDescription,
    url: '/',
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.shortDescription,
  },
  alternates: {
    canonical: '/',
  },
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
