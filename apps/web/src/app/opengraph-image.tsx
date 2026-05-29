import { ImageResponse } from 'next/og'

export const alt = 'Thematic Content Platform'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

const badges = ['Next.js', 'Nx', 'TypeScript', 'SEO', 'Storybook', 'Vercel']

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: '#ffffff',
          color: '#111111',
          padding: '48px',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid #e5e5e5',
            borderRadius: '28px',
            background: '#fafafa',
            padding: '48px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              maxWidth: '760px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#555555',
                fontSize: 24,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Portfolio-grade content platform prototype
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 76,
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: '-0.04em',
              }}
            >
              Thematic Content Platform
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#555555',
                fontSize: 30,
                lineHeight: 1.4,
                maxWidth: '820px',
              }}
            >
              Typed content model, Next.js App Router, search, RSS, sitemap and
              UI Kit showcase.
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              {badges.map((badge) => (
                <div
                  key={badge}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #e5e5e5',
                    borderRadius: '999px',
                    background: '#ffffff',
                    padding: '10px 20px',
                    fontSize: 24,
                    color: '#111111',
                  }}
                >
                  {badge}
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#555555',
                fontSize: 22,
              }}
            >
              thematic-content-platform-web.vercel.app
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
