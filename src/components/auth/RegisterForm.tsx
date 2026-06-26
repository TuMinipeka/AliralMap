import { useState } from 'react'
import { signUp } from '@/services/auth'
import { TermsModal } from '@/components/auth/TermsModal'

type Field = 'document_number' | 'first_name' | 'last_name' | 'email' | 'phone' | 'password'

const VALIDATORS: Record<Field, (v: string) => string> = {
  document_number: v => {
    if (!v) return 'El número de documento es obligatorio'
    if (!/^[0-9]+$/.test(v)) return 'Solo se permiten dígitos (0-9)'
    if (v.length < 5) return 'Mínimo 5 dígitos'
    if (v.length > 15) return 'Máximo 15 dígitos'
    return ''
  },
  first_name: v => {
    if (!v.trim()) return 'El nombre es obligatorio'
    if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/.test(v.trim())) return 'Solo letras, espacios y guiones'
    if (v.trim().length < 2) return 'Mínimo 2 caracteres'
    return ''
  },
  last_name: v => {
    if (!v.trim()) return 'El apellido es obligatorio'
    if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/.test(v.trim())) return 'Solo letras, espacios y guiones'
    if (v.trim().length < 2) return 'Mínimo 2 caracteres'
    return ''
  },
  email: v => {
    if (!v) return 'El correo electrónico es obligatorio'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Formato inválido, ej: nombre@dominio.com'
    return ''
  },
  phone: v => {
    if (!v) return 'El teléfono es obligatorio'
    const digits = v.replace(/[\s+()\-]/g, '')
    if (!/^[0-9]+$/.test(digits)) return 'Solo números, +, espacios y guiones'
    if (digits.length < 7) return 'Mínimo 7 dígitos'
    if (digits.length > 15) return 'Máximo 15 dígitos'
    return ''
  },
  password: v => {
    if (!v) return 'La contraseña es obligatoria'
    if (v.length < 6) return 'Mínimo 6 caracteres'
    return ''
  },
}

function calcPasswordStrength(pw: string) {
  if (!pw) return null
  let score = 0
  if (pw.length >= 8) score++
  if (pw.length >= 12) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  const levels = [
    { label: 'Muy débil',   bar: 'bg-red-500',    text: 'text-red-400'    },
    { label: 'Débil',       bar: 'bg-orange-400',  text: 'text-orange-400' },
    { label: 'Regular',     bar: 'bg-yellow-400',  text: 'text-yellow-400' },
    { label: 'Fuerte',      bar: 'bg-green-400',   text: 'text-green-400'  },
    { label: 'Muy fuerte',  bar: 'bg-green-500',   text: 'text-green-400'  },
  ]
  const idx = Math.min(score, 4)
  return { score: idx, ...levels[idx] }
}

interface RegisterFormProps {
  onSuccess: () => void
  onSwitch: () => void
}

