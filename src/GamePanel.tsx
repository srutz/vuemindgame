import { defineComponent, ref, toRefs, watch } from 'vue'
import { useGameStore } from './Game'
import { ColorDot } from './ColorDot'
import { GameRow } from './GameRow'
import { MyButton } from './MyButton'

function toReversed<T>(arr: T[]) {
  return [...arr].reverse()
}

export const GamePanel = defineComponent({
  setup() {
    const gameStore = useGameStore()
    const { game } = toRefs(gameStore)
    console.log(gameStore.game, game)
    const selectedColor = ref(-1)
    function toggleSelection(color: number) {
      selectedColor.value = selectedColor.value === color ? -1 : color
    }
    return () => {
      //console.log('GamePanel rendering, selectedColor:', selectedColor.value)
      return (
        <div class="flex flex-col items-center gap-2">
          <div class="flex flex-col gap-2 bg-black border border-zinc-700 text-white p-4 rounded-lg">
            <GameRow row={game.value!.code} key="coderow" />
            <div class="h-2 border-t border-gray-500 my-2" />
            {toReversed(game.value!.attempts).map((attempt, y) => (
              <GameRow row={attempt} key={y} index={game.value!.attempts.length - 1 - y} />
            ))}
          </div>
          <div class="flex gap-2">
            {Array.from({ length: game.value!.nColors }).map((_, x) => (
              <ColorDot
                key={x}
                color={x}
                onClick={() => toggleSelection(x)}
                selected={x == selectedColor.value}
              />
            ))}
          </div>
          <MyButton>Submit Guess</MyButton>
        </div>
      )
    }
  },
})
