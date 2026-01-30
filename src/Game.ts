/* game like mastermind */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { randomPermutation } from './lib/util'

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
  function randomRow(n: number, nColors: number, allowDuplicates = true): Row {
    if (allowDuplicates) {
      const colors = Array.from({ length: n }, () => Math.floor(Math.random() * n))
      return { colors, feedback: [] }
    }
    const colors = Array.from({ length: nColors }, (_, i) => i)
    return {
      colors: randomPermutation(colors).slice(0, n),
      feedback: [],
    }
  }
  function emptyRow() {
    return { colors: Array.from({ length: game.value!.nColumns }, () => -1), feedback: [] }
  }
  function newGame(nColumns = 4, nColors = 6, nAttempts = 8) {
    game.value = {
      status: 'stopped',
      code: randomRow(nColumns, nColors, false),
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
