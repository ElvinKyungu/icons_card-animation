<script setup lang="ts">
import { ref } from 'vue'
const animatedCircle = ref<HTMLDivElement | null>(null)
</script>

<template>
  <div class="flex items-center justify-center relative">
    <div ref="animatedCircle">
      <component :is="folderIcon" :size="120" class="text-gray-400" />
    </div>
    <div
      class="bg-slate-200 w-20 rounded-full h-20 absolute left-[56%] top-0 flex items-center justify-center"
    >
      <component :is="checkIcon" :size="50" class="" />
    </div>
  </div>
</template>
