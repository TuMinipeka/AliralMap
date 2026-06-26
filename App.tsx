/**
 * App.tsx — Punto de entrada de la aplicación
 * Maneja el estado global de autenticación y controla
 * qué overlay/modal está visible.
 */
import { useState } from 'react'
import { MapPage } from '@/pages/MapPage'
import { AuthPage } from '@/pages/AuthPage'
import { useAuth } from '@/hooks/useAuth'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function App() {
  const { loading } = useAuth()
  const [showAuth, setShowAuth] = useState(false)

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-brand-night">
        <LoadingSpinner text="Iniciando Aliral..." />
      </div>
    )
  }

  return (
    <>
      <MapPage onOpenAuth={() => setShowAuth(true)} />
      {showAuth && (
        <AuthPage
          onSuccess={() => setShowAuth(false)}
          onClose={() => setShowAuth(false)}
        />
      )}
    </>
  )
}
