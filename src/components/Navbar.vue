<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '../i18n'

const props = defineProps({
  activeMenu: { type: String, default: 'home' }
})
const { t, locale } = useI18n()
const emit = defineEmits(['menu-change', 'login'])

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
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: white;
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
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
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
  color: #fff;
}

.menu-btn.active {
  color: #fff;
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
  color: #fff;
  background: rgba(138, 108, 255, 0.15);
}

.login-btn {
  padding: 0.5rem 1rem;
  background: #fff;
  color: #000;
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