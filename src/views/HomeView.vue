<script setup lang="ts">
import Menu from '@/components/Menu.vue'
</script>

<template>
  <div class="w-screen h-screen text-white flex flex-col">
    <Menu></Menu>
    <div class="grow overflow-y-auto flex flex-col bg-black">
      <router-view></router-view>
    </div>
  </div>
</template>
