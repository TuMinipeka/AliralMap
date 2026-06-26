import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

export interface SignUpData {
  document_number: string
  first_name: string
  last_name: string
  email: string
  phone: string
  password: string
}

export async function signUp(data: SignUpData): Promise<User> {
  const { data: result, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        document_number: data.document_number,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        full_name: `${data.first_name} ${data.last_name}`,
      },
    },
  })
  if (error) throw error
  if (!result.user) throw new Error('No se pudo crear la cuenta')
  return result.user
}

export async function signIn(email: string, password: string): Promise<User> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  if (!data.user) throw new Error('Usuario no encontrado')
  return data.user
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser(): Promise<User | null> {
  const { data } = await supabase.auth.getUser()
  return data.user
}
