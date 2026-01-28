import { defineComponent } from 'vue'

function getColor(color: number) {
  const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple']
  return colors[color] || 'black'
}

export const Dot = defineComponent((props) => {
  return () => (
    <div
      class="w-8 h-8 rounded-full border border-zinc-600"
      style={{ backgroundColor: getColor(props.color) }}
    />
  )
})
