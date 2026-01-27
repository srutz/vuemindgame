import { defineComponent } from "vue";

export const GamePanel = defineComponent({
  setup() {
    return () => (
      <div class="w-full h-full bg-zinc-800 text-white p-4 flex flex-col gap-2">
        <div class="h-1 grow bg-zinc-800"></div>
      </div>
    );
  },
});
