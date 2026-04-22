<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { shelterService } from '@/services/shelterService'
import type { ShelterFormData } from '@/types'

const router = useRouter()

const form = reactive<ShelterFormData>({
  name: '',
  address: '',
  city: '',
  state: '',
  phone: '',
  capacity: '',
  current_occupancy: '',
  accepts_pets: false,
  accepts_elderly: false,
  accepts_disabled: false,
  needs: [],
  coordinator_name: '',
  coordinator_phone: '',
})

const needInput = ref('')
const submitting = ref(false)
const submitError = ref<string | null>(null)
const submitted = ref(false)

const errors = reactive<Partial<Record<keyof ShelterFormData | 'form', string>>>({})

const STATES = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]

function addNeed() {
  const trimmed = needInput.value.trim()
  if (trimmed && !form.needs.includes(trimmed)) {
    form.needs.push(trimmed)
    needInput.value = ''
  }
}

function removeNeed(index: number) {
  form.needs.splice(index, 1)
}

function handleNeedKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault()
    addNeed()
  }
}

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k as keyof typeof errors])
  let valid = true

  if (!form.name.trim()) {
    errors.name = 'Nome é obrigatório.'
    valid = false
  }
  if (!form.address.trim()) {
    errors.address = 'Endereço é obrigatório.'
    valid = false
  }
  if (!form.city.trim()) {
    errors.city = 'Cidade é obrigatória.'
    valid = false
  }
  if (!form.state) {
    errors.state = 'Estado é obrigatório.'
    valid = false
  }
  if (!form.phone.trim()) {
    errors.phone = 'Telefone é obrigatório.'
    valid = false
  }

  const cap = Number(form.capacity)
  const occ = Number(form.current_occupancy)
  if (!form.capacity || cap <= 0) {
    errors.capacity = 'Capacidade deve ser maior que zero.'
    valid = false
  }
  if (form.current_occupancy === '' || occ < 0) {
    errors.current_occupancy = 'Ocupação inválida.'
    valid = false
  }
  if (cap > 0 && occ > cap) {
    errors.current_occupancy = 'Ocupação não pode superar a capacidade.'
    valid = false
  }

  if (!form.coordinator_name.trim()) {
    errors.coordinator_name = 'Nome do coordenador é obrigatório.'
    valid = false
  }
  if (!form.coordinator_phone.trim()) {
    errors.coordinator_phone = 'Telefone do coordenador é obrigatório.'
    valid = false
  }

  return valid
}

async function handleSubmit() {
  if (!validate()) return

  submitting.value = true
  submitError.value = null

  try {
    await shelterService.create(form)
    submitted.value = true
  } catch {
    submitError.value =
      'Não foi possível cadastrar o abrigo. Verifique sua conexão e tente novamente.'
  } finally {
    submitting.value = false
  }
}

function goToShelters() {
  router.push('/abrigos')
}
</script>

