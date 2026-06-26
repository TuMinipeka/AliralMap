// Formulario de inicio de sesión con email y contraseña
import { useState } from 'react'

interface LoginFormProps {
  onSuccess: () => void
  onSwitch: () => void
}

export function LoginForm({ onSuccess, onSwitch }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    // TODO: implementar — signIn(email, password) → onSuccess()
    void onSuccess
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Correo electrónico"
        required
        className="w-full bg-brand-slate text-white rounded-lg px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-orange"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
        className="w-full bg-brand-slate text-white rounded-lg px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-orange"
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {/* TODO: mostrar error */}
      {void setError}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {loading ? 'Entrando...' : 'Iniciar sesión'}
      </button>
      <button type="button" onClick={onSwitch} className="text-sm text-gray-400 hover:text-white text-center">
        ¿No tienes cuenta? Regístrate
      </button>
    </form>
  )
}
