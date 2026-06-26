import type { User } from '@supabase/supabase-js'

interface NavbarProps {
  user: User | null
  reportCount: number
  onOpenAuth: () => void
  onSignOut: () => void
}

export function Navbar({ user, reportCount, onOpenAuth, onSignOut }: NavbarProps) {
  const firstName = user?.user_metadata?.first_name as string | undefined
  const email = user?.email ?? ''
  const displayName = firstName ?? email.split('@')[0]

  return (
    <nav className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-4 py-2.5 bg-brand-night-soft/90 backdrop-blur-sm border-b border-white/5 sm:px-6">
      {/* Logo + contador */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-8 h-8 bg-brand-orange rounded-lg">
          <span className="text-white text-sm font-black">A</span>
        </div>
        <span className="text-white font-bold text-lg tracking-tight">Aliral</span>
        <span className="text-xs text-gray-400 bg-brand-slate px-2 py-0.5 rounded-full">
          {reportCount} activos
        </span>
      </div>

      {/* Sesión */}
      {user ? (
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-white text-sm font-medium leading-tight">{displayName}</span>
            <span className="text-gray-500 text-xs leading-tight">{email}</span>
          </div>
          <div className="w-8 h-8 bg-brand-orange/20 rounded-full flex items-center justify-center">
            <span className="text-brand-orange text-sm font-bold">
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
          <button
            onClick={onSignOut}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-400 transition-colors"
            title="Cerrar sesión"
          >
            <span className="hidden sm:inline">Salir</span>
            <span>⏏</span>
          </button>
        </div>
      ) : (
        <button
          onClick={onOpenAuth}
          className="text-sm bg-brand-orange hover:bg-brand-orange-dark text-white px-4 py-1.5 rounded-lg font-medium transition-colors"
        >
          Entrar
        </button>
      )}
    </nav>
  )
}
