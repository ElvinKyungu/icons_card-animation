<script setup lang="ts">
import { ref } from 'vue'
const currentIndex = ref(0)
const cardDataLength = ref(4)
const setCurrentIndex = (index: number) => {
  currentIndex.value = index
}
</script>

<template>
  <div class="flex gap-3 pt-5 justify-center mt-5">
    <span
      v-for="index in cardDataLength"
      :key="index"
      class="w-5 h-5 rounded-full cursor-pointer"
      :class="{
        'bg-gray-400': index - 1 === currentIndex,
        'bg-gray-300': index - 1 !== currentIndex,
      }"
      @click="setCurrentIndex(index - 1)"
    ></span>
  </div>
</template>
