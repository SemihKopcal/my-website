import { NextResponse } from 'next/server';

export function GET() {
  const robotsTxt = `
User-agent: *
Disallow:

Sitemap: https://semihkopcal.com/sitemap.xml
  `.trim();

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
