// Overlay de autenticación: alterna entre LoginForm y RegisterForm
import { useState } from 'react'
import { LoginForm } from '@/components/auth/LoginForm'
import { RegisterForm } from '@/components/auth/RegisterForm'

interface AuthPageProps {
  onSuccess: () => void
  onClose: () => void
}

export function AuthPage({ onSuccess, onClose }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login')

  return (
    <div className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-brand-night-soft rounded-t-2xl sm:rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-brand-orange font-bold text-xl">Aliral</h1>
            <p className="text-gray-400 text-sm">
              {mode === 'login' ? 'Inicia sesión para reportar' : 'Crea tu cuenta gratuita'}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
        </div>

        {mode === 'login' ? (
          <LoginForm onSuccess={onSuccess} onSwitch={() => setMode('register')} />
        ) : (
          <RegisterForm onSuccess={onSuccess} onSwitch={() => setMode('login')} />
        )}
      </div>
    </div>
  )
}
