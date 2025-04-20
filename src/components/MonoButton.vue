<script lang="ts">
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <p>{{ label }}</p>
</template>
