<script setup lang="ts">
import MyMenu from '@/components/MyMenu.vue'
</script>

<template>
  <div class="w-screen h-screen text-white flex flex-col">
    <MyMenu></MyMenu>
    <div class="grow overflow-y-auto flex flex-col bg-black">
      <router-view></router-view>
    </div>
  </div>
</template>
