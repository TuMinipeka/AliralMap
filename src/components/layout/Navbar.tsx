// Barra superior: logo Aliral, contador de reportes activos y estado de sesión
import type { User } from '@supabase/supabase-js'

interface NavbarProps {
  user: User | null
  reportCount: number
  onOpenAuth: () => void
  onSignOut: () => void
}

export function Navbar({ user, reportCount, onOpenAuth, onSignOut }: NavbarProps) {
  // TODO: implementar UI — logo + contador + botón login/logout

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 bg-brand-night-soft/90 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-2">
        {/* TODO: SVG logo */}
        <span className="text-brand-orange font-bold text-lg sm:text-xl">Aliral</span>
        <span className="text-xs text-gray-400 bg-brand-slate px-2 py-0.5 rounded-full">
          {reportCount} activos
        </span>
      </div>
      <div>
        {user ? (
          <button
            onClick={onSignOut}
            className="text-sm text-gray-300 hover:text-white sm:text-base"
          >
            {/* TODO: implementar */}
            Salir
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="text-sm bg-brand-orange hover:bg-brand-orange-dark text-white px-3 py-1 rounded-lg sm:text-base"
          >
            Entrar
          </button>
        )}
      </div>
    </nav>
  )
}
