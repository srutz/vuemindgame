<template>
  <div v-if="game" class="flex flex-col items-center gap-2">
    <div class="flex flex-col gap-2 bg-black border border-zinc-700 text-white p-4 rounded-lg">
      <GameRow :row="game.code" :key="`code-${gameKey}`" />
      <div class="h-2 border-t border-gray-500 my-2" />
      <GameRow v-for="(attempt, y) in toReversed(game.attempts)" :key="`${gameKey}-${y}`" :row="attempt"
        :active="y == game.attempts.length - 1 - game.currentAttempt" :index="game.attempts.length - 1 - y"
        @dot-click="(e, y, x) => onClickGameDot(e, y, x)" />
    </div>
    <div class="mt-8 flex gap-2">
      <ColorDot v-for="(_, x) in game.nColors" :key="x" :color="x" :selected="x === selectedColor"
        @click="toggleSelection(x)" />
    </div>
    <MyButton class="mt-4" @click="handleSubmitAttempt">Submit Guess</MyButton>
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
const gameKey = computed(() => game.value ? JSON.stringify(game.value.code.colors) : '')
const selectedColor = ref(-1)

function toggleSelection(color: number) {
  selectedColor.value = selectedColor.value === color ? -1 : color
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
