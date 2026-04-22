<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-auto border-t border-slate-200 bg-slate-800 text-slate-300">
    <div class="flex flex-col mx-auto w-full">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 px-4 py-8 sm:px-6">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span class="text-xl" aria-hidden="true">🏠</span>
            <span class="text-xl font-bold text-white">
              Abrigo<span class="text-blue-400">Fácil</span>
            </span>
          </div>
          <p class="mt-2 text-sm leading-relaxed text-slate-400 lg:w-2/3">
            Conectando pessoas que precisam de abrigo com locais seguros durante situações de
            emergência.
          </p>
        </div>

        <div class="flex flex-col sm:items-center">
          <div class="flex flex-col gap-2">
            <h3 class="font-bold text-white">Emergências</h3>
            <ul class="flex flex-col gap-1 text-sm" role="list">
              <li>
                <a
                  href="tel:193"
                  class="hover:text-white focus:outline-none focus-visible:underline"
                  aria-label="Bombeiros — telefone 193"
                >
                  🚒 Bombeiros — 193
                </a>
              </li>
              <li>
                <a
                  href="tel:192"
                  class="hover:text-white focus:outline-none focus-visible:underline"
                  aria-label="SAMU — telefone 192"
                >
                  🚑 SAMU — 192
                </a>
              </li>
              <li>
                <a
                  href="tel:199"
                  class="hover:text-white focus:outline-none focus-visible:underline"
                  aria-label="Defesa Civil — telefone 199"
                >
                  🏛️ Defesa Civil — 199
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="flex flex-col sm:items-end">
          <div class="flex flex-col gap-2">
            <h3 class="font-bold text-white">Navegação</h3>
            <ul class="flex flex-col gap-1 text-sm" role="list">
              <li>
                <RouterLink
                  to="/"
                  class="hover:text-white focus:outline-none focus-visible:underline"
                >
                  Início
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/abrigos"
                  class="hover:text-white focus:outline-none focus-visible:underline"
                >
                  Ver todos os abrigos
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/cadastrar"
                  class="hover:text-white focus:outline-none focus-visible:underline"
                >
                  Cadastrar abrigo
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="border-t border-slate-700 pt-6 text-center text-xs text-slate-400">
        <p class="px-4 mb-8 sm:px-6">
          © {{ year }} AbrigoFácil. Desenvolvido para ajudar em situações de emergência.
        </p>
      </div>
    </div>
  </footer>
</template>
