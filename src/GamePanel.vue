<template>
  <div v-if="game" class="flex flex-col items-center gap-2 mb-4">
    <div
      class="flex flex-col gap-1 md:gap-2 bg-black border border-zinc-700 bg-zinc-900 text-white p-2 lg:p-4 rounded-lg"
    >
      <GameRow
        :row="game.code"
        :key="`code-${gameKey}`"
        :obscured="game.status !== 'lost' && !game.cheatMode"
      />
      <div class="h-[1px] lg:h-2 lg:border-t border-gray-500 my-[1px] lg:my-2" />
      <GameRow
        v-for="(attempt, y) in toReversed(game.attempts)"
        :key="`${gameKey}-${y}`"
        :row="attempt"
        :active="y == game.attempts.length - 1 - game.currentAttempt"
        :index="game.attempts.length - 1 - y"
        @dot-click="(e, y, x) => onClickGameDot(e, y, x)"
        @dot-drop="(e, y, x) => onDropGameDot(e, y, x)"
        @dot-dragover="(e) => e.preventDefault()"
      />
    </div>
    <div v-if="game.status === 'playing'" class="flex gap-2 items-center">
      <div class="flex gap-1 lg:gap-2 p-2">
        <ColorDot
          v-for="(_, x) in game.nColors"
          :key="x"
          :color="x"
          :selected="x === selectedColor"
          :draggable="true"
          @click="toggleSelection(x)"
          @dragstart="(e) => e && handleDragStart(e, x)"
        />
      </div>
      <MyButton class="text-sm" @click="handleSubmitAttempt">Submit row</MyButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from './Game'
import { ColorDot } from './ColorDot'
import GameRow from './GameRow.vue'
import MyButton from './components/MyButton.vue'

function toReversed<T>(arr: T[]) {
  return [...arr].reverse()
}

const gameStore = useGameStore()
const game = computed(() => gameStore.game)
const gameKey = computed(() => (game.value ? JSON.stringify(game.value.code.colors) : ''))
const selectedColor = ref(-1)
const draggedColor = ref(-1)

function toggleSelection(color: number) {
  selectedColor.value = selectedColor.value === color ? -1 : color
}

function handleDragStart(e: DragEvent, color: number) {
  draggedColor.value = color
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'copy'
    e.dataTransfer.setData('text/plain', String(color))
    const target = e.target as HTMLElement
    e.dataTransfer.setDragImage(target, 16, 16)
  }
}

function onDropGameDot(e: DragEvent, attemptIndex: number, colorIndex: number) {
  e.preventDefault()
  if (!game.value || attemptIndex !== game.value.currentAttempt) {
    return
  }
  if (draggedColor.value === -1) {
    return
  }
  const attempt = game.value.attempts[attemptIndex]!
  attempt.colors[colorIndex] = draggedColor.value
  draggedColor.value = -1
}

function onClickGameDot(e: MouseEvent, attemptIndex: number, colorIndex: number) {
  e.preventDefault()
  if (!game.value || attemptIndex !== game.value.currentAttempt) {
    return
  } else if (selectedColor.value === -1) {
    return
  }
  const attempt = game.value.attempts[attemptIndex]!
  attempt.colors[colorIndex] = selectedColor.value
}

function handleSubmitAttempt() {
  gameStore.submitAttempt()
}
</script>
