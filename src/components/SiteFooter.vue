<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['navigate'])

const navKeys = ['home', 'download', 'guide']
const communityKeys = ['changelog', 'donate']
const accountKeys = ['login', 'register']

const go = (key) => emit('navigate', key)
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <h3>{{ t('footer.brand') }}</h3>
        <p>{{ t('footer.tagline') }}</p>
      </div>

      <div class="footer-col">
        <h4>{{ t('footer.cols.nav.title') }}</h4>
        <ul>
          <li v-for="key in navKeys" :key="key">
            <a href="#" @click.prevent="go(key)">{{ t(`footer.cols.nav.${key}`) }}</a>
          </li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>{{ t('footer.cols.community.title') }}</h4>
        <ul>
          <li v-for="key in communityKeys" :key="key">
            <a href="#" @click.prevent="go(key)">{{ t(`footer.cols.community.${key}`) }}</a>
          </li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>{{ t('footer.cols.account.title') }}</h4>
        <ul>
          <li v-for="key in accountKeys" :key="key">
            <a href="#" @click.prevent="go(key)">{{ t(`footer.cols.account.${key}`) }}</a>
          </li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>{{ t('footer.social.title') }}</h4>
        <ul class="social-list">
          <li>
            <a href="https://t.me/hypermodupdate" target="_blank" rel="noopener noreferrer">
              <svg class="tg-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.24 3.64 11.95c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.84.42z"/>
              </svg>
              <span>{{ t('footer.social.channel') }}</span>
            </a>
          </li>
          <li>
            <a href="https://t.me/HuperUltraRateChat" target="_blank" rel="noopener noreferrer">
              <svg class="tg-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.24 3.64 11.95c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.84.42z"/>
              </svg>
              <span>{{ t('footer.social.chat') }}</span>
            </a>
          </li>
          <li class="devs-label">{{ t('footer.social.devs') }}</li>
          <li class="dev-row">
            <a href="https://t.me/Usagi79" target="_blank" rel="noopener noreferrer" class="dev-link">
              <img
                class="tg-avatar"
                src="https://t.me/i/userpic/160/Usagi79.jpg"
                alt="Usagi"
                loading="lazy"
                @error="$event.target.style.display='none'"
              />
              <svg class="tg-icon tg-icon-fallback" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.24 3.64 11.95c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.84.42z"/>
              </svg>
              <span>{{ t('footer.social.dev1') }}</span>
            </a>
            <a href="https://t.me/lcnguy06" target="_blank" rel="noopener noreferrer" class="dev-link">
              <img
                class="tg-avatar"
                src="https://t.me/i/userpic/160/lcnguy06.jpg"
                alt="Rio"
                loading="lazy"
                @error="$event.target.style.display='none'"
              />
              <svg class="tg-icon tg-icon-fallback" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.24 3.64 11.95c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.84.42z"/>
              </svg>
              <span>{{ t('footer.social.dev2') }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <span class="flag">🇻🇳</span>
      <span class="byline">{{ t('footer.byline') }}</span>
      <span class="copy">{{ t('footer.copy') }}</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  border-top: 1px solid var(--glass-border);
  padding: 3.5rem 2rem 1.5rem;
  margin-top: auto;
  font-family: 'Roboto', sans-serif;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  isolation: isolate;
}

.footer::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    transparent 60%,
    rgba(138, 108, 255, 0.05) 100%
  );
  pointer-events: none;
  z-index: -1;
}

.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.2fr;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.footer-brand h3 {
  font-family: 'Inter', 'Be Vietnam Pro', system-ui, sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  background: var(--brand-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0 0 0.6rem;
}

.footer-brand p {
  color: var(--muted);
  line-height: 1.6;
  font-size: 0.9rem;
  max-width: 320px;
}

.footer-col h4 {
  color: var(--text-strong);
  margin: 0 0 1rem;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 500;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-col a {
  color: var(--muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.footer-col a:hover {
  color: var(--text-strong);
}

.footer-bottom {
  max-width: 1100px;
  margin: 0 auto;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: var(--muted);
  text-transform: uppercase;
}

.flag {
  font-size: 1rem;
  letter-spacing: 0;
}

@media (max-width: 1000px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 600px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr;
  }
}

.social-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.social-list a {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: var(--muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.social-list a:hover {
  color: var(--text-strong);
}

.tg-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: #2aabee;
}

.social-list a:hover .tg-icon {
  color: var(--text-strong);
}

.devs-label {
  margin-top: 0.6rem;
  color: var(--muted);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  list-style: none;
}

.dev-row {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.dev-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.82rem;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.dev-link:hover {
  background: rgba(42, 171, 238, 0.12);
  border-color: rgba(42, 171, 238, 0.4);
  color: var(--text-strong);
}

.tg-avatar {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  background: var(--surface);
}

.dev-link .tg-icon-fallback {
  display: none;
}

.dev-link:hover .tg-avatar {
  border-color: rgba(42, 171, 238, 0.4);
}

@media (max-width: 480px) {
  .footer-inner {
    grid-template-columns: 1fr;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 0.4rem;
    text-align: center;
  }
}
</style>