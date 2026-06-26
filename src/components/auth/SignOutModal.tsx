interface SignOutModalProps {
  userName: string
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}

export function SignOutModal({ userName, onConfirm, onCancel, loading = false }: SignOutModalProps) {
  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-brand-night-soft rounded-2xl shadow-2xl border border-white/5 overflow-hidden">

        {/* Icono y mensaje */}
        <div className="px-6 pt-6 pb-5 text-center">
          <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔓</span>
          </div>
          <h2 className="text-white font-bold text-lg">¿Cerrar sesión?</h2>
          <p className="text-gray-400 text-sm mt-1">
            Sesión activa como{' '}
            <span className="text-white font-medium">{userName}</span>
          </p>
          <p className="text-gray-600 text-xs mt-3">
            Tendrás que iniciar sesión de nuevo para reportar emergencias.
          </p>
        </div>

        {/* Separador */}
        <div className="h-px bg-white/5 mx-6" />

        {/* Botones */}
        <div className="flex gap-3 p-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-300 hover:text-white bg-brand-slate hover:bg-brand-slate/70 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Cerrando...
              </span>
            ) : 'Cerrar sesión'}
          </button>
        </div>
      </div>
    </div>
  )
}
