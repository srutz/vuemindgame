import { defineComponent, toRefs, type PropType } from 'vue'
import { getRgb } from './colors'

const COLORS = ['red', 'teal', 'blue', 'lime', 'violet', 'orange', 'pink', 'stone'] as const

function getColor(color: number) {
  if (color < 0) return 'black'
  const base = COLORS[color]
  if (!base) return 'black'
  return getRgb(base, 600)
}

function getBorderColor(color: number) {
  const fallback = getRgb('zinc', 700)
  if (color < 0) return fallback
  const base = COLORS[color]
  if (!base) return fallback
  return getRgb(base, 400)
}

export const ColorDot = defineComponent({
  props: {
    color: {
      type: Number,
      required: true,
    },
    selected: {
      type: Boolean,
      required: false,
      default: false,
    },
    draggable: {
      type: Boolean,
      required: false,
      default: false,
    },
    onClick: {
      type: Function as PropType<(event?: PointerEvent) => void>,
      required: false,
    },
    onDragstart: {
      type: Function as PropType<(event?: DragEvent) => void>,
      required: false,
    },
    onDrop: {
      type: Function as PropType<(event?: DragEvent) => void>,
      required: false,
    },
    onDragover: {
      type: Function as PropType<(event?: DragEvent) => void>,
      required: false,
    },
  },
  setup(props) {
    const { selected, color, onClick, onDragstart, onDrop, onDragover, draggable } = toRefs(props)
    const handleClick = (event: PointerEvent) => {
      onClick.value?.(event)
    }
    const handleDragStart = (event: DragEvent) => {
      onDragstart.value?.(event)
    }
    const handleDrop = (event: DragEvent) => {
      onDrop.value?.(event)
    }
    const handleDragOver = (event: DragEvent) => {
      onDragover.value?.(event)
    }
    return () => {
      //console.log(`ColorDot ${color.value} rendering, selected:`, selected.value)
      return (
        <div
          class="w-8 h-8 rounded-full border border-zinc-700 shadow-lg cursor-pointer"
          style={{
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: selected.value ? 'white' : getBorderColor(color.value),
            backgroundColor: getColor(color.value),
          }}
          draggable={draggable.value}
          onClick={handleClick}
          onDragstart={handleDragStart}
          onDrop={handleDrop}
          onDragover={handleDragOver}
        />
      )
    }
  },
})
