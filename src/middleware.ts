import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 認証が必要なパス
const AUTH_REQUIRED_PATHS = [
  '/dashboard',
  '/budget',
  '/actuals',
  '/analysis',
  '/masters',
];

// 認証が不要なパス
const PUBLIC_PATHS = [
  '/login',
  '/api/auth',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // セッショントークンの確認
  const sessionToken = request.cookies.get('session-token')?.value;

  // 認証が必要なパスへのアクセス
  if (AUTH_REQUIRED_PATHS.some(path => pathname.startsWith(path))) {
    if (!sessionToken) {
      // 未認証の場合はログインページにリダイレクト
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }

  // 認証済みユーザーのログインページアクセス
  if (pathname === '/login' && sessionToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // レスポンスヘッダーの設定
  const response = NextResponse.next();
  response.headers.set('x-middleware-cache', 'no-cache');

  // セキュリティヘッダーの追加
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 