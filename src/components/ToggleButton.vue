<script lang="ts">
import FalseLoading from '@/components/FalseLoading.vue'
import HomeCard from '@/components/HomeCard.vue'
import MonoButton from '@/components/MonoButton.vue'
import { usePersistent } from '@/stores/persistent'

export default {
  components: {
    FalseLoading,
    HomeCard,
    MonoButton,
  },

  data() {
    return {
      view: 'intro',
    }
  },

  computed: {
    persistent() {
      return usePersistent()
    },
    falseLoading() {
      return this.$refs.falseLoading as InstanceType<typeof FalseLoading>
    },
    nameTextClasses() {
      if (this.view === 'intro' || this.view === 'pre-home') return '!pb-[1.95em] top-[50%] left-[50%] transform-[translate(-50%,-50%)]'
      else if (this.view === 'home') return 'top-[-5em] left-[50%] transform-[translate(-50%,-50%)]'
      else return 'top-[-100%]'
    },
    developerTextClasses() {
      if (this.view === 'intro' || this.view === 'pre-home') return '!pt-[1.5em] text-2xl top-[50%] left-[50%] transform-[translate(-50%,-50%)] '
      else if (this.view === 'home') return 'text-xl top-[calc(100%+5em)] left-[50%] transform-[translate(-50%,-50%)]'
      else return 'top-[-100%]'
    },
  },

  methods: {
    onIntroFinished() {
      setTimeout(() => {
        this.view = 'pre-home'
      }, 50)
      setTimeout(() => {
        this.view = 'home'
      }, 100)
    },
  },

  mounted() {
    if (this.persistent.skipIntro) {
      this.view = 'home'
    } else {
      this.falseLoading.start()
    }
  },
}
</script>

<template>
  <div class="h-[2em] w-[5em]">
    <div class="h-full w-full bg-[rgb(180,180,180)]"></div>
    <div class="h-[2em] w-[2em] bg-[var(--power-blue)]"></div>
  </div>
</template>
