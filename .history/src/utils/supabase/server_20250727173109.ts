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
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          if (request) {
            request.cookies.set({ name, value, ...options })
          } else {
            cookieStore.set({ name, value, ...options })
          }
        },
        remove(name: string, options: CookieOptions) {
          if (request) {
            request.cookies.set({ name, value: '', ...options })
          } else {
            cookieStore.set({ name, value: '', ...options })
          }
        },
      },
    }
  )
}