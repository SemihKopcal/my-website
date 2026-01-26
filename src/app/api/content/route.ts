import { NextResponse } from 'next/server';
import contentData from '@/data/content.json';

export const runtime = 'edge';
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(contentData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // Note: Filesystem writes are not supported in Edge environments like Cloudflare Pages.
  // This would typically need to be moved to a database or KV store.
  return NextResponse.json(
    { error: 'Content updates are not supported in the current production environment' }, 
    { status: 405 }
  );
}
