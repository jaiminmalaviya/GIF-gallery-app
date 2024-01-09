import { NextResponse } from 'next/server'

export const middleware = async (request) => {
   const path = request.nextUrl.pathname

   const isPublicPath = path === '/auth/login' || path === '/auth/register'

   const token = request.cookies.get('user')?.value || ''

   if (isPublicPath && token) {
      return NextResponse.redirect(new URL('/', request.nextUrl))
   }

   if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
   }
}
export const config = {
   matcher: ['/', '/favorites', '/auth/login', '/auth/register'],
}
