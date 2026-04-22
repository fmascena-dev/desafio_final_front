<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-slate-50">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>
