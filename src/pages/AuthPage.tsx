import { useState } from 'react'
import { LoginForm } from '@/components/auth/LoginForm'
import { RegisterForm } from '@/components/auth/RegisterForm'

interface AuthPageProps {
  onSuccess: () => void
}

export function AuthPage({ onSuccess }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login')

  return (
    <div className="min-h-screen bg-brand-night flex flex-col items-center justify-center p-4">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo y tagline */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-orange rounded-2xl mb-4 shadow-lg shadow-brand-orange/30">
            <span className="text-white text-2xl font-black">A</span>
          </div>
          <h1 className="text-white text-3xl font-black tracking-tight">Aliral</h1>
          <p className="text-gray-500 text-sm mt-1">Reportes de emergencia en tiempo real</p>
        </div>

        {/* Card */}
        <div className="bg-brand-night-soft rounded-2xl p-6 shadow-2xl border border-white/5">
          {/* Tabs */}
          <div className="flex bg-brand-slate rounded-xl p-1 mb-6">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Formulario activo */}
          {mode === 'login' ? (
            <LoginForm onSuccess={onSuccess} onSwitch={() => setMode('register')} />
          ) : (
            <RegisterForm onSuccess={onSuccess} onSwitch={() => setMode('login')} />
          )}
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Al continuar aceptas nuestros términos de uso y política de privacidad
        </p>
      </div>
    </div>
  )
}
