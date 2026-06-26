// Formulario de registro con nombre de usuario, email y contraseña
import { useState } from 'react'

interface RegisterFormProps {
  onSuccess: () => void
  onSwitch: () => void
}

export function RegisterForm({ onSuccess, onSwitch }: RegisterFormProps) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    // TODO: implementar — signUp(email, password, username) → onSuccess()
    void onSuccess
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Nombre de usuario"
        required
        maxLength={30}
        className="w-full bg-brand-slate text-white rounded-lg px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-orange"
      />
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
        placeholder="Contraseña (mínimo 6 caracteres)"
        required
        minLength={6}
        className="w-full bg-brand-slate text-white rounded-lg px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-orange"
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {void setError}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {loading ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>
      <button type="button" onClick={onSwitch} className="text-sm text-gray-400 hover:text-white text-center">
        ¿Ya tienes cuenta? Inicia sesión
      </button>
    </form>
  )
}
