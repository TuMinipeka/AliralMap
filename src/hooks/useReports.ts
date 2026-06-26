// Hook de reportes: carga inicial + suscripción Realtime Supabase + geolocalización
import { useState, useEffect } from 'react'
import type { Report } from '@/types'

interface UseReportsReturn {
  reports: Report[]
  loading: boolean
  error: string | null
}

export function useReports(): UseReportsReturn {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // TODO: implementar — getActiveReports() + suscripción Realtime al canal 'reports'
    setLoading(false)
    return () => {
      // TODO: cleanup — supabase.removeChannel()
    }
  }, [])

  // Evitar warning de import no utilizado durante desarrollo
  void setReports
  void setError

  return { reports, loading, error }
}

export function useGeolocation() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [geoError, setGeoError] = useState<string | null>(null)

  useEffect(() => {
    // TODO: implementar — navigator.geolocation.getCurrentPosition
    void setCoords
    void setGeoError
  }, [])

  return { coords, geoError }
}
