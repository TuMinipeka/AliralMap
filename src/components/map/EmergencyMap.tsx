// Mapa Leaflet con markers de reportes activos — centro inicial en Bucaramanga
import { MapContainer, TileLayer } from 'react-leaflet'
import type { Report } from '@/types'
import { DEFAULT_CENTER, DEFAULT_ZOOM } from '@/constants/categories'

interface EmergencyMapProps {
  reports: Report[]
  onMapClick?: (lat: number, lng: number) => void
}

export function EmergencyMap({ reports, onMapClick }: EmergencyMapProps) {
  // TODO: implementar markers con icono por categoría (CATEGORY_META[report.category].emoji)
  // TODO: implementar click handler para geolocalización manual
  // TODO: implementar Popup con título, categoría, confirmaciones y timeAgo

  void onMapClick
  void reports

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      className="w-full h-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* TODO: renderizar markers con react-leaflet Marker + Popup */}
    </MapContainer>
  )
}
