import { defineComponent, toRefs, PropType } from 'vue'
import { useGameStore, type Row } from './Game'
import { Dot } from './Dot'

export const GamePanel = defineComponent({
  setup() {
    const { game } = toRefs(useGameStore())
    return () => (
      <div class="flex flex-col gap-2 bg-gray-700 text-white p-4">
        <GameRow row={game.value!.code} key="coderow" />
        <div class="h-2 border-t border-gray-500 my-2" />
        {game.value!.attempts.map((attempt, y) => (
          <GameRow row={attempt} key={y} />
        ))}
        <button type="button" class="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
          Submit Guess
        </button>
      </div>
    )
  },
})


export const GameRow = defineComponent({
  props: {
    row: {
      type: Object as PropType<Row>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div class="flex gap-2">
        {props.row.colors.map((cell, x) => (
          <Dot key={x} color={cell} />
        ))}
      </div>
    )
  },
})
