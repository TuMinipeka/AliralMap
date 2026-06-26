// Capa de acceso a datos de reportes — getActiveReports, createReport, confirmReport
import { supabase } from './supabase'
import type { Report, CreateReportPayload } from '@/types'

export async function getActiveReports(): Promise<Report[]> {
  // TODO: implementar — SELECT * FROM reports WHERE is_active = true
  return []
}

export async function createReport(
  _payload: CreateReportPayload,
): Promise<Report> {
  // TODO: implementar — INSERT INTO reports
  throw new Error('Not implemented')
}

export async function confirmReport(_reportId: string): Promise<void> {
  // TODO: implementar — RPC increment_confirmations(report_id)
}

// Evitar warning de import no utilizado durante desarrollo
void supabase
