<script setup lang="ts">
import { useGameStore } from '@/Game';
import GamePanel from '@/GamePanel.vue'
import { computed } from 'vue';

const gameStore = useGameStore()

const status = computed(() => gameStore.game?.status)

function onNewGame() {
  gameStore.newGame()
  gameStore.setStatus("playing")
}

</script>

<template>
  <div class="h-1 grow self-stretch bg-black text-white p-4 flex flex-col gap-2 items-center">
    <template v-if="status === 'playing'">
      <GamePanel />
    </template>
    <template v-else-if="status === 'won'">
      <div class="flex flex-col gap-4 items-center mt-8">
        <div class=" text-2xl font-bold text-green-500">You Won!</div>
      </div>
    </template>
    <template v-else-if="status === 'lost'">
      <div class="flex flex-col gap-4 items-center mt-8">
        <div class=" text-2xl font-bold text-red-500">You Lost!</div>
      </div>
    </template>
    <template v-else>
      <div class="flex flex-col gap-4 items-center mt-8">
        <button @click="onNewGame"
          class="text-2xl font-bold text-yellow-500 p-8 border border-zinc-800 hover:border-zinc-600 rounded-xl cursor-poiner">Start
          a
          New
          Game</button>
      </div>
    </template>
  </div>
</template>
