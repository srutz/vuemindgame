import { defineComponent, toRefs } from 'vue'
import { useGameStore } from './Game'
import { Dot } from './Dot'

export const GamePanel = defineComponent({
  setup() {
    const { game } = toRefs(useGameStore())
    return () => (
      <div class="flex flex-col gap-2 w-64 bg-gray-700 text-white p-4">
        {game.value!.attempts.map((attempt, y) => () => (
          <div class="flex gap-2" key={y}>
            {attempt.colors.map((cell, x) => (
              <Dot key={x} color={cell} />
            ))}
          </div>
        ))}
      </div>
    )
  },
})
