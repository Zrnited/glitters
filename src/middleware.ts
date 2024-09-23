import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// export function middleware2(request: NextRequest) {
//   // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
//   // Getting cookies from the request using the `RequestCookies` API
//   let cookie = request.cookies.get('nextjs')
//   console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }
//   const allCookies = request.cookies.getAll()
//   console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]
 
//   request.cookies.has('nextjs') // => true
//   request.cookies.delete('nextjs')
//   request.cookies.has('nextjs') // => false
 
//   // Setting cookies on the response using the `ResponseCookies` API
//   const response = NextResponse.next()
//   response.cookies.set('vercel', 'fast')
//   response.cookies.set({
//     name: 'vercel',
//     value: 'fast',
//     path: '/',
//   })
//   cookie = response.cookies.get('vercel')
//   console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/' }
//   // The outgoing response will have a `Set-Cookie:vercel=fast;path=/` header.
 
//   return response
// }

export function middleware(request: NextRequest){

  //in a real-world scenario, tokens are used and gotten from cookies
  const userToken = request.cookies.get("userToken")?.value;


  // console.log("middleware working!");
  const {pathname, searchParams} = request.nextUrl
  //defining public paths

  const publicPaths = [
    "/",
    "/product",
    "/signin",
    "/signup",
    "/product/:path*"
  ];

  const isPublicPath = publicPaths.some((path) =>
    new RegExp(path).test(pathname)
  );

  //allowing access to home page
  if(pathname === "/"){
    return NextResponse.next();
  }

  // checks if a user isn't logged in before trying to access the cart page and then redirects to login
  if(!userToken && pathname === '/cart'){
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}