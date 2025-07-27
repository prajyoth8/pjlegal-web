import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

export function createClient(request?: NextRequest) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          if (request) {
            // Middleware case - synchronous
            return request.cookies.get(name)?.value
          } else {
            // Server Components case - asynchronous
            const cookieStore = await cookies()
            return cookieStore.get(name)?.value
          }
        },
        async set(name: string, value: string, options: CookieOptions) {
          if (request) {
            // Middleware case - synchronous
            request.cookies.set({
              name,
              value,
              ...options
            })
            return NextResponse.next({
              request: {
                headers: request.headers
              }
            })
          } else {
            // Server Components case - asynchronous
            const cookieStore = await cookies()
            cookieStore.set({
              name,
              value,
              ...options
            })
          }
        },
        async remove(name: string, options: CookieOptions) {
          if (request) {
            // Middleware case - synchronous
            request.cookies.set({
              name,
              value: '',
              ...options
            })
            return NextResponse.next({
              request: {
                headers: request.headers
              }
            })
          } else {
            // Server Components case - asynchronous
            const cookieStore = await cookies()
            cookieStore.set({
              name,
              value: '',
              ...options
            })
          }
        }
      }
    }
  )
}