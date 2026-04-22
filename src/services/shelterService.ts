import { api } from './api'
import type { Shelter, ShelterFormData, ShelterListResponse } from '@/types'

export const shelterService = {
  getAll(params?: Record<string, string>) {
    const query = params && Object.keys(params).length ? `?${new URLSearchParams(params)}` : ''
    return api.get<ShelterListResponse>(`/api/shelters${query}`)
  },

  getById(id: number) {
    return api.get<Shelter>(`/api/shelters/${id}`)
  },

  create(data: ShelterFormData) {
    return api.post<Shelter>('/api/shelters', data)
  },

  update(id: number, data: Partial<ShelterFormData>) {
    return api.patch<Shelter>(`/api/shelters/${id}`, data)
  },
}
