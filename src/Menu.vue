<template>
  <div class="w-full flex flex-row items-center gap-4">
    <div class="text-3xl font-bold text-center mr-8">Vue Mind Game</div>
    <nav class="flex flex-col gap-2">
      <my-button @click="newGame">New Game</my-button>
    </nav>
  </div>
</template>
<script setup lang="ts">
import { useGameStore } from './Game'
import { MyButton } from './MyButton'

const { newGame } = useGameStore()
</script>
