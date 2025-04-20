<script lang="ts">
export default {
   data() {
      return {
         state: 'off',
      }
   },

   computed: {
      screenClasses() {
         if (this.state === 'off') return 'w-0 h-0'
         else if (this.state === 'closed') return 'w-[calc(100%-4em)] h-0'
         else if (this.state === 'open') return 'w-[calc(100%-4em)] h-[calc(100%-4em)]'
         else return ''
      },
   },

   methods: {
      close() {
         this.state = 'closed'
      },
      open() {
         this.state = 'open'
      },
      swipeRight() {

      },
      switchOn() {
         this.state = 'closed'
         setTimeout(() => {
            this.state = 'open'
         }, 300)
      },
   },

   mounted() {
      setTimeout(() => {
         this.switchOn()
      }, 10)
   },
}
</script>

<template>
   <div class="screen-wrapper flex justify-center items-center">
      <div class="slow-fast-slow-transition-500ms screen m-[2em] border-[1px] border-black overflow-hidden" :class="screenClasses">
         <div class="h-full" />
      </div>
   </div>
</template>

<style scoped></style>
