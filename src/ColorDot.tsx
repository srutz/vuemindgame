import { defineComponent, toRefs, type PropType } from 'vue'

function getColor(color: number) {
  if (color < 0) return 'black'
  const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple']
  return colors[color] || 'black'
}

function getBorderColor(color: number) {
  if (color < 0) return 'gray'
  const borderColors = ['darkred', 'darkgreen', 'darkblue', 'goldenrod', 'darkorange', 'indigo']
  return borderColors[color] || 'gray'
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
      console.log(`ColorDot ${color.value} rendering, selected:`, selected.value)
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
