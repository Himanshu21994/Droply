// Ye file Clerk authentication ko Next.js ke routes pe apply karti hai, taki protected routes pe user ki identity check ho sake!
import { clerkMiddleware, createRouteMatcher, auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/dist/server/web/spec-extension/response'

// Ye function batata hai ki kaunse pages sabke liye open hain—login/signup ya home page, jahan authentication mandatory nahi hai!
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
])

export default clerkMiddleware( async (auth, request) => {
    const user = auth()
    const userId =  (await user).userId
    const url = new URL(request.url)

    if( userId && isPublicRoute(request) && url.pathname !== "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Protect non-public routes by enforcing authentication
    // Ye line ensure karti hai ki protected pages pe bina login ke koi nahi ja sakta!
    if (!isPublicRoute(request)) {
      await auth.protect()
    }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}