<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '../i18n'
import { useAuthStore } from '../stores/authStore'

const props = defineProps({
  activeMenu: { type: String, default: 'home' },
  theme: { type: String, default: 'dark' }
})
const { t, locale } = useI18n()
const auth = useAuthStore()
const emit = defineEmits(['menu-change', 'login', 'toggle-theme', 'auth-action'])

const lang = computed({
  get: () => locale.value.toUpperCase(),
  set: (val) => setLocale(val)
})

const menuItems = [
  { key: 'home', labelKey: 'nav.home' },
  { key: 'download', labelKey: 'nav.download' },
  { key: 'guide', labelKey: 'nav.guide' },
  { key: 'serial', labelKey: 'nav.serial' },
  { key: 'changelog', labelKey: 'nav.changelog' },
  { key: 'donate', labelKey: 'nav.donate' }
]

const userMenuOpen = ref(false)
const mobileMenuOpen = ref(false)
const initials = computed(() => {
  const u = auth.user
  if (!u) return '?'
  const name = u.displayName || u.username || u.email || '?'
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(s => s[0].toUpperCase())
    .join('') || '?'
})

const setActiveMenu = (key) => {
  closeUserMenu()
  closeMobileMenu()
  emit('menu-change', key)
}

const setLang = (l) => {
  lang.value = l
}

const handleLoginClick = () => {
  closeUserMenu()
  closeMobileMenu()
  emit('login')
}

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

const closeUserMenu = () => {
  userMenuOpen.value = false
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const handleAuthAction = (action) => {
  closeUserMenu()
  closeMobileMenu()
  emit('auth-action', action)
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

    <button
      class="menu-toggle"
      :class="{ open: mobileMenuOpen }"
      :aria-label="t('nav.menu')"
      :title="t('nav.menu')"
      @click="toggleMobileMenu"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path v-if="!mobileMenuOpen" fill="currentColor" d="M4 6h16a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zm0 5h16a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zm0 5h16a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2z"/>
        <path v-else fill="currentColor" d="M6.4 4.99a1 1 0 0 0-1.41 1.41L10.59 12l-5.6 5.6a1 1 0 1 0 1.41 1.41L12 13.41l5.6 5.6a1 1 0 0 0 1.41-1.41L13.41 12l5.6-5.6a1 1 0 0 0-1.41-1.41L12 10.59z"/>
      </svg>
    </button>

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

    <div class="nav-actions">
      <div class="language-toggle">
        <button :class="{ active: lang === 'EN' }" @click="setLang('EN')">EN</button>
        <button :class="{ active: lang === 'VI' }" @click="setLang('VI')">VI</button>
      </div>

      <div v-if="!auth.isAuthenticated" class="auth-slot">
        <button class="login-btn" @click="handleLoginClick">{{ t('nav.login') }}</button>
      </div>

      <div v-else class="user-chip-wrap">
        <button
          class="user-chip"
          :class="{ open: userMenuOpen }"
          @click="toggleUserMenu"
          :aria-label="t('account.welcome', { name: auth.user.displayName || auth.user.username })"
        >
          <span class="avatar">{{ initials }}</span>
          <span class="who">
            <span class="greet">{{ t('account.welcome', { name: auth.user.displayName || auth.user.username }) }}</span>
            <span class="email">{{ auth.user.email }}</span>
          </span>
          <svg class="chev" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M7 10l5 5 5-5z"/>
          </svg>
        </button>

        <transition name="dd">
          <div v-if="userMenuOpen" class="user-menu glass" @click.stop>
            <div class="user-menu-head">
              <strong>{{ auth.user.displayName || auth.user.username }}</strong>
              <span class="email">{{ auth.user.email }}</span>
            </div>
            <div class="user-menu-divider"></div>
            <button class="user-menu-item" @click="handleAuthAction('login')">
              <span class="ico">🔁</span>
              <span>{{ t('nav.login') }}</span>
            </button>
            <button class="user-menu-item" @click="handleAuthAction('logout')">
              <span class="ico">↩</span>
              <span>{{ t('account.logout') }}</span>
            </button>
          </div>
        </transition>
      </div>
    </div>

    <transition name="mdd">
      <div v-if="mobileMenuOpen" class="mobile-menu glass" @click.stop>
        <button
          v-for="item in menuItems"
          :key="item.key"
          :class="['mobile-menu-item', { active: props.activeMenu === item.key }]"
          @click="setActiveMenu(item.key)"
        >
          {{ t(item.labelKey) }}
        </button>

        <div class="mobile-menu-divider"></div>

        <div class="mobile-menu-section">
          <span class="mobile-menu-label">{{ t('nav.language') }}</span>
          <div class="language-toggle">
            <button :class="{ active: lang === 'EN' }" @click="setLang('EN')">EN</button>
            <button :class="{ active: lang === 'VI' }" @click="setLang('VI')">VI</button>
          </div>
        </div>

        <div v-if="!auth.isAuthenticated" class="mobile-menu-section">
          <button class="login-btn" @click="handleLoginClick">{{ t('nav.login') }}</button>
        </div>

        <div v-else class="mobile-menu-user">
          <div class="user-info">
            <span class="avatar">{{ initials }}</span>
            <div class="user-text">
              <strong>{{ auth.user.displayName || auth.user.username }}</strong>
              <span class="email">{{ auth.user.email }}</span>
            </div>
          </div>
          <button class="user-menu-item" @click="handleAuthAction('login')">
            <span class="ico">🔁</span>
            <span>{{ t('nav.login') }}</span>
          </button>
          <button class="user-menu-item" @click="handleAuthAction('logout')">
            <span class="ico">↩</span>
            <span>{{ t('account.logout') }}</span>
          </button>
        </div>
      </div>
    </transition>

    <div v-if="userMenuOpen" class="user-menu-backdrop" @click="closeUserMenu" />
    <div v-if="mobileMenuOpen" class="mobile-menu-backdrop" @click="closeMobileMenu" />
  </nav>
</template>

<style scoped>
.navbar {
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  border: 1px solid var(--glass-border);
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
  max-width: 1200px;
  border-radius: 18px;
  z-index: 50;
  font-family: 'Roboto', sans-serif;
  box-shadow: var(--shadow-strong);
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  isolation: isolate;
}

.navbar::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    var(--glass-highlight) 0%,
    transparent 35%,
    transparent 65%,
    rgba(255, 255, 255, 0.18) 100%
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

.navbar > * {
  position: relative;
  z-index: 1;
}

.nav-brand {
  cursor: pointer;
  user-select: none;
}

.nav-brand h1 {
  margin: 0;
  font-family: 'Inter', 'Be Vietnam Pro', system-ui, sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-strong);
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
  background: rgba(255, 255, 255, 0.12);
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

.user-menu-backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
}

.user-chip-wrap {
  position: relative;
}

.user-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.35rem 0.7rem 0.35rem 0.4rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--text-strong);
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
  font-family: inherit;
}

