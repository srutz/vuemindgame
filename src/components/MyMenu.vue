<template>
  <div
    class="w-full flex flex-row items-baseline gap-4 bg-zinc-800 pt-2 pb-4 border-b border-zinc-700 px-4"
  >
    <div class="text-3xl font-bold text-center mr-8">Vue Mind Game</div>
    <nav class="flex flex-row gap-2 items-center grow">
      <div class="text-sm text-zinc-400">Game State: {{ gameState }}</div>
      <div class="grow"></div>
      <my-button class="text-sm" v-show="gameState !== 'stopped'" @click="handleNewGame"
        >Reset Game</my-button
      >
      <my-button class="text-sm" v-show="gameState === 'playing'" @click="toggleCheatMode"
        >Toggle Cheat</my-button
      >
    </nav>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../Game'
import MyButton from './MyButton.vue'

const gameStore = useGameStore()
const { newGame, toggleCheatMode } = gameStore
const gameState = computed(() => gameStore.game?.status)

function handleNewGame() {
  newGame()
}
</script>
