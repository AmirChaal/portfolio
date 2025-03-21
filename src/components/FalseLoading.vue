<script lang="ts">
export default {
  data() {
    return {
      progression: 0,
      interval: 100,
      iterations: 0,
      finished: false,
      progressionText: '0%',
      segments: [] as {
        content: string
        displaceStyle: Record<string, string>
        rotationStyle: Record<string, string>
      }[],
    }
  },

  computed: {
    progressionDisplay() {
      return this.$refs.progressionDisplay as InstanceType<typeof HTMLElement>
    },
    waitMSBeforeAdvancing() {
      if (this.iterations === 0) return 100
      else return 70 / (this.iterations / 7)
    },
  },

  methods: {
    getNewProgression() {
      let newProgression = this.progression
      if (newProgression === 0) newProgression = this.progression + 1
      else newProgression = this.progression * 1.2

      const multiplier = 10 ** this.iterations
      const p = newProgression * multiplier
      return Math.round(p) / multiplier
    },
    getProgressionText(progression: number) {
      return `${progression}%`
    },
    advanceProgression() {
      if (this.iterations >= 15) this.finished = true
      this.progression = this.getNewProgression()
      this.progressionText = this.getProgressionText(this.progression)
      this.iterations++
    },
    explode() {
      this.segments = this.progressionText.split('').map((char) => {
        return { content: char, rotationStyle: {}, displaceStyle: {} }
      })

      setTimeout(() => {
        this.segments = this.progressionText.split('').map((char) => {
          const getRandomDisplace = () => Math.random() * 30 - 15
          const getRandomRotate = () => Math.random() * 720 - 320
          const displaceStyle = {
            transform: `translate(${getRandomDisplace()}em, ${getRandomDisplace()}em)`,
          }
          const rotationStyle = { transform: `rotate(${getRandomRotate()}deg)` }
          return { content: char, displaceStyle, rotationStyle }
        })
      }, 1)
    },
    start() {
      const recursiveAdvance = () => {
        setTimeout(() => {
          this.advanceProgression()
          if (!this.finished) recursiveAdvance()
          else this.explode()
        }, this.waitMSBeforeAdvancing)
      }
      recursiveAdvance()
    },
  },
}
</script>

<template>
  <div class="flex flex-col gap-[0.5em] items-center">
    <p class="font-mono tracking-[0.3em] font-bold text-xl">Loading</p>
    <div ref="progressionDisplay" class="font-mono tracking-[0.3em] font-bold text-2xl flex">
      <p v-if="!finished">{{ progressionText }}</p>
      <template v-else>
        <div v-for="seg in segments" :key="seg.content">
          <div class="suddenTransition" :style="seg.displaceStyle">
            <p class="suddenTransition" :style="seg.rotationStyle">
              {{ seg.content }}
            </p>
            <!-- <p class="suddenTransition" :style="seg.rotationStyle">{{ seg.content }}</p> -->
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.suddenTransition {
  transition: all 1300ms cubic-bezier(0, 1, 0.7, 1);
}
</style>
