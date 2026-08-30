<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

const checkScroll = () => {
  visible.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <transition name="fade-scale">
    <button
      v-if="visible"
      class="scroll-to-top"
      @click="scrollToTop"
      aria-label="Scroll to top"
      title="Back to top"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  </transition>
</template>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  box-shadow: var(--shadow-strong);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--text-strong);
}

.scroll-to-top svg {
  width: 24px;
  height: 24px;
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.scroll-to-top:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  background: var(--text-strong);
  color: var(--bg);
}

.scroll-to-top:hover svg {
  transform: translateY(-3px);
}

.scroll-to-top:active {
  transform: translateY(-2px);
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

@media (max-width: 768px) {
  .scroll-to-top {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 48px;
    height: 48px;
  }

  .scroll-to-top svg {
    width: 20px;
    height: 20px;
  }
}
</style>
