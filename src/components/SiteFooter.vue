<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['navigate'])

const navKeys = ['home', 'download', 'guide', 'features']
const communityKeys = ['changelog', 'support', 'donate']
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
  background: #000;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 3.5rem 2rem 1.5rem;
  margin-top: auto;
  font-family: 'Roboto', sans-serif;
}

.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
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
  color: #fff;
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
  color: #fff;
}

.footer-bottom {
  max-width: 1100px;
  margin: 0 auto;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
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

@media (max-width: 800px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr;
  }
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