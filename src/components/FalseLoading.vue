<script lang="ts">
import { usePersistent } from '@/stores/persistent'
import gsap from 'gsap'

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
      upperText: 'loading...',
      bottomTextArray: ['D', 'é', 'v', 'e', 'l', 'o', 'p', 'p', 'e', 'u', 'r', '_', 'W', 'e', 'b', ';'],
      upperTextHasBounce: false,
    }
  },

  emits: ['animationFinished'],

  computed: {
    persistent() {
      return usePersistent()
    },
    progressionDisplay() {
      return this.$refs.progressionDisplay as InstanceType<typeof HTMLElement>
    },
    explodedTextRef() {
      return this.$refs.explodedText as InstanceType<typeof HTMLDivElement>
    },
    upperTextRef() {
      return this.$refs.upperText as InstanceType<typeof HTMLParagraphElement>
    },
    waitMSBeforeAdvancing() {
      if (this.iterations === 0) return 100
      else return 70 / (this.iterations / 7)
    },
    upperTextClasses() {
      if (this.upperTextHasBounce) return 'bounceAnimation'
      else return ''
    },
  },

  methods: {
    getRandomDisplace() {
      return Math.random() * 20 - 10
    },
    getRandomRotate() {
      return Math.random() * 720 - 360
    },
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
      if (this.progressionText.split('').length >= 15) this.finished = true
      this.progression = this.getNewProgression()
      this.progressionText = this.getProgressionText(this.progression)
      this.iterations++
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
    explode() {
      const explodedText = this.progressionText.split('')

      // create segments
      for (let i = 0; i < 16; i++) {
        const displaceWrapper = document.createElement('div')
        displaceWrapper.style.transform = 'translate(0em,0em)'
        //   displaceWrapper.style.transition = 'all 1000ms cubic-bezier(0, 1, 0.7, 1)'
        displaceWrapper.classList = 'displaceWrapper sudden-transition'

        const rotateWrapper = document.createElement('div')
        rotateWrapper.style.transform = 'rotate(0deg)'
        rotateWrapper.classList = 'rotateWrapper'

        this.explodedTextRef.appendChild(displaceWrapper)
        displaceWrapper.appendChild(rotateWrapper)

        const paragraph = document.createElement('p')
        paragraph.classList = 'explodedParagraph'
        paragraph.style.width = '0.85em'
        paragraph.innerHTML = explodedText[i]
        rotateWrapper.appendChild(paragraph)
      }

      // constants
      const displaceWrappers = document.querySelectorAll('.displaceWrapper')
      const rotateWrappers = document.querySelectorAll('.rotateWrapper')

      // explode
      setTimeout(() => {
        displaceWrappers.forEach((dw) => {
          ;(dw as HTMLElement).style.transform = `translate(${this.getRandomDisplace()}em, ${this.getRandomDisplace()}em)`
        })
        rotateWrappers.forEach((rw) => {
          ;(rw as HTMLElement).style.transform = `rotate(${this.getRandomRotate()}deg)`
        })
      }, 10)

      // recompose
      for (let i = 0; i < displaceWrappers.length; i++) {
        setTimeout(
          () => {
            ;(displaceWrappers[i] as HTMLElement).style.transform = 'none'
            ;(displaceWrappers[i].children[0] as HTMLElement).style.transform = 'none'
            ;(displaceWrappers[i].children[0].children[0] as HTMLElement).innerHTML = this.bottomTextArray[i]

            // next step
          },
          1000 + i * 20,
        )
      }

      setTimeout(() => {
        this.updateLoadingText()
        this.persistent.skipIntro = true
      }, 1100)
    },
    updateLoadingText() {
      setTimeout(() => {
        const tl = gsap.timeline()
        tl.to(this.upperTextRef, { duration: 0.05, y: -10, ease: 'none' }).to(this.upperTextRef, { duration: 0.6, y: 0, ease: 'elastic.out(1.8,0.3)' })
        this.upperText = 'Amir Chaal'
      }, 1300)

      setTimeout(() => {
        this.$emit('animationFinished')
      }, 2000)
    },
  },
}
</script>

<template>
  <div class="flex flex-col gap-[0.5em] items-center">
    <p ref="upperText" class="font-mono tracking-[0.3em] font-bold text-xl">{{ upperText }}</p>
    <div class="font-mono tracking-[0.3em] font-bold text-2xl flex">
      <p v-if="!finished">
        {{ progressionText }}
      </p>
      <div ref="explodedText" class="flex"></div>
    </div>
  </div>
</template>

<style lang="scss"></style>
