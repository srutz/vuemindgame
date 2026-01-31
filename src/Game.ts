/* game like mastermind */

import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { randomPermutation } from './lib/util'

export type Feedback = 'correct' | 'misplaced'

export type Row = {
  colors: number[]
  feedbacks: Feedback[]
}

export type Game = {
  nColumns: number
  nColors: number
  nAttempts: number
  status: 'stopped' | 'playing' | 'won' | 'lost'
  code: Row
  attempts: Row[]
  currentAttempt: number
  cheatMode: boolean
}

export const useGameStore = defineStore('game', () => {
  const savedState = localStorage.getItem('myStore')
  const initialGame = savedState ? (JSON.parse(savedState) as Game) : null
  const game = ref<Game | null>(initialGame)

  // Watch for changes and save to localStorage
  watch(
    game,
    (s) => {
      localStorage.setItem('myStore', JSON.stringify(s))
    },
    { deep: true },
  )

  function randomRow(n: number, nColors: number, allowDuplicates = true): Row {
    if (allowDuplicates) {
      const colors = Array.from({ length: n }, () => Math.floor(Math.random() * n))
      return { colors, feedbacks: [] }
    }
    const colors = Array.from({ length: nColors }, (_, i) => i)
    return {
      colors: randomPermutation(colors).slice(0, n),
      feedbacks: [],
    }
  }
  function emptyRow() {
    return { colors: Array.from({ length: game.value!.nColumns }, () => -1), feedbacks: [] }
  }
  function newGame(nColumns = 4, nColors = 6, nAttempts = 10) {
    game.value = {
      status: 'stopped',
      code: randomRow(nColumns, nColors, false),
      attempts: [],
      nColumns,
      nColors,
      nAttempts,
      currentAttempt: 0,
      cheatMode: false,
    }
    for (let i = 0; i < game.value!.nAttempts; i++) {
      game.value.attempts.push(emptyRow())
    }
  }
  function setStatus(newStatus: 'stopped' | 'playing' | 'won' | 'lost') {
    if (game.value && game.value.status !== newStatus) {
      game.value.status = newStatus
    }
  }
  function toggleCheatMode() {
    if (game.value) {
      game.value.cheatMode = !game.value.cheatMode
    }
  }
  function submitAttempt() {
    if (!game.value) {
      return
    }
    const attempt = game.value.attempts[game.value.currentAttempt]
    if (!attempt) {
      return
    }
    const code = game.value.code
    const f1: Feedback[] = []
    const f2: Feedback[] = []
    const misplacedColors = new Set<number>()
    for (let i = 0; i < game.value.nColumns; i++) {
      if (attempt.colors[i] === code.colors[i]) {
        f1.push('correct')
      } else {
        // search for the color elsewhere
        const color = attempt.colors[i]
        if (color && code.colors.includes(color)) {
          f2.push('misplaced')
          misplacedColors.add(color)
        }
      }
    }
    attempt.feedbacks = [...f1, ...f2]
    // Check win/loss conditions
    if (
      attempt.feedbacks.length === game.value.nColumns &&
      attempt.feedbacks.every((f) => f === 'correct')
    ) {
      game.value.status = 'won'
      game.value.currentAttempt = -1
    } else if (game.value.currentAttempt >= game.value.nAttempts - 1) {
      game.value.status = 'lost'
      game.value.currentAttempt = -1
    } else {
      game.value.currentAttempt += 1
    }
  }
  if (!game.value) {
    newGame()
  }
  return {
    game,
    newGame,
    setStatus,
    toggleCheatMode,
    submitAttempt,
  }
})
