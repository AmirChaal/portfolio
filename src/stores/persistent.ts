import { defineStore } from 'pinia'

export const usePersistent = defineStore('persistent', {
   persist: true,
   state: () => {
      return {
         skipIntro: false as boolean
      }
   },
})
