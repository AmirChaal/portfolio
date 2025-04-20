<script lang="ts">
export default {
  data() {
    return {
      position: 'bottom',
    }
  },

  computed: {
    homeCardClasses() {
      if (this.position === 'center') return 'top-[5%] left-[5%] h-[90%] w-[90%]'
      else if (this.position === 'bottom') return 'top-[100%] left-[5%] h-[0%] w-[90%]'
      else return ''
    },
  },

  watch: {
    position() {},
  },
}
</script>

<template>
  <div class="absolute paperBackground rounded-[1em] overflow-hidden" :class="homeCardClasses">
    <div class="blueFilter"></div>
  </div>
</template>

<style lang="scss" scoped>
.paperBackground {
  background-image: url('/src/assets/images/crumbled_paper.jpg');
  background-size: cover;
}

.blueFilter {
  height: 100%;
  width: 50%;
  background-color: rgb(88, 208, 255);
  mix-blend-mode: multiply;
}
</style>
