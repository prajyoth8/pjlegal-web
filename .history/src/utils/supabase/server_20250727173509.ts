import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

export function createClient(request?: NextRequest) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          if (request) {
            // Handle middleware case
            return request.cookies.get(name)?.value
          } else {
            // Handle server components case
            const cookieStore = cookies()
            return cookieStore.get(name)?.value
          }
        },
        set(name: string, value: string, options: CookieOptions) {
          if (request) {
            // Handle middleware case
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
            // Handle server components case
            const cookieStore = cookies()
            cookieStore.set({
              name,
              value,
              ...options
            })
          }
        },
        remove(name: string, options: CookieOptions) {
          if (request) {
            // Handle middleware case
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
            // Handle server components case
            const cookieStore = cookies()
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