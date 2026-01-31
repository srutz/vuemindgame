<template>
  <button
    class="bg-blue-500 text-white py-1 px-4 rounded cursor-pointer hover:bg-blue-600"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
</script>
