// Metadatos de categorías de reporte + coordenadas por defecto de Bucaramanga
import type { ReportCategory } from '@/types'

interface CategoryMeta {
  label: string
  emoji: string
  color: string
  tailwind: string
}

export const CATEGORY_META: Record<ReportCategory, CategoryMeta> = {
  food: {
    label: 'Alimentos',
    emoji: '🍱',
    color: '#22c55e',
    tailwind: 'bg-green-500',
  },
  water: {
    label: 'Agua',
    emoji: '💧',
    color: '#3b82f6',
    tailwind: 'bg-blue-500',
  },
  shelter: {
    label: 'Refugio',
    emoji: '🏠',
    color: '#a855f7',
    tailwind: 'bg-purple-500',
  },
  medical: {
    label: 'Médico',
    emoji: '🏥',
    color: '#ec4899',
    tailwind: 'bg-pink-500',
  },
  danger: {
    label: 'Peligro',
    emoji: '⚠️',
    color: '#eab308',
    tailwind: 'bg-yellow-500',
  },
  road: {
    label: 'Vía bloqueada',
    emoji: '🚧',
    color: '#f97316',
    tailwind: 'bg-orange-500',
  },
  rescue: {
    label: 'Rescate',
    emoji: '🚁',
    color: '#06b6d4',
    tailwind: 'bg-cyan-500',
  },
  sos: {
    label: 'SOS',
    emoji: '🆘',
    color: '#ef4444',
    tailwind: 'bg-red-500',
  },
}

export const DEFAULT_CENTER: [number, number] = [7.1193, -73.1227] // Bucaramanga
export const DEFAULT_ZOOM = 13
