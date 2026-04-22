export type ShelterStatus = 'available' | 'critical' | 'full'

export interface Shelter {
  id: number
  name: string
  address: string
  city: string
  state: string
  phone: string
  capacity: number
  current_occupancy: number
  status: ShelterStatus
  accepts_pets: boolean
  accepts_elderly: boolean
  accepts_disabled: boolean
  needs: string[]
  coordinator_name: string
  coordinator_phone: string
  created_at: string
  updated_at: string
}

export interface ShelterFormData {
  name: string
  address: string
  city: string
  state: string
  phone: string
  capacity: number | ''
  current_occupancy: number | ''
  accepts_pets: boolean
  accepts_elderly: boolean
  accepts_disabled: boolean
  needs: string[]
  coordinator_name: string
  coordinator_phone: string
}

export type ShelterFilterStatus = ShelterStatus | 'all'

export interface ShelterFilters {
  search: string
  status: ShelterFilterStatus
  accepts_pets: boolean | null
  accepts_elderly: boolean | null
  accepts_disabled: boolean | null
}

export interface ShelterListResponse {
  shelters: Shelter[]
  total: number
}
