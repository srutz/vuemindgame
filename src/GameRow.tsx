import { defineComponent, type PropType } from 'vue'
import { ColorDot } from './ColorDot'
import type { Row } from './Game'



export const GameRow = defineComponent({
  props: {
    row: {
      type: Object as PropType<Row>,
      required: true,
    },
    index: {
      type: Number,
      required: false,
      default: -1,
    },
    onDotClick: {
      type: Function as PropType<(event: PointerEvent, rowIndex: number, dotIndex: number) => void>,
      required: false,
    }

  },
  setup({ row, index, onDotClick }) {
    const handleClick = (event: PointerEvent, x: number) => {
      onDotClick?.(event, index, x)
    }

    return () => (
      <div class="flex items-center gap-2">
        {index >= 0 ? (
          <div class="w-6 text-center text-zinc-600 font-bold">{index + 1}</div>
        ) : <div class="w-6" />}
        {row.colors.map((cell, x) => (
          <ColorDot key={x} color={cell} onClick={(e) => handleClick(e, x)} />
        ))}
        <div class="w-6" />
      </div>
    )
  },
})
