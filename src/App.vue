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
const theme = ref('dark')

const applyTheme = (next) => {
  theme.value = next
  document.documentElement.setAttribute('data-theme', next)
  try { localStorage.setItem('hyperur-theme', next) } catch (e) { /* ignore */ }
}

const toggleTheme = () => {
  applyTheme(theme.value === 'dark' ? 'light' : 'dark')
}

onMounted(() => {
  store.fetchAllData()
  let saved = null
  try { saved = localStorage.getItem('hyperur-theme') } catch (e) { /* ignore */ }
  if (saved === 'dark' || saved === 'light') {
    applyTheme(saved)
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    applyTheme('light')
  } else {
    applyTheme('dark')
  }
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
    <Navbar
      :active-menu="activeMenu"
      :theme="theme"
      @menu-change="handleMenuChange"
      @login="handleLogin"
      @toggle-theme="toggleTheme"
    />

    <main class="main-content">
      <!-- Home -->
      <div v-if="activeMenu === 'home'">
        <HomePage @navigate="handleNavigate" />
      </div>

      <!-- Download -->
      <div v-else-if="activeMenu === 'download'" class="content-wrapper" id="device-section">
        <section class="main-section glass">
          <SearchBar />
          <DeviceGrid />
        </section>
      </div>

      <!-- Placeholder pages -->
      <div
        v-else-if="['guide','changelog','donate','serial','login'].includes(activeMenu)"
        class="page-content"
      >
        <div class="page-header glass">
          <h2>{{ placeholderMeta(activeMenu).icon }} {{ t(`pages.${activeMenu}.title`) }}</h2>
          <p>{{ t(`pages.${activeMenu}.desc`) }}</p>
        </div>
        <div class="coming-soon glass">
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
  background:
    radial-gradient(ellipse at 20% 0%, rgba(138, 108, 255, 0.18), transparent 50%),
    radial-gradient(ellipse at 80% 100%, rgba(216, 180, 255, 0.12), transparent 55%),
    var(--bg);
  background-attachment: fixed;
  min-height: 100vh;
  color: var(--text-soft);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  transition: background-color 0.3s ease, color 0.3s ease;
}

[data-theme="light"] body {
  background:
    radial-gradient(ellipse at 20% 0%, rgba(138, 108, 255, 0.22), transparent 55%),
    radial-gradient(ellipse at 80% 100%, rgba(216, 180, 255, 0.18), transparent 55%),
    var(--bg);
}

:root {
  --bg: #000;
  --surface: rgba(255, 255, 255, 0.03);
  --surface-strong: rgba(20, 22, 28, 0.8);
  --glass-bg: rgba(20, 22, 28, 0.55);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-highlight: rgba(255, 255, 255, 0.06);
  --glass-blur: 18px;
  --border: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.1);
  --text: #fff;
  --text-strong: #fff;
  --text-soft: rgba(255, 255, 255, 0.85);
  --muted: rgba(255, 255, 255, 0.55);
  --muted-soft: rgba(255, 255, 255, 0.4);
  --input-bg: rgba(20, 22, 28, 0.8);
  --input-border: rgba(109, 116, 134, 0.3);
  --input-placeholder: rgba(255, 255, 255, 0.4);
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  --shadow-strong: 0 8px 32px rgba(0, 0, 0, 0.35);
  --scrollbar-thumb: rgba(255, 255, 255, 0.15);
  --brand-1: #c8a2ff;
  --brand-2: #8a6cff;
  --brand-gradient: linear-gradient(135deg, #d8b4ff 0%, #8a6cff 100%);
  color-scheme: dark;
}

[data-theme="light"] {
  --bg: #f5f6fa;
  --surface: rgba(255, 255, 255, 0.7);
  --surface-strong: #ffffff;
  --glass-bg: rgba(255, 255, 255, 0.55);
  --glass-border: rgba(15, 23, 42, 0.1);
  --glass-highlight: rgba(255, 255, 255, 0.6);
  --glass-blur: 16px;
  --border: rgba(15, 23, 42, 0.08);
  --border-strong: rgba(15, 23, 42, 0.12);
  --text: #0f172a;
  --text-strong: #0f172a;
  --text-soft: #1e293b;
  --muted: rgba(15, 23, 42, 0.6);
  --muted-soft: rgba(15, 23, 42, 0.45);
  --input-bg: #ffffff;
  --input-border: rgba(15, 23, 42, 0.12);
  --input-placeholder: rgba(15, 23, 42, 0.4);
  --shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
  --shadow-strong: 0 8px 32px rgba(15, 23, 42, 0.12);
  --scrollbar-thumb: rgba(15, 23, 42, 0.18);
  color-scheme: light;
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
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.page-header h2 {
  margin: 0 0 0.5rem 0;
  color: var(--text-strong);
}

.page-header p {
  color: var(--muted);
  margin: 0;
}

.coming-soon {
  border-radius: 16px;
  padding: 4rem 2rem;
  text-align: center;
}

.coming-soon .icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.coming-soon p {
  font-size: 1.2rem;
  color: var(--muted);
}

.main-section {
  border-radius: 16px;
}

.glass {
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow);
  isolation: isolate;
}

.glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    var(--glass-highlight) 0%,
    transparent 40%,
    transparent 60%,
    rgba(138, 108, 255, 0.15) 100%
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  pointer-events: none;
  z-index: 0;
}

.glass > * {
  position: relative;
  z-index: 1;
}

.hidden {
  display: none !important;
}
</style>