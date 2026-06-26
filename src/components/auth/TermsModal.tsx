import { useRef, useState, useEffect } from 'react'

interface TermsModalProps {
  onAccept: () => void
  onCancel: () => void
  loading?: boolean
}

export function TermsModal({ onAccept, onCancel, loading = false }: TermsModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    function check() {
      if (!el) return
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40
      if (atBottom) setHasScrolled(true)
    }
    el.addEventListener('scroll', check)
    check()
    return () => el.removeEventListener('scroll', check)
  }, [])

  return (
    <div className="fixed inset-0 z-[3000] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-brand-night-soft rounded-2xl flex flex-col shadow-2xl border border-white/5 max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 shrink-0">
          <div className="w-9 h-9 bg-brand-orange/15 rounded-xl flex items-center justify-center">
            <span className="text-brand-orange text-lg">📋</span>
          </div>
          <div>
            <h2 className="text-white font-bold text-base">Términos y Condiciones</h2>
            <p className="text-gray-500 text-xs">Lee y acepta para crear tu cuenta</p>
          </div>
        </div>

        {/* Cuerpo scrollable */}
        <div
          ref={scrollRef}
          className="overflow-y-auto flex-1 px-5 py-4 space-y-4 text-sm text-gray-400 leading-relaxed"
        >
          <section>
            <h3 className="text-white font-semibold mb-1">1. Aceptación de los términos</h3>
            <p>
              Al registrarte en <span className="text-brand-orange font-medium">Aliral</span>, aceptas quedar sujeto a los presentes Términos y Condiciones. Si no estás de acuerdo con alguna disposición, no debes utilizar la plataforma.
            </p>
          </section>

          <section>
            <h3 className="text-white font-semibold mb-1">2. Descripción del servicio</h3>
            <p>
              Aliral es una plataforma de reporte ciudadano de emergencias y situaciones de riesgo en tiempo real. Su objetivo es facilitar la comunicación entre ciudadanos y organismos de atención de emergencias.
            </p>
          </section>

          <section>
            <h3 className="text-white font-semibold mb-1">3. Uso responsable</h3>
            <p>
              El usuario se compromete a:
            </p>
            <ul className="list-disc list-inside mt-1 space-y-1 text-gray-500">
              <li>Reportar únicamente situaciones reales y verificables.</li>
              <li>No publicar contenido falso, engañoso o malintencionado.</li>
              <li>No utilizar la plataforma para fines distintos a su propósito.</li>
              <li>Proporcionar datos verídicos al momento del registro.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-white font-semibold mb-1">4. Datos personales</h3>
            <p>
              Los datos recopilados (nombre, documento de identidad, correo electrónico y teléfono) se utilizan exclusivamente para identificar al usuario dentro de la plataforma y mejorar la trazabilidad de los reportes. No serán vendidos ni cedidos a terceros sin tu consentimiento, salvo requerimiento legal.
            </p>
          </section>

          <section>
            <h3 className="text-white font-semibold mb-1">5. Privacidad y geolocalización</h3>
            <p>
              Al crear un reporte, la plataforma puede recopilar tu ubicación aproximada para vincularla al evento reportado. Esta información es visible públicamente en el mapa. Tus datos de perfil son privados y no se muestran a otros usuarios.
            </p>
          </section>

          <section>
            <h3 className="text-white font-semibold mb-1">6. Suspensión de cuenta</h3>
            <p>
              Aliral se reserva el derecho de suspender o eliminar cuentas que incumplan estos términos, realicen reportes falsos reiterados o utilicen la plataforma de manera abusiva.
            </p>
          </section>

          <section>
            <h3 className="text-white font-semibold mb-1">7. Limitación de responsabilidad</h3>
            <p>
              Aliral es una herramienta de reporte ciudadano y no garantiza la respuesta inmediata de organismos de emergencia. Ante una emergencia que ponga en riesgo vidas, contacta primero a los servicios de emergencia oficiales de tu país.
            </p>
          </section>

          <section>
            <h3 className="text-white font-semibold mb-1">8. Modificaciones</h3>
            <p>
              Estos términos pueden actualizarse en cualquier momento. Se notificará a los usuarios registrados ante cambios significativos. El uso continuado de la plataforma implica la aceptación de los nuevos términos.
            </p>
          </section>

          {/* Indicador de scroll */}
          {!hasScrolled && (
            <p className="text-center text-gray-600 text-xs pt-2 animate-pulse">
              ↓ Desplázate para leer todo
            </p>
          )}
        </div>

        {/* Footer con botones */}
        <div className="px-5 py-4 border-t border-white/5 shrink-0 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:text-white bg-brand-slate hover:bg-brand-slate/80 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onAccept}
            disabled={!hasScrolled || loading}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-white bg-brand-orange hover:bg-brand-orange-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creando...
              </span>
            ) : (
              hasScrolled ? 'Acepto y continúo' : 'Lee los términos'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
