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
  document_number: string
  first_name: string
  last_name: string
  phone: string
  email: string
  created_at: string
}
