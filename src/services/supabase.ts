// Inicialización única del cliente Supabase — importar desde aquí en toda la app
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltan variables de entorno VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY.\n' +
    'Crea un archivo .env en la raíz del proyecto. Ver .env.example'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
