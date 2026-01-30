<template>
  <div class="w-8 h-8 grid grid-cols-2">
    <div v-for="(feedback, i) in feedbacks" :key="i" class="flex items-center justify-center">
      <div class="w-3 h-3 rounded-full" :class="[feedback === 'misplaced' ? 'bg-gray-400' : 'bg-white']">
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Feedback } from './Game';

const { feedbacks } = defineProps<{
  index: number
  feedbacks: Feedback[]
}>()

</script>
