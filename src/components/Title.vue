<script setup lang="ts">
const { title } = defineProps<{ title: string }>()

</script>
<template>
  <div class="text-3xl font-bold text-center mr-8 ">{{ title }}</div>
</template>
