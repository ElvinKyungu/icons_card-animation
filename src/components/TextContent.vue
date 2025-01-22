<script setup lang="ts">
import { computed, ref } from 'vue'
const cardData = ref([
  {
    title: 'Smart Search',
    description: 'Files are automatically organized for easy search and access.',
  },
  {
    title: 'Quick Upload',
    description: 'Drag and drop your files for quick uploading.',
  },
  {
    title: 'Secure Backup',
    description: 'Your files are stored safely with cloud encryption.',
  },
  {
    title: 'Share Instantly',
    description: 'Easily share files with colleagues and friends.',
  },
])
const currentIndex = ref(0)
const currentCard = computed(() => cardData.value[currentIndex.value])
</script>

<template>
  <div class="space-y-7 flex flex-col items-center mt-10">
    <h2 class="text-3xl font-bold">{{ currentCard.title }}</h2>
    <p class="text-xl font-medium text-gray-500 text-center">{{ currentCard.description }}</p>
    <div>
      <button class="py-3 px-20 text-xl font-medium bg-slate-200 rounded-full">Learn more</button>
    </div>
  </div>
</template>
