// Hook de sesión: expone user, loading y helpers de auth con listener en tiempo real
import { useState, useEffect } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/services/supabase'

interface UseAuthReturn {
  user: User | null
  loading: boolean
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: implementar — supabase.auth.getSession() + onAuthStateChange listener
    void setUser
    setLoading(false)
    return () => {
      // TODO: cleanup del listener
    }
  }, [])

  // Evitar warning de import no utilizado durante desarrollo
  void supabase

  return { user, loading }
}
