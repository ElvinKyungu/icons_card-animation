<script setup lang="ts">
import { ref, reactive, useTemplateRef, nextTick } from 'vue'
import { animate } from 'motion'

const animatedCircle = useTemplateRef<HTMLDivElement>('animated-circle')

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

const setActiveState = async (index: number) => {
  activeStateIndex.value = index
  await nextTick()
  if (animatedCircle.value) {
    animate(animatedCircle.value, { translateY: '-50%' }, { duration: 0.3, easing: 'ease-in-out' })
  }
}
</script>

<template>
  <main class="flex h-screen w-full justify-center bg-slate-100 items-center">
    <div class="flex px-5 relative py-20 shadow-xl bg-white rounded-3xl max-w-[30rem]">
      <div class="absolute right-5 cursor-pointer top-5 p-2 bg-slate-400 rounded-full">
        <PhX :size="24" class="text-white" />
      </div>
      <div class="icon">
        <div class="flex items-center justify-center relative">
          <!-- Icône principale -->
          <div ref="animated-circle">
            <component
              :is="states[activeStateIndex].largeIcon.component"
              :size="states[activeStateIndex].largeIcon.size"
              :class="states[activeStateIndex].largeIcon.class"
            />
          </div>
          <!-- Icône secondaire -->
          <div class="bg-slate-200 w-20 rounded-full h-20 absolute left-[56%] top-0 flex items-center justify-center">
            <component
              :is="states[activeStateIndex].smallIcon.component"
              :size="states[activeStateIndex].smallIcon.size"
            />
          </div>
        </div>
        <div class="space-y-7 flex flex-col items-center mt-10">
          <!-- Texte -->
          <h2 class="text-3xl font-bold">{{ states[activeStateIndex].title }}</h2>
          <p class="text-xl font-medium text-gray-500 text-center">
            {{ states[activeStateIndex].description }}
          </p>
          <!-- Bouton -->
          <div>
            <button class="py-3 px-20 text-xl font-medium bg-slate-200 rounded-full">
              Learn more
            </button>
          </div>
          <!-- Navigation -->
          <div class="flex gap-3 pt-5">
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
    </div>
  </main>
</template>
