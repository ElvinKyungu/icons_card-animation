<script setup lang="ts">
import { animate } from "motion"

const startAnimation = () => {
  animate(
    "#animated-circle",
    {
      translateX: "calc(450% - 2.5rem)", 
      translateY: "-350%",
      type: "spring",
    },
    {
      duration: .5, 
      easing: "ease-in-out", 
    }
  )
}
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="relative w-80 h-80 bg-gray-300 border border-gray-400">
      <div
        id="animated-circle"
        class="absolute w-10 h-10 bg-indigo-500 rounded-full"
        style="top: calc(50% - 1.25rem); left: calc(50% - 1.25rem);"
      ></div>
    </div>
    <button
      @click="startAnimation"
      class="mt-4 px-4 py-2 text-white bg-indigo-600 rounded shadow hover:bg-indigo-700"
    >
      Démarrer l'animation
    </button>
  </div>
</template>
