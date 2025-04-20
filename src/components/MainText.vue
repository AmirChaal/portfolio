<script lang="ts">
import MonoButton from '@/components/MonoButton.vue'

export default {
  components: {
    MonoButton,
  },
}
</script>

<template>
  <div class="font-mono text-center">
    <p class="text-xl">Je suis <b class="text-[blue]">Amir</b></p>
    <p>Développeur web et illustrateur</p>
    <div class="flex gap-[2em]">
      <MonoButton label="Voir mes productions" />
      <MonoButton label="À propos de moi" />
    </div>
  </div>
</template>
