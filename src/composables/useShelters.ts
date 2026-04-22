import { ref, computed } from 'vue'
import { shelterService } from '@/services/shelterService'
import { mockShelters } from '@/data/mockShelters'
import type { Shelter, ShelterFilters } from '@/types'

export function useShelters() {
  const shelters = ref<Shelter[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const total = ref(0)

  const stats = computed(() => ({
    total: shelters.value.length,
    available: shelters.value.filter((s) => s.status === 'available').length,
    critical: shelters.value.filter((s) => s.status === 'critical').length,
    full: shelters.value.filter((s) => s.status === 'full').length,
    totalCapacity: shelters.value.reduce((acc, s) => acc + s.capacity, 0),
    totalOccupancy: shelters.value.reduce((acc, s) => acc + s.current_occupancy, 0),
  }))

  async function fetchShelters(filters?: Partial<ShelterFilters>) {
    loading.value = true
    error.value = null

    try {
      const params: Record<string, string> = {}
      if (filters?.search) params.search = filters.search
      if (filters?.status && filters.status !== 'all') params.status = filters.status

      const result = await shelterService.getAll(params)
      shelters.value = result.shelters
      total.value = result.total
    } catch {
      shelters.value = mockShelters
      total.value = mockShelters.length
    } finally {
      loading.value = false
    }
  }

  return { shelters, loading, error, total, stats, fetchShelters }
}

export function useShelter() {
  const shelter = ref<Shelter | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchById(id: number) {
    loading.value = true
    error.value = null

    try {
      shelter.value = await shelterService.getById(id)
    } catch {
      shelter.value = mockShelters.find((s) => s.id === id) ?? null
      if (!shelter.value) error.value = 'Abrigo não encontrado.'
    } finally {
      loading.value = false
    }
  }

  return { shelter, loading, error, fetchById }
}
