import { defineComponent } from 'vue'

export const MyButton = defineComponent({
  props: {},
  setup(props, { slots }) {
    return () => (
      <button class="bg-blue-500 text-white py-1 px-4 rounded cursor-pointer hover:bg-blue-600">
        {slots.default?.()}
      </button>
    )
  },
})
