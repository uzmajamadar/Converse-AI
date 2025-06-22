import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: [
    "/favicon.ico",
    "/",
    "/auth(.*)",
    "/portal(.*)",
    "/images(.*)",
    "/.well-known/appspecific/com.chrome.devtools.json" ,
    "/dashboard",
    
  ],
  ignoredRoutes: ["/chatbot",
    "/.well-known/appspecific/com.chrome.devtools.json"
  ],
  
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}