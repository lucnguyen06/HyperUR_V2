<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHyperStore } from './stores/hyperStore'
import { useAuthStore } from './stores/authStore'
import Navbar from './components/Navbar.vue'
import SearchBar from './components/SearchBar.vue'
import DeviceGrid from './components/DeviceGrid.vue'
import HomePage from './components/HomePage.vue'
import GuidePage from './components/GuidePage.vue'
import LoginPage from './components/LoginPage.vue'
import SerialKeyPage from './components/SerialKeyPage.vue'
import SiteFooter from './components/SiteFooter.vue'
import ScrollToTop from './components/ScrollToTop.vue'

const { t } = useI18n()
const store = useHyperStore()
const auth = useAuthStore()
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
  auth.restoreSession()
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
  authView.value = auth.isAuthenticated ? 'login' : (activeMenu.value === 'login' ? 'login' : 'login')
  activeMenu.value = 'login'
  nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
}

const authView = ref('login')
const onAuthSuccess = (user) => {
  /* hook for analytics / toasts */
}

const handleAuthAction = (action) => {
  if (action === 'logout') {
    auth.logout()
    activeMenu.value = 'home'
    nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  } else if (action === 'login' || action === 'register') {
    authView.value = action
    activeMenu.value = 'login'
    nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  }
}

const handleSerialNeedLogin = () => {
  authView.value = 'login'
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
        v-else-if="['changelog','donate'].includes(activeMenu)"
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

      <!-- Serial Key -->
      <div v-else-if="activeMenu === 'serial'" class="page-content">
        <div class="page-header glass">
          <h2>{{ placeholderMeta('serial').icon }} {{ t('pages.serial.title') }}</h2>
          <p>{{ t('pages.serial.desc') }}</p>
        </div>
        <SerialKeyPage @navigate="handleNavigate" @need-login="handleSerialNeedLogin" />
      </div>

      <!-- Login / Register -->
      <div v-else-if="activeMenu === 'login'">
        <LoginPage
          :initial-view="authView"
          @navigate="handleNavigate"
          @auth-success="onAuthSuccess"
        />
      </div>

      <!-- Guide -->
      <div v-else-if="activeMenu === 'guide'" class="content-wrapper">
        <GuidePage @navigate="handleNavigate" />
      </div>
    </main>

    <SiteFooter @navigate="handleNavigate" @auth-action="handleAuthAction" :is-authenticated="auth.isAuthenticated" :user="auth.user" />

    <ScrollToTop />
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

*:focus-visible {
  outline: 2px solid var(--text-strong);
  outline-offset: 4px;
  border-radius: 4px;
}

html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  background: var(--bg);
}

::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border-radius: 6px;
  border: 3px solid var(--bg);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.25);
}

body {
  font-family: 'Inter', 'Be Vietnam Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background:
    radial-gradient(ellipse at 20% 0%, rgba(255, 255, 255, 0.06), transparent 50%),
    radial-gradient(ellipse at 80% 100%, rgba(255, 255, 255, 0.04), transparent 55%),
    var(--bg);
  background-attachment: fixed;
  min-height: 100vh;
  color: var(--text-soft);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-x: hidden;
}

[data-theme="light"] body {
  background:
    radial-gradient(ellipse at 20% 0%, rgba(15, 23, 42, 0.06), transparent 55%),
    radial-gradient(ellipse at 80% 100%, rgba(15, 23, 42, 0.05), transparent 55%),
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
  --shadow-hover: 0 12px 40px rgba(255, 255, 255, 0.15);
  --scrollbar-thumb: rgba(255, 255, 255, 0.15);
  --brand-1: #ffffff;
  --brand-2: #b0b0b0;
  --brand-gradient: linear-gradient(135deg, #ffffff 0%, #6b6b6b 100%);
  --transition-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --transition-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
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
  --shadow-hover: 0 12px 40px rgba(15, 23, 42, 0.18);
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
  position: relative;
}

.main-content > div {
  animation: pageTransition 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes pageTransition {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  border-radius: 18px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  animation: slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-header h2 {
  margin: 0 0 0.75rem 0;
  color: var(--text-strong);
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.page-header p {
  color: var(--muted);
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.6;
}

.coming-soon {
  border-radius: 18px;
  padding: 5rem 2rem;
  text-align: center;
  animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.coming-soon .icon {
  font-size: 5rem;
  display: block;
  margin-bottom: 1.5rem;
  animation: bounce 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.coming-soon p {
  font-size: 1.3rem;
  color: var(--muted);
  font-weight: 500;
}

.main-section {
  border-radius: 18px;
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
    rgba(255, 255, 255, 0.08) 100%
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