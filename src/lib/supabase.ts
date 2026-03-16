import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://afcjkbufqhwezmmidqmj.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmY2prYnVmcWh3ZXptbWlkcW1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NjQxNTcsImV4cCI6MjA4OTI0MDE1N30.UxuczDmt8QKuzcir-27_i-JjypgJXaA3bPbjkhdNbq8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]