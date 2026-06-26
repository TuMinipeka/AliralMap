// Barra horizontal de filtros por categoría con scroll sin scrollbar
import type { ReportCategory } from '@/types'
import { CATEGORY_META } from '@/constants/categories'

interface CategoryFilterProps {
  active: ReportCategory | null
  onChange: (cat: ReportCategory | null) => void
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  const categories = Object.entries(CATEGORY_META) as [ReportCategory, (typeof CATEGORY_META)[ReportCategory]][]

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-2 sm:px-6">
      <button
        onClick={() => onChange(null)}
        className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          active === null
            ? 'bg-brand-orange text-white'
            : 'bg-brand-slate text-gray-300 hover:bg-brand-slate/70'
        }`}
      >
        Todos
      </button>
      {categories.map(([key, meta]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex-shrink-0 flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            active === key
              ? 'bg-brand-orange text-white'
              : 'bg-brand-slate text-gray-300 hover:bg-brand-slate/70'
          }`}
        >
          <span>{meta.emoji}</span>
          <span className="hidden sm:inline">{meta.label}</span>
        </button>
      ))}
    </div>
  )
}
