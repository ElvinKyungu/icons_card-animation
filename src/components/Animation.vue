<script setup lang="ts">
import { ref, reactive, useTemplateRef, onMounted, nextTick } from 'vue'
import { animate } from 'motion'

const animateLargeIcon = useTemplateRef<HTMLDivElement>('animated-large')
const animateSmallIcon = useTemplateRef<HTMLDivElement>('animated-small')
const textContainer = useTemplateRef<HTMLDivElement>('text-container')
const buttonContainer = useTemplateRef<HTMLDivElement>('button-container')

const states = reactive([
  {
    largeIcon: { component: 'PhUser', size: 120, class: 'text-gray-400' },
    smallIcon: { component: 'PhKey', size: 50 },
    title: 'User Authentication',
    description: 'Secure your data with user authentication and key access.',
  },
  {
    largeIcon: { component: 'PhFolder', size: 120, class: 'text-gray-400' },
    smallIcon: { component: 'PhCheckCircle', size: 50 },
    title: 'Smart Search',
    description: 'Files are automatically organized for easy search and access.',
  },
  {
    largeIcon: { component: 'PhChartBar', size: 120, class: 'text-gray-400' },
    smallIcon: { component: 'PhEye', size: 50 },
    title: 'Data Insights',
    description: 'Monitor and analyze your data with insightful charts and views.',
  },
  {
    largeIcon: { component: 'PhTrendUp', size: 120, class: 'text-gray-400' },
    smallIcon: { component: 'PhMagnifyingGlass', size: 50 },
    title: 'Performance Tracking',
    description: 'Keep track of trends and performance metrics easily.',
  },
])

const activeStateIndex = ref(0)

const animateInitialEntry = async () => {
  await nextTick()

  if (animateLargeIcon.value) {
    animate(
      animateLargeIcon.value,
      { translateY: ['-100%', '0%'], translateX: ['50%', '0%'], opacity: [0, 1] },
      { type: 'spring', duration: 0.8, easing: 'ease-in-out' },
    )
  }

  if (animateSmallIcon.value) {
    animate(
      animateSmallIcon.value,
      { translateY: ['100%', '0%'], translateX: ['-50%', '0%'], opacity: [0, 1] },
      { type: 'spring', duration: 0.8, easing: 'ease-in-out' },
    )
  }
}

const setActiveState = async (index: number) => {
  if (
    animateLargeIcon.value &&
    animateSmallIcon.value &&
    textContainer.value &&
    buttonContainer.value
  ) {
    await Promise.all([
      // Animate large icon out
      animate(
        animateLargeIcon.value,
        { translateX: ['0%', '20%'], opacity: [1, 0] },
        { type: 'spring', duration: 0.3, easing: 'ease-in-out' },
      ),
      // Animate small icon out
      animate(
        animateSmallIcon.value,
        { translateX: ['0%', '-20%'], opacity: [1, 0] },
        { type: 'spring', duration: 0.3, easing: 'ease-in-out' },
      ),
      // Animate text out
      animate(
        textContainer.value,
        { translateY: ['0%', '100%'], opacity: [1, 0] },
        { type: 'spring', duration: 0.3, easing: 'ease-in-out' },
      ),
      // Animate button out
      animate(
        buttonContainer.value,
        { translateY: ['0%', '100%'], opacity: [1, 0] },
        { type: 'spring', duration: 0.3, easing: 'ease-in-out' },
      ),
    ])
  }

  activeStateIndex.value = index

  await nextTick()

  if (
    animateLargeIcon.value &&
    animateSmallIcon.value &&
    textContainer.value &&
    buttonContainer.value
  ) {
    await Promise.all([
      // Animate large icon in
      animate(
        animateLargeIcon.value,
        { translateY: ['-100%', '0%'], translateX: ['50%', '0%'], opacity: [0, 1] },
        { type: 'spring', duration: 0.5, easing: 'ease-in-out' },
      ),
      // Animate small icon in
      animate(
        animateSmallIcon.value,
        { translateY: ['100%', '0%'], translateX: ['-50%', '0%'], opacity: [0, 1] },
        { type: 'spring', duration: 0.5, easing: 'ease-in-out' },
      ),
      // Animate text in
      animate(
        textContainer.value,
        { translateY: ['80%', '0%'], opacity: [0, 1] },
        { type: 'spring', duration: 0.5, easing: 'ease-in-out' },
      ),
      // Animate button in
      animate(
        buttonContainer.value,
        { translateY: ['70%', '0%'], opacity: [0, 1] },
        { type: 'spring', duration: 0.4, easing: 'ease-in-out' },
      ),
    ])
  }
}

// Call the initial animation
onMounted(() => {
  animateInitialEntry()
})
</script>

<template>
  <main class="flex h-screen w-full justify-center bg-slate-100 items-center">
    <div class="flex px-5 relative py-20 shadow-xl bg-white rounded-3xl max-w-[30rem]">
      <div class="absolute right-5 cursor-pointer top-5 p-2 bg-slate-400 rounded-full">
        <PhX :size="24" class="text-white" />
      </div>
      <div class="icon">
        <div class="flex items-center justify-center relative">
          <div ref="animated-large">
            <component
              :is="states[activeStateIndex].largeIcon.component"
              :size="states[activeStateIndex].largeIcon.size"
              :class="states[activeStateIndex].largeIcon.class"
            />
          </div>
          <div
            ref="animated-small"
            class="bg-slate-200 w-20 rounded-full h-20 absolute left-[56%] top-0 flex items-center justify-center small-icon"
          >
            <component
              :is="states[activeStateIndex].smallIcon.component"
              :size="states[activeStateIndex].smallIcon.size"
            />
          </div>
        </div>
        <div class="space-y-7 flex flex-col items-center mt-10" ref="text-container">
          <h2 class="text-3xl font-bold">{{ states[activeStateIndex].title }}</h2>
          <p class="text-xl font-medium text-gray-500 text-center">
            {{ states[activeStateIndex].description }}
          </p>
        </div>
        <div ref="button-container" class="mt-5 flex justify-center">
          <button class="py-3 px-20 text-xl font-medium bg-slate-200 rounded-full">
            Learn more
          </button>
        </div>
        <div class="flex justify-center gap-3 pt-10">
          <span
            v-for="(state, index) in states"
            :key="index"
            :class="[
              'w-5 h-5 rounded-full cursor-pointer',
              index === activeStateIndex ? 'bg-gray-400' : 'bg-gray-300',
            ]"
            @click="setActiveState(index)"
          ></span>
        </div>
      </div>
    </div>
  </main>
</template>
