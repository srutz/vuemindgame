<script setup lang="ts">
import Menu from '@/components/Menu.vue';


</script>

<template>
  <div class="w-screen h-screen text-white flex flex-col items-center">
    <Menu></Menu>
    <router-view></router-view>
  </div>
</template>
