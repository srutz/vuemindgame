import { defineComponent, toRefs, type PropType } from 'vue'
import { getRgb } from './colors'

const COLORS = [
  "red",
  "green",
  "blue",
  "amber",
  "violet",
  "orange",
  "pink",
  "stone",
] as const


function getColor(color: number) {
  if (color < 0) return 'black'
  const base = COLORS[color]
  if (!base) return 'black'
  return getRgb(base, 600)
}

function getBorderColor(color: number) {
  if (color < 0) return 'black'
  const base = COLORS[color]
  if (!base) return 'black'
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
    onClick: {
      type: Function as PropType<(event?: PointerEvent) => void>,
      required: false,
    },
  },
  setup(props) {
    const { selected, color, onClick } = toRefs(props)
    const handleClick = (event: PointerEvent) => {
      onClick.value?.(event)
    }
    return () => {
      //console.log(`ColorDot ${color.value} rendering, selected:`, selected.value)
      return (
        <div
          class="w-8 h-8 rounded-full border border-zinc-700 shadow-lg cursor-pointer"
          style={{
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: selected.value ? "white" : getBorderColor(color.value),
            backgroundColor: getColor(color.value)
          }}
          onClick={handleClick}
        />
      )
    }
  }
})
