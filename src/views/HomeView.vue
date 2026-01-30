<script setup lang="ts">
import Menu from '@/components/Menu.vue';


</script>

<template>
  <div class="w-screen h-screen bg-zinc-900 text-white p-4 flex flex-col gap-2 items-center">
    <Menu></Menu>
    <router-view></router-view>
  </div>
</template>
