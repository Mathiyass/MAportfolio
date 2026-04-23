import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-static';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'MATHIYA Nexus Prime';
    const subtitle = searchParams.get('subtitle') || 'Systems. Products. Experiences.';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#050505',
            padding: '80px',
          }}
        >
          {/* Accent border */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '10px', background: 'linear-gradient(90deg, #22D3EE, #FB7185)' }} />
          
          {/* Logo / Brand */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#22D3EE', borderRadius: '8px', marginRight: '20px' }} />
            <span style={{ color: '#fff', fontSize: '32px', fontFamily: 'monospace', fontWeight: 'bold' }}>
              MATHIYA
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '80px',
              fontFamily: 'sans-serif',
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.1,
              marginBottom: '20px',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
          
          {/* Subtitle */}
          <div
            style={{
              fontSize: '36px',
              fontFamily: 'sans-serif',
              color: '#a1a1aa',
              maxWidth: '800px',
            }}
          >
            {subtitle}
          </div>

          {/* Tag */}
          <div
            style={{
              position: 'absolute',
              bottom: '80px',
              left: '80px',
              color: '#22D3EE',
              fontSize: '24px',
              fontFamily: 'monospace',
            }}
          >
            mathiya.dev
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    console.error(e instanceof Error ? e.message : 'Unknown error');
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
