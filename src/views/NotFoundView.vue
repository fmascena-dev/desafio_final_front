<template>
  <main
    id="main-content"
    tabindex="-1"
    class="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center"
  >
    <p class="text-8xl font-bold text-slate-200" aria-hidden="true">404</p>
    <h1 class="mt-4 text-2xl font-bold text-slate-800">Página não encontrada</h1>
    <p class="mt-2 max-w-sm text-slate-500">
      A página que você tentou acessar não existe ou foi removida.
    </p>
    <div class="mt-8 flex flex-wrap justify-center gap-3">
      <RouterLink
        to="/"
        class="rounded-lg bg-blue-700 px-6 py-2.5 font-medium text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
      >
        Ir para o início
      </RouterLink>
      <RouterLink
        to="/abrigos"
        class="rounded-lg border border-slate-300 px-6 py-2.5 font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
      >
        Ver abrigos
      </RouterLink>
    </div>
  </main>
</template>