.user-chip:hover,
.user-chip.open {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.25);
}

.user-chip .avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  font-weight: 700;
  background: var(--brand-gradient);
  color: #111;
  flex-shrink: 0;
}

.user-chip .who {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.1;
  max-width: 130px;
}

.user-chip .greet {
  font-size: 0.78rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 130px;
}

.user-chip .email {
  font-size: 0.66rem;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 130px;
}

.user-chip .chev {
  width: 14px;
  height: 14px;
  color: var(--muted);
  flex-shrink: 0;
}

.user-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 0.6rem);
  min-width: 220px;
  border-radius: 14px;
  padding: 0.5rem;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-strong);
  z-index: 60;
  color: var(--text-soft);
  font-family: inherit;
}

.user-menu-head {
  padding: 0.6rem 0.7rem 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.user-menu-head strong {
  color: var(--text-strong);
  font-size: 0.9rem;
}

.user-menu-head .email {
  font-size: 0.75rem;
  color: var(--muted);
  word-break: break-all;
}

.user-menu-divider {
  height: 1px;
  background: var(--border);
  margin: 0.4rem 0;
}

.user-menu-item {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  width: 100%;
  padding: 0.5rem 0.7rem;
  background: transparent;
  border: none;
  color: var(--text-soft);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.85rem;
  border-radius: 8px;
  transition: background 0.15s ease, color 0.15s ease;
  text-align: left;
}

.user-menu-item:hover {
  background: var(--surface);
  color: var(--text-strong);
}

.user-menu-item .ico {
  font-size: 0.95rem;
}

.dd-enter-active,
.dd-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dd-enter-from,
.dd-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.theme-toggle {
  display: inline-flex;
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
  flex-shrink: 0;
}

.theme-toggle svg {
  width: 18px;
  height: 18px;
}

.theme-toggle:hover {
  color: var(--text-strong);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.theme-toggle svg {
  width: 18px;
  height: 18px;
}

.theme-toggle:hover {
  color: var(--text-strong);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.menu-toggle {
  display: none;
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
  flex-shrink: 0;
}

.menu-toggle svg {
  width: 18px;
  height: 18px;
}

.menu-toggle:hover,
.menu-toggle.open {
  color: var(--text-strong);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.mobile-menu-backdrop {
  position: fixed;
  inset: 0;
  z-index: 45;
}

.mobile-menu {
  display: none;
  position: absolute;
  top: calc(100% + 0.6rem);
  right: 1rem;
  min-width: 200px;
  border-radius: 14px;
  padding: 0.5rem;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-strong);
  z-index: 55;
  color: var(--text-soft);
  font-family: inherit;
  flex-direction: column;
  gap: 0.15rem;
}

.mobile-menu-item {
  display: block;
  width: 100%;
  padding: 0.6rem 0.8rem;
  background: transparent;
  border: none;
  color: var(--text-soft);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  text-align: left;
  border-radius: 8px;
  transition: background 0.15s ease, color 0.15s ease;
}

.mobile-menu-item:hover {
  background: var(--surface);
  color: var(--text-strong);
}

.mobile-menu-item.active {
  color: var(--text-strong);
  background: rgba(255, 255, 255, 0.08);
}

.mobile-menu-divider {
  height: 1px;
  background: var(--border);
  margin: 0.5rem 0.25rem;
}

.mobile-menu-section {
  padding: 0.4rem 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.mobile-menu-label {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  padding: 0 0.55rem;
}

.mobile-menu-section .language-toggle {
  align-self: stretch;
  display: flex;
}

.mobile-menu-section .language-toggle button {
  flex: 1;
  padding: 0.45rem 0.7rem;
}

.mobile-menu-section .login-btn {
  width: 100%;
}

.mobile-menu-user {
  padding: 0.4rem 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.mobile-menu-user .user-info {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.55rem;
}

.mobile-menu-user .user-info .avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  font-weight: 700;
  background: var(--brand-gradient);
  color: #111;
  flex-shrink: 0;
}

.mobile-menu-user .user-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.mobile-menu-user .user-text strong {
  color: var(--text-strong);
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mobile-menu-user .user-text .email {
  font-size: 0.72rem;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mdd-enter-active,
.mdd-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.mdd-enter-from,
.mdd-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 1000px) {
  .navbar {
    justify-content: center;
    padding: 0.5rem 1rem;
  }
  .nav-brand h1 {
    font-size: 1.1rem;
  }
  .menu-btn {
    padding: 0.4rem 0.5rem;
    font-size: 0.7rem;
  }
  .nav-actions {
    gap: 0.3rem;
  }
  .login-btn {
    padding: 0.4rem 0.7rem;
    font-size: 0.75rem;
  }
  .theme-toggle {
    width: 32px;
    height: 32px;
  }
  .theme-toggle svg {
    width: 16px;
    height: 16px;
  }
  .language-toggle button {
    padding: 0.3rem 0.5rem;
    font-size: 0.7rem;
  }
}

@media (max-width: 600px) {
  .navbar {
    flex-wrap: nowrap;
    overflow: visible;
    justify-content: flex-start;
    gap: 0.5rem;
  }
  .nav-brand {
    margin-right: auto;
  }
  .nav-menu {
    display: none;
  }
  .nav-actions {
    display: none;
  }
  .menu-toggle {
    display: inline-flex;
    width: 32px;
    height: 32px;
  }
  .menu-toggle svg {
    width: 16px;
    height: 16px;
  }
  .navbar > .theme-toggle {
    display: inline-flex;
    width: 32px;
    height: 32px;
  }
  .navbar > .theme-toggle svg {
    width: 16px;
    height: 16px;
  }
  .mobile-menu {
    display: flex;
  }
}
</style>