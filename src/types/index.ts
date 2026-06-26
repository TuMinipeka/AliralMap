// Tipos globales del dominio Aliral

export type ReportCategory =
  | 'food'
  | 'water'
  | 'shelter'
  | 'medical'
  | 'danger'
  | 'road'
  | 'rescue'
  | 'sos'

export interface Report {
  id: string
  user_id: string | null
  category: ReportCategory
  title: string
  description: string | null
  latitude: number
  longitude: number
  is_active: boolean
  confirmations: number
  created_at: string
}

export interface CreateReportPayload {
  category: ReportCategory
  title: string
  description?: string
  latitude: number
  longitude: number
}

export interface UserProfile {
  id: string
  username: string | null
  created_at: string
}
