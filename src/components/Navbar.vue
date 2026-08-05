<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '../i18n'

const props = defineProps({
  activeMenu: { type: String, default: 'home' },
  theme: { type: String, default: 'dark' }
})
const { t, locale } = useI18n()
const emit = defineEmits(['menu-change', 'login', 'toggle-theme'])

const lang = computed({
  get: () => locale.value.toUpperCase(),
  set: (val) => setLocale(val)
})

const menuItems = [
  { key: 'home', labelKey: 'nav.home' },
  { key: 'download', labelKey: 'nav.download' },
  { key: 'guide', labelKey: 'nav.guide' },
  { key: 'changelog', labelKey: 'nav.changelog' },
  { key: 'donate', labelKey: 'nav.donate' }
]

const setActiveMenu = (key) => {
  emit('menu-change', key)
}

const setLang = (l) => {
  lang.value = l
}

const isDark = computed(() => props.theme === 'dark')
</script>

<template>
  <nav class="navbar">
    <div class="nav-brand" @click="setActiveMenu('home')">
      <h1>HyperUR</h1>
    </div>

    <div class="nav-menu">
      <button
        v-for="item in menuItems"
        :key="item.key"
        :class="['menu-btn', { active: props.activeMenu === item.key }]"
        @click="setActiveMenu(item.key)"
      >
        {{ t(item.labelKey) }}
      </button>
    </div>

    <div class="nav-actions">
      <button
        class="theme-toggle"
        :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
        :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
        @click="emit('toggle-theme')"
      >
        <svg v-if="isDark" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M12 3a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1zm0 14.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm9-4.5a1 1 0 0 1-1 1h-1.5a1 1 0 1 1 0-2H20a1 1 0 0 1 1 1zM5 12a1 1 0 0 1-1 1H2.5a1 1 0 1 1 0-2H4a1 1 0 0 1 1 1zm14.95-7.07a1 1 0 0 1 0 1.41l-1.06 1.06a1 1 0 0 1-1.41-1.41l1.06-1.06a1 1 0 0 1 1.41 0zM6.52 17.9a1 1 0 0 1 0 1.41l-1.06 1.06a1 1 0 1 1-1.41-1.41l1.06-1.06a1 1 0 0 1 1.41 0zM12 19a1 1 0 0 1 1 1V21.5a1 1 0 1 1-2 0V20a1 1 0 0 1 1-1zm7.07-3.05a1 1 0 0 1 1.41 0l1.06 1.06a1 1 0 1 1-1.41 1.41l-1.06-1.06a1 1 0 0 1 0-1.41zM4.93 5.34a1 1 0 0 1 1.41 0L7.4 6.4a1 1 0 1 1-1.41 1.42L4.93 6.76a1 1 0 0 1 0-1.42z"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M21.64 13a9 9 0 1 1-10.63-10.6 1 1 0 0 1 1.21 1.32A7 7 0 0 0 20.31 12a1 1 0 0 1 1.33 1z"/>
        </svg>
      </button>
      <div class="language-toggle">
        <button :class="{ active: lang === 'EN' }" @click="setLang('EN')">EN</button>
        <button :class="{ active: lang === 'VI' }" @click="setLang('VI')">VI</button>
      </div>
      <button class="login-btn" @click="emit('login')">{{ t('nav.login') }}</button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: var(--navbar-bg, rgba(0, 0, 0, 0.7));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  position: sticky;
  top: 0.75rem;
  left: 0;
  right: 0;
  margin: 0.75rem auto 0;
  width: calc(100% - 2rem);
  max-width: 1400px;
  border-radius: 18px;
  z-index: 50;
  font-family: 'Roboto', sans-serif;
  box-shadow: var(--shadow-strong);
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

[data-theme="light"] .navbar {
  --navbar-bg: rgba(255, 255, 255, 0.75);
}

.nav-brand {
  cursor: pointer;
  user-select: none;
}

.nav-brand h1 {
  margin: 0;
  font-family: 'Inter', 'Be Vietnam Pro', system-ui, sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  background: var(--brand-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nav-menu {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  justify-content: center;
}

.menu-btn {
  padding: 0.5rem 0.85rem;
  background: transparent;
  border: none;
  color: var(--muted);
  cursor: pointer;
  transition: color 0.2s ease;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-family: inherit;
  border-radius: 6px;
}

.menu-btn:hover {
  color: var(--text-strong);
}

.menu-btn.active {
  color: var(--text-strong);
}

.menu-btn.active::after {
  content: '';
  display: block;
  height: 1px;
  background: var(--brand-1);
  margin-top: 0.3rem;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.language-toggle {
  display: flex;
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
}

.language-toggle button {
  padding: 0.4rem 0.7rem;
  background: transparent;
  border: none;
  color: var(--muted);
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  font-family: inherit;
}

.language-toggle button.active {
  color: var(--text-strong);
  background: rgba(138, 108, 255, 0.15);
}

.login-btn {
  padding: 0.5rem 1rem;
  background: var(--text-strong);
  color: var(--bg);
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  font-size: 0.85rem;
  font-family: inherit;
  transition: transform 0.2s ease;
}

.login-btn:hover {
  transform: translateY(-1px);
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 50%;
  color: var(--muted);
  cursor: pointer;
  transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
  font-family: inherit;
}

.theme-toggle svg {
  width: 18px;
  height: 18px;
}

.theme-toggle:hover {
  color: var(--text-strong);
  background: rgba(138, 108, 255, 0.12);
  border-color: rgba(138, 108, 255, 0.3);
}

@media (max-width: 1000px) {
  .navbar {
    justify-content: center;
  }
  .nav-menu {
    order: 10;
    width: 100%;
  }
}
</style>