import { MapPage } from '@/pages/MapPage'
import { AuthPage } from '@/pages/AuthPage'
import { useAuth } from '@/hooks/useAuth'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-brand-night">
        <LoadingSpinner text="Iniciando Aliral..." />
      </div>
    )
  }

  if (!user) {
    return <AuthPage onSuccess={() => {}} />
  }

  return <MapPage onOpenAuth={() => {}} />
}
