// Página principal: mapa de pantalla completa + Navbar + filtros + FAB para reportar
import { useState } from 'react'
import { EmergencyMap } from '@/components/map/EmergencyMap'
import { CategoryFilter } from '@/components/map/CategoryFilter'
import { Navbar } from '@/components/layout/Navbar'
import { ReportForm } from '@/components/reports/ReportForm'
import { useReports } from '@/hooks/useReports'
import { useAuth } from '@/hooks/useAuth'
import type { ReportCategory, CreateReportPayload } from '@/types'

interface MapPageProps {
  onOpenAuth: () => void
}

export function MapPage({ onOpenAuth }: MapPageProps) {
  const { user } = useAuth()
  const { reports } = useReports()
  const [activeFilter, setActiveFilter] = useState<ReportCategory | null>(null)
  const [showReportForm, setShowReportForm] = useState(false)
  const [pendingCoords, setPendingCoords] = useState<{ lat: number; lng: number } | null>(null)

  const filteredReports = activeFilter
    ? reports.filter(r => r.category === activeFilter)
    : reports

  function handleMapClick(lat: number, lng: number) {
    // TODO: implementar — si hay sesión abrir ReportForm, si no abrir Auth
    if (!user) { onOpenAuth(); return }
    setPendingCoords({ lat, lng })
    setShowReportForm(true)
  }

  async function handleReportSubmit(_payload: CreateReportPayload) {
    // TODO: implementar — createReport(payload) → cerrar form
  }

  function handleSignOut() {
    // TODO: implementar — signOut()
  }

  return (
    <div className="relative w-screen h-screen bg-brand-night overflow-hidden">
      <Navbar
        user={user}
        reportCount={reports.filter(r => r.is_active).length}
        onOpenAuth={onOpenAuth}
        onSignOut={handleSignOut}
      />

      {/* Mapa ocupa toda la pantalla */}
      <div className="absolute inset-0">
        <EmergencyMap reports={filteredReports} onMapClick={handleMapClick} />
      </div>

      {/* Filtros flotantes sobre el mapa */}
      <div className="absolute bottom-20 left-0 right-0 z-[400] sm:bottom-24">
        <CategoryFilter active={activeFilter} onChange={setActiveFilter} />
      </div>

      {/* FAB — botón para crear reporte */}
      <button
        onClick={() => user ? setShowReportForm(true) : onOpenAuth()}
        className="absolute bottom-6 right-4 z-[400] w-14 h-14 bg-brand-orange hover:bg-brand-orange-dark text-white text-3xl rounded-full shadow-lg flex items-center justify-center transition-colors sm:right-6 sm:bottom-8"
        aria-label="Crear reporte"
      >
        +
      </button>

      {showReportForm && pendingCoords && (
        <ReportForm
          coords={pendingCoords}
          onSubmit={handleReportSubmit}
          onClose={() => { setShowReportForm(false); setPendingCoords(null) }}
        />
      )}
    </div>
  )
}