export function RegisterForm({ onSwitch }: RegisterFormProps) {
  const emptyForm: Record<Field, string> = {
    document_number: '', first_name: '', last_name: '',
    email: '', phone: '', password: '',
  }
  const [form, setForm] = useState(emptyForm)
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Derived — recomputes every render, always fresh
  const errors = Object.fromEntries(
    (Object.keys(VALIDATORS) as Field[]).map(f => [f, VALIDATORS[f](form[f])])
  ) as Record<Field, string>

  const hasErrors = (Object.keys(errors) as Field[]).some(f => errors[f])

  function handleChange(field: Field) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  function handleBlur(field: Field) {
    return () => setTouched(prev => ({ ...prev, [field]: true }))
  }

  function borderClass(field: Field) {
    if (!touched[field]) return 'border-transparent focus:border-brand-orange'
    return errors[field]
      ? 'border-red-500/70 focus:border-red-500'
      : 'border-green-500/40 focus:border-green-500/60'
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Forzar todos los campos como tocados para mostrar errores pendientes
    setTouched(Object.fromEntries((Object.keys(VALIDATORS) as Field[]).map(f => [f, true])))
    if (hasErrors) return
    setServerError(null)
    setShowTerms(true)
  }

  async function handleAcceptTerms() {
    setLoading(true)
    try {
      await signUp(form)
      setShowTerms(false)
      setSuccess(true)
    } catch (err) {
      setShowTerms(false)
      const msg = err instanceof Error ? err.message : 'Error al crear la cuenta'
      setServerError(
        msg.includes('already registered') || msg.includes('User already registered')
          ? 'Este correo ya está registrado'
          : msg
      )
    } finally {
      setLoading(false)
    }
  }

  const pwStrength = calcPasswordStrength(form.password)

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-3xl">✅</div>
        <div>
          <p className="text-white font-semibold text-lg">¡Cuenta creada!</p>
          <p className="text-gray-400 text-sm mt-1">
            Revisa tu correo para confirmar tu cuenta y luego inicia sesión.
          </p>
        </div>
        <button
          onClick={onSwitch}
          className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Ir a iniciar sesión
        </button>
      </div>
    )
  }

  return (
    <>
      {showTerms && (
        <TermsModal
          onAccept={handleAcceptTerms}
          onCancel={() => setShowTerms(false)}
          loading={loading}
        />
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">

        {/* Número de documento */}
        <div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🪪</span>
            <input
              type="text"
              value={form.document_number}
              onChange={handleChange('document_number')}
              onBlur={handleBlur('document_number')}
              placeholder="Número de documento"
              inputMode="numeric"
              className={`w-full bg-brand-slate text-white rounded-xl pl-9 pr-8 py-3 placeholder-gray-500 border focus:outline-none transition-colors ${borderClass('document_number')}`}
            />
            {touched.document_number && (
              <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm ${errors.document_number ? 'text-red-400' : 'text-green-400'}`}>
                {errors.document_number ? '✕' : '✓'}
              </span>
            )}
          </div>
          {touched.document_number && errors.document_number && (
            <p className="text-red-400 text-xs mt-1 pl-1 flex items-center gap-1">⚠ {errors.document_number}</p>
          )}
        </div>

        {/* Nombre y Apellido */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">👤</span>
              <input
                type="text"
                value={form.first_name}
                onChange={handleChange('first_name')}
                onBlur={handleBlur('first_name')}
                placeholder="Nombre"
                className={`w-full bg-brand-slate text-white rounded-xl pl-9 pr-3 py-3 placeholder-gray-500 border focus:outline-none transition-colors ${borderClass('first_name')}`}
              />
            </div>
            {touched.first_name && errors.first_name && (
              <p className="text-red-400 text-xs mt-1 pl-1 flex items-center gap-1">⚠ {errors.first_name}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              value={form.last_name}
              onChange={handleChange('last_name')}
              onBlur={handleBlur('last_name')}
              placeholder="Apellido"
              className={`w-full bg-brand-slate text-white rounded-xl px-4 py-3 placeholder-gray-500 border focus:outline-none transition-colors ${borderClass('last_name')}`}
            />
            {touched.last_name && errors.last_name && (
              <p className="text-red-400 text-xs mt-1 pl-1 flex items-center gap-1">⚠ {errors.last_name}</p>
            )}
          </div>
        </div>

        {/* Correo */}
        <div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">✉</span>
            <input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="Correo electrónico"
              autoComplete="email"
              className={`w-full bg-brand-slate text-white rounded-xl pl-9 pr-8 py-3 placeholder-gray-500 border focus:outline-none transition-colors ${borderClass('email')}`}
            />
            {touched.email && (
              <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm ${errors.email ? 'text-red-400' : 'text-green-400'}`}>
                {errors.email ? '✕' : '✓'}
              </span>
            )}
          </div>
          {touched.email && errors.email && (
            <p className="text-red-400 text-xs mt-1 pl-1 flex items-center gap-1">⚠ {errors.email}</p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">📱</span>
            <input
              type="tel"
              value={form.phone}
              onChange={handleChange('phone')}
              onBlur={handleBlur('phone')}
              placeholder="Teléfono (ej: +57 300 123 4567)"
              inputMode="tel"
              className={`w-full bg-brand-slate text-white rounded-xl pl-9 pr-8 py-3 placeholder-gray-500 border focus:outline-none transition-colors ${borderClass('phone')}`}
            />
            {touched.phone && (
              <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm ${errors.phone ? 'text-red-400' : 'text-green-400'}`}>
                {errors.phone ? '✕' : '✓'}
              </span>
            )}
          </div>
          {touched.phone && errors.phone && (
            <p className="text-red-400 text-xs mt-1 pl-1 flex items-center gap-1">⚠ {errors.phone}</p>
          )}
        </div>

        {/* Contraseña */}
        <div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔒</span>
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
              placeholder="Contraseña (mín. 6 caracteres)"
              autoComplete="new-password"
              className={`w-full bg-brand-slate text-white rounded-xl pl-9 pr-12 py-3 placeholder-gray-500 border focus:outline-none transition-colors ${borderClass('password')}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              {showPassword ? '🙈' : '👁'}
            </button>
          </div>

          {/* Indicador de fuerza */}
          {form.password && pwStrength && (
            <div className="mt-2 px-0.5">
              <div className="flex gap-1 mb-1">
                {[0, 1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= pwStrength.score ? pwStrength.bar : 'bg-brand-slate'}`}
                  />
                ))}
              </div>
              <p className={`text-xs ${pwStrength.text}`}>
                Contraseña {pwStrength.label.toLowerCase()}
                {pwStrength.score < 3 && ' — agrega mayúsculas, números o símbolos'}
              </p>
            </div>
          )}

          {touched.password && errors.password && (
            <p className="text-red-400 text-xs mt-1 pl-1 flex items-center gap-1">⚠ {errors.password}</p>
          )}
        </div>

        {/* Error del servidor */}
        {serverError && (
          <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2">
            <span className="text-red-400 text-xs mt-0.5">⚠</span>
            <p className="text-red-400 text-sm">{serverError}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-3 rounded-xl transition-colors mt-1"
        >
          Crear cuenta
        </button>

        <p className="text-center text-sm text-gray-500">
          ¿Ya tienes cuenta?{' '}
          <button
            type="button"
            onClick={onSwitch}
            className="text-brand-orange hover:text-brand-orange-dark font-medium transition-colors"
          >
            Inicia sesión
          </button>
        </p>
      </form>
    </>
  )
}
