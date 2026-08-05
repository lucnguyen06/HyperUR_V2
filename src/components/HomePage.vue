<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['navigate'])

const buildKeys = ['hyperos']
const stepKeys = ['s1', 's2', 's3', 's4']
const compareKeys = ['r1', 'r2', 'r3', 'r4']
const faqKeys = ['q1', 'q2', 'q3', 'q4']

const openFaq = ref(0)
const toggleFaq = (i) => {
  openFaq.value = openFaq.value === i ? -1 : i
}

const goDownload = () => emit('navigate', 'download')
const goGuide = () => emit('navigate', 'guide')
</script>

<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-inner">
        <span class="eyebrow">{{ t('hero.eyebrow') }}</span>
        <h1 class="hero-title">
          {{ t('hero.title1') }}<br />
          <span class="grad">{{ t('hero.title2') }}</span>
        </h1>
        <p class="hero-desc">
          {{ t('hero.desc', { brand: 'HyperUR' }) }}
        </p>
        <div class="hero-cta">
          <button class="btn-primary" @click="goDownload">{{ t('hero.cta1') }}</button>
          <button class="btn-ghost" @click="goGuide">{{ t('hero.cta2') }}</button>
        </div>
      </div>
    </section>

    <!-- Builds -->
    <section class="section">
      <header class="section-header">
        <span class="kicker">{{ t('builds.kicker') }}</span>
        <h2>{{ t('builds.title') }}</h2>
      </header>

      <div class="build-grid">
        <article v-for="key in buildKeys" :key="key" class="build-card">
          <h3>{{ t(`builds.items.${key}.name`) }}</h3>
          <span>{{ t(`builds.items.${key}.tag`) }}</span>
        </article>
      </div>
    </section>

    <!-- Flash Guide -->
    <section class="section">
      <header class="section-header">
        <span class="kicker">{{ t('guide.kicker') }}</span>
        <h2>{{ t('guide.title') }}</h2>
      </header>

      <ol class="steps">
        <li v-for="(key, i) in stepKeys" :key="key" class="step">
          <span class="step-no">{{ ['01', '02', '03', '04'][i] }}</span>
          <div class="step-body">
            <h4>{{ t(`guide.steps.${key}.title`) }}</h4>
            <p>{{ t(`guide.steps.${key}.desc`) }}</p>
          </div>
        </li>
      </ol>
    </section>

    <!-- Comparison -->
    <section class="section">
      <header class="section-header">
        <span class="kicker">{{ t('compare.kicker') }}</span>
        <h2>{{ t('compare.title') }}</h2>
      </header>

      <div class="compare">
        <div class="compare-head">
          <span></span>
          <span class="col-stock">{{ t('compare.stock') }}</span>
          <span class="col-mod">{{ t('compare.mod') }}</span>
        </div>
        <div v-for="key in compareKeys" :key="key" class="compare-row">
          <span class="compare-topic">{{ t(`compare.rows.${key}.topic`) }}</span>
          <span class="col-stock">{{ t(`compare.rows.${key}.stock`) }}</span>
          <span class="col-mod">{{ t(`compare.rows.${key}.mod`) }}</span>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section">
      <header class="section-header">
        <span class="kicker">{{ t('faq.kicker') }}</span>
        <h2>{{ t('faq.title') }}</h2>
      </header>

      <div class="faq">
        <div
          v-for="(key, i) in faqKeys"
          :key="key"
          :class="['faq-item', { open: openFaq === i }]"
        >
          <button class="faq-q" @click="toggleFaq(i)">
            <span>{{ t(`faq.items.${key}.q`) }}</span>
            <span class="faq-toggle">{{ openFaq === i ? '−' : '+' }}</span>
          </button>
          <div class="faq-a" v-show="openFaq === i">
            <p>{{ t(`faq.items.${key}.a`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <h2>{{ t('cta.title') }}</h2>
      <div class="cta-actions">
        <button class="btn-primary" @click="goDownload">{{ t('cta.cta1') }}</button>
        <button class="btn-ghost" @click="goGuide">{{ t('cta.cta2') }}</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  font-family: 'Roboto', sans-serif;
  color: var(--text);
}

/* Hero */
.hero {
  padding: 7rem 2rem 5rem;
  text-align: center;
  display: flex;
  justify-content: center;
  background:
    radial-gradient(ellipse at top, rgba(138, 108, 255, 0.15), transparent 60%),
    #000;
}

.hero-inner {
  max-width: 900px;
}

.eyebrow {
  display: inline-block;
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: var(--muted);
  margin-bottom: 1.75rem;
}

.hero-title {
  font-family: 'Inter', 'Be Vietnam Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(2.8rem, 7vw, 5.2rem);
  line-height: 1.05;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
}

.grad {
  background: var(--brand-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-style: normal;
  font-weight: 600;
}

.hero-desc {
  font-size: 1.05rem;
  color: var(--muted);
  max-width: 620px;
  margin: 0 auto 2.25rem;
  line-height: 1.65;
}

.hero-desc strong {
  color: #fff;
  font-weight: 500;
}

.hero-cta {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  padding: 0.85rem 1.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  background: #fff;
  color: #000;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
  font-family: inherit;
}
.btn-primary:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.9);
}

.btn-ghost {
  padding: 0.85rem 1.75rem;
  border-radius: 8px;
  background: transparent;
  border: 1px solid var(--border);
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
  font-family: inherit;
}
.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Section */
.section {
  padding: 4.5rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.kicker {
  display: inline-block;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  color: var(--muted);
  margin-bottom: 0.75rem;
}

.section-header h2 {
  font-family: 'Inter', 'Be Vietnam Pro', system-ui, sans-serif;
  font-size: clamp(1.8rem, 3.5vw, 2.4rem);
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.02em;
}

/* Builds */
.build-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.build-card {
  padding: 1.75rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  text-align: center;
  transition: border-color 0.25s ease;
}
.build-card:hover {
  border-color: rgba(138, 108, 255, 0.4);
}

.build-card h3 {
  font-family: 'Inter', 'Be Vietnam Pro', system-ui, sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.4rem;
}

.build-card span {
  color: var(--muted);
  font-size: 0.85rem;
  letter-spacing: 0.05em;
}

/* Steps */
.steps {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.step {
  padding: 1.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.step-no {
  font-family: 'Inter', 'Be Vietnam Pro', system-ui, sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--brand-1);
  line-height: 1;
  font-style: normal;
}

.step-body h4 {
  color: #fff;
  margin-bottom: 0.4rem;
  font-size: 1.05rem;
  font-weight: 500;
}

.step-body p {
  color: var(--muted);
  line-height: 1.55;
  font-size: 0.92rem;
}

/* Comparison */
.compare {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
}

.compare-head,
.compare-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  align-items: center;
}

.compare-head {
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid var(--border);
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
}

.compare-row + .compare-row {
  border-top: 1px solid var(--border);
}

.compare-topic {
  color: #fff;
  font-weight: 500;
}

.col-stock {
  color: var(--muted);
}

.col-mod {
  color: var(--brand-1);
}

/* FAQ */
.faq {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.faq-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
}

.faq-q {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  color: #fff;
  padding: 1.1rem 1.25rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: inherit;
}

.faq-q:hover {
  background: rgba(255, 255, 255, 0.02);
}

.faq-toggle {
  font-size: 1.3rem;
  color: var(--brand-1);
  line-height: 1;
}

.faq-a {
  padding: 0 1.25rem 1.1rem;
}

.faq-a p {
  color: var(--muted);
  line-height: 1.6;
}

/* CTA */
.cta {
  padding: 5rem 2rem;
  text-align: center;
  border-top: 1px solid var(--border);
}

.cta h2 {
  font-family: 'Inter', 'Be Vietnam Pro', system-ui, sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 600;
  color: #fff;
  margin-bottom: 1.75rem;
  letter-spacing: -0.02em;
}

.cta-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 700px) {
  .compare-head,
  .compare-row {
    grid-template-columns: 1fr;
    text-align: left;
  }
  .col-stock,
  .col-mod {
    padding-left: 1rem;
  }
}
</style>