/* game like mastermind */

import { defineStore } from 'pinia'
import { ref } from 'vue'

export type BlackOrWhite = 'black' | 'white'

export type Row = {
  colors: number[]
  feedback: BlackOrWhite[]
}

export type Game = {
  status: 'stopped' | 'playing' | 'won' | 'lost'
  code: Row
  attempts: Row[]
}

export const useGameStore = defineStore('game', () => {
  const game = ref<Game | null>()
  const nColumns = 4
  const nColors = 6
  const nAttempts = 8
  function randomRow() {
    const colors = Array.from({ length: nColumns }, () => Math.floor(Math.random() * nColors))
    return { colors, feedback: [] }
  }
  function emptyRow() {
    return { colors: Array.from({ length: nColumns }, () => -1), feedback: [] }
  }
  function newGame() {
    game.value = {
      status: 'stopped',
      code: randomRow(),
      attempts: [],
    }
    for (let i = 0; i < nAttempts; i++) {
      game.value.attempts.push(emptyRow())
    }
  }
  newGame()
  return {
    game,
    newGame,
  }
})
