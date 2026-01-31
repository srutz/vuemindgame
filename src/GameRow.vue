<template>
  <div class="flex items-center gap-2 relative">
    <div v-if="index >= 0" class="select-none w-12 text-center text-zinc-600 font-bold" :class="{ 'bg-white': active }">
      {{ index + 1 }}
    </div>
    <div v-else class="w-12" />
    <ColorDot v-for="(cell, x) in row.colors" :key="x" :color="cell" @click="(e) => e && handleClick(e, x)"
      @drop="(e) => e && handleDrop(e, x)" @dragover="(e) => e && handleDragOver(e, x)" />
    <div class="w-12 flex justify-end">
      <FeedbackHints :index="index" :feedbacks="row.feedbacks" />
    </div>
    <div v-if="obscured" class="rounded-lg absolute inset-0 bg-zinc-800"></div>
  </div>
</template>

<script setup lang="ts">
import { ColorDot } from './ColorDot'
import type { Row } from './Game'
import FeedbackHints from './FeedbackHints.vue'


interface Props {
  row: Row
  index?: number
  active?: boolean
  obscured?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  index: -1,
  active: false,
})

const emit = defineEmits<{
  dotClick: [event: PointerEvent, rowIndex: number, dotIndex: number]
  dotDrop: [event: DragEvent, rowIndex: number, dotIndex: number]
  dotDragover: [event: DragEvent, rowIndex: number, dotIndex: number]
}>()

function handleClick(event: PointerEvent, x: number) {
  emit('dotClick', event, props.index, x)
}

function handleDrop(event: DragEvent, x: number) {
  emit('dotDrop', event, props.index, x)
}

function handleDragOver(event: DragEvent, x: number) {
  emit('dotDragover', event, props.index, x)
}
</script>
