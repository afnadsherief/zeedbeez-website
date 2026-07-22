import { ImageResponse } from 'next/og'

export const alt = 'ZeedBeez — Premium Biotechnology Wellness'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

/**
 * Generates the default social-share image at build/request time.
 *
 * This removes the dependency on an untracked raster placeholder while keeping
 * the approved matte-black and honey-gold visual language. Product photography
 * can replace this route with an approved asset in a later content release.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#080808',
          color: '#ffffff',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
        }}
      >
        <div
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.28), rgba(251,191,36,0) 68%)',
            borderRadius: '9999px',
            height: '900px',
            position: 'absolute',
            right: '-260px',
            top: '-190px',
            width: '900px',
          }}
        />
        <div
          style={{
            border: '1px solid rgba(251,191,36,0.38)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            margin: '64px',
            padding: '72px',
            position: 'relative',
            width: '100%',
          }}
        >
          <div
            style={{
              color: '#fbbf24',
              fontSize: 24,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            ZeedBeez
          </div>
          <div
            style={{
              fontSize: 76,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              maxWidth: '820px',
            }}
          >
            Nature.
            <br />
            <span style={{ color: '#fbbf24' }}>Refined.</span>
          </div>
          <div
            style={{
              color: 'rgba(255,255,255,0.72)',
              fontSize: 28,
              lineHeight: 1.35,
              maxWidth: '760px',
            }}
          >
            Premium biotechnology wellness rooted in science.
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