<template>
  <main id="main-content" tabindex="-1" class="mx-auto max-w-2xl px-4 py-8 sm:px-6">
    <RouterLink
      to="/abrigos"
      class="mb-6 inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800  focus-visible:underline"
    >
      ← Voltar para abrigos
    </RouterLink>

    <div
      v-if="submitted"
      class="rounded-xl outline outline-emerald-200 bg-emerald-50 p-8 text-center"
      role="alert"
      aria-live="assertive"
    >
      <p class="text-5xl" aria-hidden="true">✅</p>
      <h2 class="mt-4 text-xl font-bold text-emerald-900">Abrigo cadastrado com sucesso!</h2>
      <p class="mt-2 text-sm text-emerald-700">
        As informações já estão disponíveis para quem precisa de ajuda.
      </p>
      <button
        class="mt-6 rounded-lg bg-emerald-700 px-6 py-2.5 font-medium text-white hover:bg-emerald-800  focus-visible:ring-2 focus-visible:ring-emerald-700 cursor-pointer"
        @click="goToShelters"
      >
        Ver todos os abrigos
      </button>
    </div>

    <div v-else>
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-slate-900">Cadastrar abrigo</h1>
        <p class="mt-1 text-slate-500">
          Preencha as informações do abrigo para que pessoas afetadas possam encontrá-lo.
        </p>
      </div>

      <form
        novalidate
        class="space-y-6"
        aria-label="Formulário de cadastro de abrigo"
        @submit.prevent="handleSubmit"
      >
        <div
          v-if="submitError"
          class="rounded-lg outline outline-rose-200 bg-rose-50 p-4 text-sm text-rose-800"
          role="alert"
          aria-live="assertive"
        >
          {{ submitError }}
        </div>

        <fieldset class="rounded-xl outline outline-slate-200 bg-white p-5 shadow-sm">
          <legend class="mb-4 font-semibold text-slate-900">Informações básicas</legend>

          <div class="space-y-4">
            <div>
              <label for="name" class="mb-1 block text-sm font-medium text-slate-700">
                Nome do abrigo <span class="text-rose-500" aria-hidden="true">*</span>
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                autocomplete="organization"
                :class="[
                  'w-full rounded-lg outline px-3 py-2.5 text-sm transition  focus:ring-2',
                  errors.name
                    ? 'outline-rose-400 focus:ring-rose-400/30'
                    : 'outline-slate-300 focus:outline-blue-700 focus:ring-blue-500/30',
                ]"
                :aria-invalid="!!errors.name"
                :aria-describedby="errors.name ? 'name-error' : undefined"
                required
              />
              <p v-if="errors.name" id="name-error" class="mt-1 text-xs text-rose-600" role="alert">
                {{ errors.name }}
              </p>
            </div>

            <div>
              <label for="address" class="mb-1 block text-sm font-medium text-slate-700">
                Endereço completo <span class="text-rose-500" aria-hidden="true">*</span>
              </label>
              <input
                id="address"
                v-model="form.address"
                type="text"
                autocomplete="street-address"
                :class="[
                  'w-full rounded-lg outline px-3 py-2.5 text-sm transition  focus:ring-2',
                  errors.address
                    ? 'outline-rose-400 focus:ring-rose-400/30'
                    : 'outline-slate-300 focus:outline-blue-700 focus:ring-blue-500/30',
                ]"
                :aria-invalid="!!errors.address"
                :aria-describedby="errors.address ? 'address-error' : undefined"
                required
              />
              <p
                v-if="errors.address"
                id="address-error"
                class="mt-1 text-xs text-rose-600"
                role="alert"
              >
                {{ errors.address }}
              </p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="city" class="mb-1 block text-sm font-medium text-slate-700">
                  Cidade <span class="text-rose-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="city"
                  v-model="form.city"
                  type="text"
                  autocomplete="address-level2"
                  :class="[
                    'w-full rounded-lg outline px-3 py-2.5 text-sm transition focus:ring-2',
                    errors.city
                      ? 'outline-rose-400 focus:ring-rose-400/30'
                      : 'outline-slate-300 focus:outline-blue-700 focus:ring-blue-500/30',
                  ]"
                  :aria-invalid="!!errors.city"
                  required
                />
                <p v-if="errors.city" class="mt-1 text-xs text-rose-600" role="alert">
                  {{ errors.city }}
                </p>
              </div>
              <div>
                <label for="state" class="mb-1 block text-sm font-medium text-slate-700">
                  Estado <span class="text-rose-500" aria-hidden="true">*</span>
                </label>
                <select
                  id="state"
                  v-model="form.state"
                  :class="[
                    'w-full rounded-lg outline px-2 py-2.5 text-sm transition focus:ring-2',
                    errors.state
                      ? 'outline-rose-400 focus:ring-rose-400/30'
                      : 'outline-slate-300 focus:outline-blue-700 focus:ring-blue-500/30',
                  ]"
                  :aria-invalid="!!errors.state"
                  required
                >
                  <option value="" disabled>Selecione</option>
                  <option v-for="s in STATES" :key="s" :value="s">{{ s }}</option>
                </select>
                <p v-if="errors.state" class="mt-1 text-xs text-rose-600" role="alert">
                  {{ errors.state }}
                </p>
              </div>
            </div>

            <div>
              <label for="phone" class="mb-1 block text-sm font-medium text-slate-700">
                Telefone do abrigo <span class="text-rose-500" aria-hidden="true">*</span>
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                autocomplete="tel"
                placeholder="(XX) XXXX-XXXX"
                :class="[
                  'w-full rounded-lg outline px-3 py-2.5 text-sm transition  focus:ring-2',
                  errors.phone
                    ? 'outline-rose-400 focus:ring-rose-400/30'
                    : 'outline-slate-300 focus:outline-blue-700 focus:ring-blue-500/30',
                ]"
                :aria-invalid="!!errors.phone"
                required
              />
              <p v-if="errors.phone" class="mt-1 text-xs text-rose-600" role="alert">
                {{ errors.phone }}
              </p>
            </div>
          </div>
        </fieldset>

        <fieldset class="rounded-xl outline outline-slate-200 bg-white p-5 shadow-sm">
          <legend class="mb-4 font-semibold text-slate-900">Capacidade e ocupação</legend>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="capacity" class="mb-1 block text-sm font-medium text-slate-700">
                Capacidade total <span class="text-rose-500" aria-hidden="true">*</span>
              </label>
              <input
                id="capacity"
                v-model.number="form.capacity"
                type="number"
                min="1"
                :class="[
                  'w-full rounded-lg outline px-3 py-2.5 text-sm transition  focus:ring-2',
                  errors.capacity
                    ? 'outline-rose-400 focus:ring-rose-400/30'
                    : 'outline-slate-300 focus:outline-blue-700 focus:ring-blue-500/30',
                ]"
                :aria-invalid="!!errors.capacity"
                required
              />
              <p v-if="errors.capacity" class="mt-1 text-xs text-rose-600" role="alert">
                {{ errors.capacity }}
              </p>
            </div>
            <div>
              <label for="current_occupancy" class="mb-1 block text-sm font-medium text-slate-700">
                Ocupação atual <span class="text-rose-500" aria-hidden="true">*</span>
              </label>
              <input
                id="current_occupancy"
                v-model.number="form.current_occupancy"
                type="number"
                min="0"
                :class="[
                  'w-full rounded-lg outline px-3 py-2.5 text-sm transition  focus:ring-2',
                  errors.current_occupancy
                    ? 'outline-rose-400 focus:ring-rose-400/30'
                    : 'outline-slate-300 focus:outline-blue-700 focus:ring-blue-500/30',
                ]"
                :aria-invalid="!!errors.current_occupancy"
                required
              />
              <p v-if="errors.current_occupancy" class="mt-1 text-xs text-rose-600" role="alert">
                {{ errors.current_occupancy }}
              </p>
            </div>
          </div>
        </fieldset>

        <fieldset class="rounded-xl outline outline-slate-200 bg-white p-5 shadow-sm">
          <legend class="mb-4 font-semibold text-slate-900">Recursos e acessibilidade</legend>
          <div class="space-y-3">
            <label class="flex cursor-pointer items-center gap-3">
              <input
                v-model="form.accepts_pets"
                type="checkbox"
                class="h-4 w-4 rounded outline-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span class="text-sm text-slate-700">🐾 Aceita animais de estimação</span>
            </label>
            <label class="flex cursor-pointer items-center gap-3">
              <input
                v-model="form.accepts_elderly"
                type="checkbox"
                class="h-4 w-4 rounded outline-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span class="text-sm text-slate-700">👴 Acomoda idosos</span>
            </label>
            <label class="flex cursor-pointer items-center gap-3">
              <input
                v-model="form.accepts_disabled"
                type="checkbox"
                class="h-4 w-4 rounded outline-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span class="text-sm text-slate-700">♿ Acessível para pessoas com deficiência</span>
            </label>
          </div>
        </fieldset>

        <fieldset class="rounded-xl outline outline-slate-200 bg-white p-5 shadow-sm">
          <legend class="mb-1 font-semibold text-slate-900">Necessidades do abrigo</legend>
          <p class="mb-3 text-xs text-slate-500">
            Adicione itens que o abrigo precisa receber como doação.
          </p>
          <div class="flex gap-2">
            <label for="need-input" class="sr-only">Digite uma necessidade</label>
            <input
              id="need-input"
              v-model="needInput"
              type="text"
              placeholder="Ex: Água mineral, cobertores..."
              class="flex-1 rounded-lg outline outline-slate-300 px-3 py-2 text-sm transition focus:outline-blue-700  focus:ring-2 focus:ring-blue-500/30"
              @keydown="handleNeedKeydown"
            />
            <button
              type="button"
              class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700  focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
              @click="addNeed"
            >
              Adicionar
            </button>
          </div>
          <ul
            v-if="form.needs.length"
            class="mt-3 flex flex-wrap gap-2"
            role="list"
            aria-label="Necessidades adicionadas"
          >
            <li
              v-for="(need, i) in form.needs"
              :key="need"
              class="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1 text-sm font-medium text-amber-800 ring-1 ring-amber-200"
            >
              {{ need }}
              <button
                type="button"
                class="ml-0.5 text-amber-600 hover:text-amber-900  focus-visible:ring-1 focus-visible:ring-amber-500 cursor-pointer"
                :aria-label="`Remover necessidade: ${need}`"
                @click="removeNeed(i)"
              >
                ×
              </button>
            </li>
          </ul>
        </fieldset>

        <fieldset class="rounded-xl outline outline-slate-200 bg-white p-5 shadow-sm">
          <legend class="mb-4 font-semibold text-slate-900">Coordenação</legend>
          <div class="space-y-4">
            <div>
              <label for="coordinator_name" class="mb-1 block text-sm font-medium text-slate-700">
                Nome do coordenador(a) <span class="text-rose-500" aria-hidden="true">*</span>
              </label>
              <input
                id="coordinator_name"
                v-model="form.coordinator_name"
                type="text"
                autocomplete="name"
                :class="[
                  'w-full rounded-lg outline px-3 py-2.5 text-sm transition  focus:ring-2',
                  errors.coordinator_name
                    ? 'outline-rose-400 focus:ring-rose-400/30'
                    : 'outline-slate-300 focus:outline-blue-700 focus:ring-blue-500/30',
                ]"
                :aria-invalid="!!errors.coordinator_name"
                required
              />
              <p v-if="errors.coordinator_name" class="mt-1 text-xs text-rose-600" role="alert">
                {{ errors.coordinator_name }}
              </p>
            </div>
            <div>
              <label for="coordinator_phone" class="mb-1 block text-sm font-medium text-slate-700">
                Celular do coordenador(a) <span class="text-rose-500" aria-hidden="true">*</span>
              </label>
              <input
                id="coordinator_phone"
                v-model="form.coordinator_phone"
                type="tel"
                autocomplete="tel"
                placeholder="(XX) XXXXX-XXXX"
                :class="[
                  'w-full rounded-lg outline px-3 py-2.5 text-sm transition  focus:ring-2',
                  errors.coordinator_phone
                    ? 'outline-rose-400 focus:ring-rose-400/30'
                    : 'outline-slate-300 focus:outline-blue-700 focus:ring-blue-500/30',
                ]"
                :aria-invalid="!!errors.coordinator_phone"
                required
              />
              <p v-if="errors.coordinator_phone" class="mt-1 text-xs text-rose-600" role="alert">
                {{ errors.coordinator_phone }}
              </p>
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          :disabled="submitting"
          class="w-full rounded-lg bg-blue-700 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800  focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          :aria-busy="submitting"
        >
          {{ submitting ? 'Cadastrando...' : 'Cadastrar abrigo' }}
        </button>
      </form>
    </div>
  </main>
</template>
