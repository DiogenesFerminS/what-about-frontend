import { NextResponse, NextRequest } from 'next/server'
 
export default async function proxy(request: NextRequest) {

    const authJwt = request.cookies.get('auth-token');
    const refreshJwt = request.cookies.get('refresh-token');

    if (request.nextUrl.pathname.includes('/wa')) {
        if(authJwt === undefined) {
            if(refreshJwt) {
              const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `refresh-token=${refreshJwt.value}`
                }
              });

              if(!resp.ok) {
                return NextResponse.redirect(new URL('/auth/login', request.url));
              }

              const response: {ok: boolean, message: string, data: {accessToken: string, refreshToken: string}} = await resp.json();

              if(!response.ok) {
                return NextResponse.redirect(new URL('/auth/login', request.url));
              }

              const nextResponse = NextResponse.next()

              nextResponse.cookies.set("auth-token", response.data.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: 'lax',
                path: "/",
                maxAge: 60 * 15,
              });

              nextResponse.cookies.set("refresh-token", response.data.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: 'lax',
                path: "/",
                maxAge: 60 * 15,
              });

              return nextResponse;
            }

            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }
    return NextResponse.next()
}
 
export const config = {
  matcher: '/wa/:path*',
}