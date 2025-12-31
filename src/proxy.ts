import { NextResponse, NextRequest } from 'next/server'
 
export default function proxy(request: NextRequest) {

    const jwt = request.cookies.get('auth-token');

    if (request.nextUrl.pathname.includes('/wa')) {
        if(jwt === undefined) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }
    return NextResponse.next()
}
 
export const config = {
  matcher: '/wa/:path*',
}