// Modal para crear un nuevo reporte con categoría, título y ubicación GPS
import { useState } from 'react'
import type { ReportCategory, CreateReportPayload } from '@/types'
import { CATEGORY_META } from '@/constants/categories'

interface ReportFormProps {
  coords: { lat: number; lng: number }
  onSubmit: (payload: CreateReportPayload) => Promise<void>
  onClose: () => void
}

export function ReportForm({ coords, onSubmit, onClose }: ReportFormProps) {
  const [category, setCategory] = useState<ReportCategory>('sos')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    // TODO: implementar — llamar onSubmit({ category, title, description, ...coords })
    void onSubmit
    void coords
    setSubmitting(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-brand-night-soft rounded-t-2xl sm:rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-lg">Nuevo reporte</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Categoría */}
          <div className="grid grid-cols-4 gap-2">
            {(Object.entries(CATEGORY_META) as [ReportCategory, typeof CATEGORY_META[ReportCategory]][]).map(([key, meta]) => (
              <button
                key={key}
                type="button"
                onClick={() => setCategory(key)}
                className={`flex flex-col items-center p-2 rounded-xl text-xs transition-colors ${
                  category === key
                    ? 'bg-brand-orange text-white'
                    : 'bg-brand-slate text-gray-300'
                }`}
              >
                <span className="text-xl">{meta.emoji}</span>
                <span>{meta.label}</span>
              </button>
            ))}
          </div>

          {/* Título */}
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Título del reporte *"
            required
            maxLength={80}
            className="w-full bg-brand-slate text-white rounded-lg px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />

          {/* Descripción */}
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descripción opcional..."
            rows={3}
            maxLength={300}
            className="w-full bg-brand-slate text-white rounded-lg px-3 py-2 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />

          <button
            type="submit"
            disabled={submitting || !title.trim()}
            className="w-full bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {submitting ? 'Publicando...' : 'Publicar reporte'}
          </button>
        </form>
      </div>
    </div>
  )
}
