<script lang="ts">
import FalseLoading from '@/components/FalseLoading.vue';

export default {
  components: {
    FalseLoading
  },

  computed: {
    falseLoading() {
      return this.$refs.falseLoading as InstanceType<typeof FalseLoading>
    }
  },

  mounted() {
    this.falseLoading.start()
  }
}
</script>

<template>
  <div class="h-full w-full flex justify-center items-center">
    <FalseLoading ref="falseLoading" />
  </div>
</template>
