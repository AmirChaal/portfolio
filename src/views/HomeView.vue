<script lang="ts">
import FalseLoading from '@/components/FalseLoading.vue'
import HomeCard from '@/components/HomeCard.vue'
import IntroControl from '@/components/IntroControl.vue'
import MainScreen from '@/components/MainScreen.vue'
import MainText from '@/components/MainText.vue'
import { usePersistent } from '@/stores/persistent'

export default {
   components: {
      FalseLoading,
      HomeCard,
      MainText,
      MainScreen,
      IntroControl,
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
      introControlWrapperClasses() {
         return ''
      },
      mainScreen() {
         return this.$refs.mainScreenRef as InstanceType<typeof MainScreen>
      }
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
   <div class="flex gap-[1em] absolute">
      <button @click="mainScreen.close()">close</button>
      <button @click="mainScreen.open()">open</button>
   </div>

   <div class="z-20 absolute w-full flex justify-center items-center h-[4em] pointer-events-none" :class="introControlWrapperClasses">
      <IntroControl class="pointer-events-auto" />
   </div>

   <div class="z-10 h-full w-full flex justify-center items-center">
      <FalseLoading v-if="view === 'intro'" ref="falseLoading" @animation-finished="onIntroFinished" />

      <template v-if="view === 'home' || view === 'pre-home'">
         <p ref="upperText" class="z-[10] absolute font-mono tracking-[0.3em] font-bold text-xl slow-fast-slow-transition" :class="nameTextClasses">Amir Chaal</p>
         <p ref="upperText" class="z-[10] absolute font-mono tracking-[0.3em] font-bold slow-fast-slow-transition" :class="developerTextClasses">Développeur_Web;</p>
      </template>

      <!-- <MainText v-if="view === 'home'" /> -->

      <MainScreen ref="mainScreenRef" v-if="view === 'home'" class="h-full w-full" />

      <HomeCard class="z-[-10]" />
   </div>
</template>
