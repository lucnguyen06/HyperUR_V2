<script setup>
import { ref, onMounted } from 'vue'
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
}

const handleLogin = () => {
  activeMenu.value = 'login'
}

const handleNavigate = (key) => {
  activeMenu.value = key
}

const placeholders = [
  { key: 'guide', icon: '📖' },
  { key: 'features', icon: '✨' },
  { key: 'changelog', icon: '📝' },
  { key: 'support', icon: '💬' },
  { key: 'donate', icon: '❤️' },
  { key: 'serial', icon: '🔑' },
  { key: 'login', icon: '👤' }
]
</script>

<template>
  <div class="app">
    <Navbar @menu-change="handleMenuChange" @login="handleLogin" />

    <main class="main-content">
      <!-- Home -->
      <div :class="{ hidden: activeMenu !== 'home' }">
        <HomePage />
      </div>

      <!-- Download -->
      <div :class="['content-wrapper', { hidden: activeMenu !== 'download' }]">
        <section class="main-section">
          <SearchBar />
          <DeviceGrid />
        </section>
      </div>

      <!-- Placeholder pages -->
      <div
        v-for="p in placeholders"
        :key="p.key"
        :class="['page-content', { hidden: activeMenu !== p.key && !(p.key === 'login' && activeMenu === 'register') }]"
      >
        <div class="page-header">
          <h2>{{ p.icon }} {{ t(`pages.${p.key}.title`) }}</h2>
          <p>{{ t(`pages.${p.key}.desc`) }}</p>
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