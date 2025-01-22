<script setup lang="ts">
import { ref, reactive, useTemplateRef, onMounted, nextTick } from 'vue'
import { animate } from 'motion'

// Référence pour l'élément animé
const animatedCircle = useTemplateRef<HTMLDivElement>('animated-circle')

// Liste des états avec des icônes, titres et descriptions
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

// Animation initiale au chargement
const animateInitialEntry = async () => {
  await nextTick()
  if (animatedCircle.value) {
    animate(
      animatedCircle.value,
      { translateY: ['-100%', '0%'], translateX: ['50%', '0%'], opacity: [0, 1] },
      { type: 'spring', duration: 0.8, easing: 'ease-in-out' }
    )
  }
}

// Animation lors du changement d'état
const setActiveState = async (index: number) => {
  if (animatedCircle.value) {
    // Animation de sortie pour les grandes et petites icônes
    await Promise.all([
      animate(
        animatedCircle.value,
        { translateX: ['0%', '20%'], opacity: [1, 0.5, 0] },
        { type: 'spring', duration: 0.3, easing: 'ease-in-out' }
      ),
      ]);
  }

  activeStateIndex.value = index;

  await nextTick();

  if (animatedCircle.value) {
    // Animation d'entrée pour les grandes et petites icônes
    animate(
      animatedCircle.value,
      { translateY: ['-100%', '0%'], translateX: ['50%', '0%'], opacity: [0, 1] },
      { type: 'spring', duration: 0.5, easing: 'ease-in-out' }
    );
    animateSmallIcon(true); // Animation d'entrée pour la petite icône
  }
};


// Appel de l'animation initiale
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
          <div ref="animated-circle">
            <component
              :is="states[activeStateIndex].largeIcon.component"
              :size="states[activeStateIndex].largeIcon.size"
              :class="states[activeStateIndex].largeIcon.class"
            />
          </div>
          <div
            class="bg-slate-200 w-20 rounded-full h-20 absolute left-[56%] top-0 flex items-center justify-center small-icon"
          >
            <component
              :is="states[activeStateIndex].smallIcon.component"
              :size="states[activeStateIndex].smallIcon.size"
            />
          </div>
        </div>
        <div class="space-y-7 flex flex-col items-center mt-10">
          <h2 class="text-3xl font-bold">{{ states[activeStateIndex].title }}</h2>
          <p class="text-xl font-medium text-gray-500 text-center">
            {{ states[activeStateIndex].description }}
          </p>
          <div>
            <button class="py-3 px-20 text-xl font-medium bg-slate-200 rounded-full">
              Learn more
            </button>
          </div>
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
