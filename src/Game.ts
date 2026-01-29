/* game like mastermind */

import { defineStore } from 'pinia'
import { ref } from 'vue'

export type BlackOrWhite = 'black' | 'white'

export type Row = {
  colors: number[]
  feedback: BlackOrWhite[]
}

export type Game = {
  nColumns: number,
  nColors: number,
  nAttempts: number,
  status: 'stopped' | 'playing' | 'won' | 'lost'
  code: Row
  attempts: Row[]
}

export const useGameStore = defineStore('game', () => {
  const game = ref<Game | null>()
  function randomRow(n: number) {
    const colors = Array.from({ length: n }, () => Math.floor(Math.random() * n))
    return { colors, feedback: [] }
  }
  function emptyRow() {
    return { colors: Array.from({ length: game.value!.nColumns }, () => -1), feedback: [] }
  }
  function newGame(nColumns = 4, nColors = 6, nAttempts = 8) {
    game.value = {
      status: 'stopped',
      code: randomRow(nColumns),
      attempts: [],
      nColumns,
      nColors,
      nAttempts,
    }
    for (let i = 0; i < game.value!.nAttempts; i++) {
      game.value.attempts.push(emptyRow())
    }
  }
  newGame()
  return {
    game,
    newGame,
  }
})
