import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

export function createClient(request?: NextRequest) {
  const cookieStore = request ? request.cookies : cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          if (request) {
            // For NextRequest
            return request.cookies.get(name)?.value
          } else {
            // For server components
            return cookieStore.get(name)?.value
          }
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            if (request) {
              // For NextRequest in middleware
              request.cookies.set({
                name,
                value,
                ...options
              })
            } else {
              // For server components
              cookieStore.set({
                name,
                value,
                ...options
              })
            }
          } catch (error) {
            // Handle error if needed
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            if (request) {
              // For NextRequest in middleware
              request.cookies.set({
                name,
                value: '',
                ...options
              })
            } else {
              // For server components
              cookieStore.set({
                name,
                value: '',
                ...options
              })
            }
          } catch (error) {
            // Handle error if needed
          }
        },
      },
    }
  )
}