<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHyperStore } from './stores/hyperStore'
import Navbar from './components/Navbar.vue'
import SearchBar from './components/SearchBar.vue'
import DeviceGrid from './components/DeviceGrid.vue'
import HomePage from './components/HomePage.vue'
import SiteFooter from './components/SiteFooter.vue'

const { t } = useI18n()
const store = useHyperStore()
const activeMenu = ref('home')

onMounted(() => {
  store.fetchAllData()
})

const handleMenuChange = (menu) => {
  activeMenu.value = menu
  nextTick(() => {
    if (menu === 'download') {
      const el = document.getElementById('device-section')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  })
}

const handleLogin = () => {
  activeMenu.value = 'login'
  nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
}

const handleNavigate = (key) => {
  activeMenu.value = key
  nextTick(() => {
    if (key === 'download') {
      const el = document.getElementById('device-section')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  })
}

const placeholderMeta = (key) => {
  const map = {
    guide: { icon: '📖' },
    changelog: { icon: '📝' },
    donate: { icon: '❤️' },
    serial: { icon: '🔑' },
    login: { icon: '👤' }
  }
  return map[key] || { icon: '🔜' }
}
</script>

<template>
  <div class="app">
    <Navbar :active-menu="activeMenu" @menu-change="handleMenuChange" @login="handleLogin" />

    <main class="main-content">
      <!-- Home -->
      <div v-if="activeMenu === 'home'">
        <HomePage @navigate="handleNavigate" />
      </div>

      <!-- Download -->
      <div v-else-if="activeMenu === 'download'" class="content-wrapper" id="device-section">
        <section class="main-section">
          <SearchBar />
          <DeviceGrid />
        </section>
      </div>

      <!-- Placeholder pages -->
      <div
        v-else-if="['guide','changelog','donate','serial','login'].includes(activeMenu)"
        class="page-content"
      >
        <div class="page-header">
          <h2>{{ placeholderMeta(activeMenu).icon }} {{ t(`pages.${activeMenu}.title`) }}</h2>
          <p>{{ t(`pages.${activeMenu}.desc`) }}</p>
        </div>
        <div class="coming-soon">
          <span class="icon">🔜</span>
          <p>{{ t('pages.coming_soon') }}</p>
        </div>
      </div>
    </main>

    <SiteFooter @navigate="handleNavigate" />
  </div>
</template>

<style>
@font-face {
  font-family: 'Roboto';
  src: url('/fonts/Roboto-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', 'Be Vietnam Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background: #000;
  min-height: 100vh;
  color: #fff;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

:root {
  --bg: #000;
  --surface: rgba(255, 255, 255, 0.03);
  --border: rgba(255, 255, 255, 0.08);
  --text: rgba(255, 255, 255, 0.85);
  --muted: rgba(255, 255, 255, 0.55);
  --brand-1: #c8a2ff;
  --brand-2: #8a6cff;
  --brand-gradient: linear-gradient(135deg, #d8b4ff 0%, #8a6cff 100%);
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

.content-wrapper {
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem;
}

.page-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  background: rgba(20, 22, 28, 0.8);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.page-header h2 {
  margin: 0 0 0.5rem 0;
  color: #fff;
}

.page-header p {
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.coming-soon {
  background: rgba(20, 22, 28, 0.8);
  border-radius: 16px;
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.coming-soon .icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.coming-soon p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
}

.main-section {
  background: rgba(20, 22, 28, 0.8);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.hidden {
  display: none !important;
}
</style>