import { useState } from 'react'
import { signIn } from '@/services/auth'

interface LoginFormProps {
  onSuccess: () => void
  onSwitch: () => void
}

export function LoginForm({ onSuccess, onSwitch }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await signIn(email, password)
      onSuccess()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al iniciar sesión'
      if (msg.includes('Invalid login credentials')) {
        setError('Correo o contraseña incorrectos')
      } else if (msg.includes('Email not confirmed')) {
        setError('Debes confirmar tu correo antes de ingresar')
      } else {
        setError(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">✉</span>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
          autoComplete="email"
          className="w-full bg-brand-slate text-white rounded-xl pl-9 pr-4 py-3 placeholder-gray-500 border border-transparent focus:outline-none focus:border-brand-orange transition-colors"
        />
      </div>

      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔒</span>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          autoComplete="current-password"
          className="w-full bg-brand-slate text-white rounded-xl pl-9 pr-12 py-3 placeholder-gray-500 border border-transparent focus:outline-none focus:border-brand-orange transition-colors"
        />
        <button
          type="button"
          onClick={() => setShowPassword(v => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-sm transition-colors"
        >
          {showPassword ? '🙈' : '👁'}
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2">
          <span className="text-red-400 text-xs mt-0.5">⚠</span>
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors mt-1"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Verificando...
          </span>
        ) : 'Iniciar sesión'}
      </button>

      <p className="text-center text-sm text-gray-500">
        ¿No tienes cuenta?{' '}
        <button type="button" onClick={onSwitch} className="text-brand-orange hover:text-brand-orange-dark font-medium transition-colors">
          Regístrate gratis
        </button>
      </p>
    </form>
  )
}
