import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
   // user path 
   const path = request.nextUrl.pathname

   const isPublicPath = path === '/login' || path === '/signup' || path ==='/verifyEmail'
   // check user login or not using token 
   //get token 
   const token =  request.cookies.get("token")?.value || ''
 
   // if user login ho 
  if (isPublicPath && token){
   // user ko jo response bhjna k uske andr hi redirect krna 
   // like without access xyz route m mtt jao 
   return NextResponse.redirect(new URL('/', request.url))
  }

  // if no public path and not token then you go login route

  if(!isPublicPath && !token){
   return NextResponse.redirect(new URL('/login', request.url))
  }
  
   
  
}
 
// See "Matching Paths" below to learn more
export const config = {
   //matcher means -- jinn route m ja rh hu usses phle inp middleware run krdo 
  matcher: [
   //middleware work on this path we add
    '/',
    '/login',
    '/signup',
    '/profile',
    '/verfiyEmail'

  ],
}