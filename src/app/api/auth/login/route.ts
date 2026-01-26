import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === 'semihkopcal1@gmail.com' && password === 'password') {
    const response = NextResponse.json({ success: true });
    
    // Set a basic auth cookie (removed httpOnly so client can check it)
    response.cookies.set('admin_token', 'semih_admin_secure_secret', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  }

  return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}
