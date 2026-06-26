// Capa de acceso a datos de autenticación — signUp, signIn, signOut, getCurrentUser
import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

export async function signUp(
  _email: string,
  _password: string,
  _username: string,
): Promise<User> {
  // TODO: implementar
  throw new Error('Not implemented')
}

export async function signIn(
  _email: string,
  _password: string,
): Promise<User> {
  // TODO: implementar
  throw new Error('Not implemented')
}

export async function signOut(): Promise<void> {
  // TODO: implementar
}

export async function getCurrentUser(): Promise<User | null> {
  // TODO: implementar
  return null
}

// Evitar warning de import no utilizado durante desarrollo
void supabase
