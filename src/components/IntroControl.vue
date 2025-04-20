<script lang="ts">
import { usePersistent } from '@/stores/persistent'
import ToggleSwitch from 'primevue/toggleswitch'

export default {
  components: {
    ToggleSwitch,
  },

  computed: {
    persistent() {
      return usePersistent()
    },
  },
}
</script>

<template>
  <div class="flex items-center gap-[1em] shadow-intense bg-white rounded-[2em] !py-[0.25em] !px-[0.5em]">
    <p class="font-mono font-bold">PASSER L'INTRO</p>
    <ToggleSwitch v-model="persistent.skipIntro" />
  </div>
</template>

<style scoped></style>
