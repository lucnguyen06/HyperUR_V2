<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const sections = [
  { id: 'prep',     icon: '📦' },
  { id: 'recovery', icon: '🔧' },
  { id: 'flash',    icon: '📲' },
  { id: 'fastboot', icon: '💻' },
  { id: 'wipe',     icon: '🧹' },
  { id: 'errors',   icon: '⚠️' },
  { id: 'faq',      icon: '❓' }
]

const activeId = ref('prep')

const goTo = (id) => {
  activeId.value = id
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Build a simple structured list of guide keys to render lists cleanly
const prepDeviceItems    = computed(() => tm('guide.prep.deviceItems') || [])
const prepComputerItems  = computed(() => tm('guide.prep.computerItems') || [])
const prepFilesItems     = computed(() => tm('guide.prep.filesItems') || [])
const prepBackupsItems   = computed(() => tm('guide.prep.backupItems') || [])

const twrpSteps    = computed(() => tm('guide.recovery.twrpSteps') || [])
const ofrpSteps    = computed(() => tm('guide.recovery.ofrpSteps') || [])

const flashSteps     = computed(() => tm('guide.flash.steps') || [])
const fastbootSteps  = computed(() => tm('guide.fastboot.steps') || [])

const wipeBeforeItems = computed(() => tm('guide.wipe.beforeItems') || [])
const wipeSwitchItems = computed(() => tm('guide.wipe.switchItems') || [])
const restoreItems    = computed(() => tm('guide.restore.items') || [])

const errorItems    = computed(() => tm('guide.errors.items') || [])
const faqItems      = computed(() => tm('guide.faq.items') || [])
</script>

<template>
  <div class="guide-page">
    <!-- Hero -->
    <header class="guide-hero">
      <span class="eyebrow">{{ t('guide.hero.eyebrow') }}</span>
      <h1 class="title">{{ t('guide.hero.title') }}</h1>
      <p class="desc">{{ t('guide.hero.desc') }}</p>
    </header>

    <div class="guide-layout">
      <!-- Sticky TOC -->
      <aside class="toc glass">
        <h4 class="toc-title">{{ t('guide.tocTitle') }}</h4>
        <ul class="toc-list">
          <li v-for="s in sections" :key="s.id">
            <button
              :class="['toc-link', { active: activeId === s.id }]"
              @click="goTo(s.id)"
            >
              <span class="toc-icon">{{ s.icon }}</span>
              <span>{{ t(`guide.sections.${s.id}`) }}</span>
            </button>
          </li>
        </ul>
      </aside>

      <!-- Content -->
      <main class="guide-content">
        <!-- 1. Chuẩn bị -->
        <section id="prep" class="guide-section glass">
          <header class="section-header">
            <span class="icon">📦</span>
            <h2>{{ t('guide.prep.title') }}</h2>
            <p class="section-desc">{{ t('guide.prep.desc') }}</p>
          </header>

          <div class="block">
            <h3 class="block-title">{{ t('guide.prep.deviceTitle') }}</h3>
            <ul class="check-list">
              <li v-for="(item, i) in prepDeviceItems" :key="i">
                <span class="bullet">✓</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="block">
            <h3 class="block-title">{{ t('guide.prep.computerTitle') }}</h3>
            <ul class="check-list">
              <li v-for="(item, i) in prepComputerItems" :key="i">
                <span class="bullet">✓</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="block">
            <h3 class="block-title">{{ t('guide.prep.filesTitle') }}</h3>
            <ul class="check-list">
              <li v-for="(item, i) in prepFilesItems" :key="i">
                <span class="bullet">✓</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="callout warn">
            <span class="callout-icon">⚠️</span>
            <span>{{ t('guide.prep.backupWarn') }}</span>
          </div>

          <div class="block">
            <h3 class="block-title">{{ t('guide.prep.backupTitle') }}</h3>
            <ul class="check-list">
              <li v-for="(item, i) in prepBackupsItems" :key="i">
                <span class="bullet">✓</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </section>

        <!-- 2. Cài Recovery -->
        <section id="recovery" class="guide-section glass">
          <header class="section-header">
            <span class="icon">🔧</span>
            <h2>{{ t('guide.recovery.title') }}</h2>
            <p class="section-desc">{{ t('guide.recovery.desc') }}</p>
          </header>

          <div class="block">
            <h3 class="block-title">{{ t('guide.recovery.twrpTitle') }}</h3>
            <ol class="step-list">
              <li v-for="(step, i) in twrpSteps" :key="i">
                <span class="step-no">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="step-text">{{ step }}</span>
              </li>
            </ol>
            <div class="code-block">
              <code>fastboot flash recovery_ab twrp.img</code>
            </div>
            <div class="code-block">
              <code>fastboot boot twrp.img</code>
            </div>
          </div>

          <div class="block">
            <h3 class="block-title">{{ t('guide.recovery.ofrpTitle') }}</h3>
            <ol class="step-list">
              <li v-for="(step, i) in ofrpSteps" :key="i">
                <span class="step-no">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="step-text">{{ step }}</span>
              </li>
            </ol>
          </div>
        </section>

        <!-- 3. Flash qua Recovery -->
        <section id="flash" class="guide-section glass">
          <header class="section-header">
            <span class="icon">📲</span>
            <h2>{{ t('guide.flash.title') }}</h2>
            <p class="section-desc">{{ t('guide.flash.desc') }}</p>
          </header>

          <ol class="step-list">
            <li v-for="(step, i) in flashSteps" :key="i">
              <span class="step-no">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="step-text">{{ step }}</span>
            </li>
          </ol>
        </section>

        <!-- 4. Flash qua Fastboot -->
        <section id="fastboot" class="guide-section glass">
          <header class="section-header">
            <span class="icon">💻</span>
            <h2>{{ t('guide.fastboot.title') }}</h2>
            <p class="section-desc">{{ t('guide.fastboot.desc') }}</p>
          </header>

          <ol class="step-list">
            <li v-for="(step, i) in fastbootSteps" :key="i">
              <span class="step-no">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="step-text">{{ step }}</span>
            </li>
          </ol>

          <div class="callout info">
            <span class="callout-icon">💻</span>
            <span>{{ t('guide.fastboot.toolHint') }}</span>
          </div>

          <div class="callout warn">
            <span class="callout-icon">⚠️</span>
            <span>{{ t('guide.fastboot.warn') }}</span>
          </div>
        </section>

        <!-- 5. Wipe & Restore -->
        <section id="wipe" class="guide-section glass">
          <header class="section-header">
            <span class="icon">🧹</span>
            <h2>{{ t('guide.wipe.title') }}</h2>
            <p class="section-desc">{{ t('guide.wipe.desc') }}</p>
          </header>

          <div class="block">
            <h3 class="block-title">{{ t('guide.wipe.beforeTitle') }}</h3>
            <ul class="check-list">
              <li v-for="(item, i) in wipeBeforeItems" :key="i">
                <span class="bullet">✓</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="block">
            <h3 class="block-title">{{ t('guide.wipe.switchTitle') }}</h3>
            <ul class="check-list">
              <li v-for="(item, i) in wipeSwitchItems" :key="i">
                <span class="bullet">✓</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="block">
            <h3 class="block-title">{{ t('guide.restore.title') }}</h3>
            <ul class="check-list">
              <li v-for="(item, i) in restoreItems" :key="i">
                <span class="bullet">✓</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="callout warn">
            <span class="callout-icon">⚠️</span>
            <span>{{ t('guide.restore.warn') }}</span>
          </div>
        </section>

        <!-- 6. Lỗi thường gặp -->
        <section id="errors" class="guide-section glass">
          <header class="section-header">
            <span class="icon">⚠️</span>
            <h2>{{ t('guide.errors.title') }}</h2>
            <p class="section-desc">{{ t('guide.errors.desc') }}</p>
          </header>

          <div
            v-for="(item, i) in errorItems"
            :key="i"
            class="error-item"
          >
            <h3 class="error-title">
              <span class="error-icon">❗</span>
              {{ item.title }}
            </h3>
            <p class="error-cause">
              <strong>{{ t('guide.errors.causeLabel') }}:</strong> {{ item.cause }}
            </p>
            <div class="error-fix">
              <strong>{{ t('guide.errors.fixLabel') }}:</strong>
              <ol class="fix-list">
                <li v-for="(fix, j) in item.fixes" :key="j">{{ fix }}</li>
              </ol>
            </div>
          </div>
        </section>

        <!-- 7. FAQ -->
        <section id="faq" class="guide-section glass">
          <header class="section-header">
            <span class="icon">❓</span>
            <h2>{{ t('guide.faq.title') }}</h2>
            <p class="section-desc">{{ t('guide.faq.desc') }}</p>
          </header>

          <div
            v-for="(item, i) in faqItems"
            :key="i"
            class="faq-item"
          >
            <h3 class="faq-q">{{ item.q }}</h3>
            <p class="faq-a">{{ item.a }}</p>
          </div>
        </section>

        <!-- Bottom CTA -->
        <section class="guide-cta glass">
          <h2>{{ t('guide.cta.title') }}</h2>
          <p>{{ t('guide.cta.desc') }}</p>
          <button class="btn-primary" @click="$emit('navigate', 'download')">
            {{ t('guide.cta.btn') }}
          </button>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.guide-page {
  font-family: 'Roboto', sans-serif;
  color: var(--text);
  padding: 5rem 1.5rem 4rem;
}

/* Hero */
.guide-hero {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
}

.eyebrow {
  display: inline-block;
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: var(--muted);
  margin-bottom: 1.25rem;
}

.title {
  font-family: 'Inter', 'Be Vietnam Pro', system-ui, sans-serif;
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  line-height: 1.1;
  font-weight: 600;
  color: var(--text-strong);
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}

.desc {
  color: var(--muted);
  font-size: 1.02rem;
  line-height: 1.6;
  max-width: 640px;
  margin: 0 auto;
}

/* Layout */
.guide-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* TOC */
.toc {
  position: sticky;
  top: 6rem;
  align-self: start;
  padding: 1.25rem;
  border-radius: 16px;
  max-height: calc(100vh - 7rem);
  overflow-y: auto;
}

.toc-title {
  margin: 0 0 1rem;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: var(--muted);
  text-transform: uppercase;
}

.toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.toc-link {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.7rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  color: var(--muted);
  cursor: pointer;
  font-size: 0.88rem;
  text-align: left;
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  font-family: inherit;
}

.toc-link:hover {
  color: var(--text-strong);
  background: var(--surface);
}

.toc-link.active {
  color: var(--text-strong);
  background: var(--surface);
  border-color: var(--border);
}

.toc-icon {
  font-size: 1rem;
  flex-shrink: 0;
}

/* Content */
.guide-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.guide-section {
  padding: 2rem;
  border-radius: 16px;
  scroll-margin-top: 5rem;
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-header .icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.4rem;
}

.section-header h2 {
  margin: 0 0 0.4rem;
  font-family: 'Inter', 'Be Vietnam Pro', system-ui, sans-serif;
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--text-strong);
  letter-spacing: -0.01em;
}

.section-desc {
  margin: 0;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.55;
}

/* Blocks */
.block {
  margin-bottom: 1.5rem;
}

.block:last-child {
  margin-bottom: 0;
}

.block-title {
  margin: 0 0 0.75rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-strong);
}

/* Lists */
.check-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.check-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  color: var(--text-soft);
  line-height: 1.55;
  font-size: 0.93rem;
}

.bullet {
  color: var(--brand-1);
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
}

.step-list {
  list-style: none;
  margin: 0;
  padding: 0;
  counter-reset: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.step-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 0.75rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text-soft);
  line-height: 1.55;
  font-size: 0.93rem;
}

.step-no {
  font-family: 'Inter', 'Be Vietnam Pro', system-ui, sans-serif;
  font-weight: 600;
  color: var(--brand-1);
  font-size: 1rem;
  flex-shrink: 0;
  line-height: 1.4;
}

.step-text {
  flex: 1;
}

/* Code blocks */
.code-block {
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.75rem 1rem;
  margin: 0.75rem 0 0;
  overflow-x: auto;
  font-family: 'Menlo', 'Consolas', 'Monaco', monospace;
}

[data-theme="light"] .code-block {
  background: rgba(15, 23, 42, 0.06);
}

.code-block code {
  color: #c9d4ff;
  font-size: 0.88rem;
  white-space: nowrap;
}

[data-theme="light"] .code-block code {
  color: #1e293b;
}

.code-block + .code-block {
  margin-top: 0.5rem;
}

/* Callouts */
.callout {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  padding: 0.9rem 1.1rem;
  border-radius: 10px;
  margin-top: 1rem;
  font-size: 0.92rem;
  line-height: 1.5;
  border: 1px solid var(--border);
}

.callout.warn {
  background: rgba(245, 158, 11, 0.08);
  border-color: rgba(245, 158, 11, 0.3);
  color: var(--text-soft);
}

.callout.info {
  background: rgba(59, 130, 246, 0.08);
  border-color: rgba(59, 130, 246, 0.3);
  color: var(--text-soft);
}

.callout-icon {
  flex-shrink: 0;
  font-size: 1.1rem;
}

/* Errors */
.error-item {
  padding: 1.1rem 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  margin-bottom: 0.85rem;
}

.error-item:last-child {
  margin-bottom: 0;
}

.error-title {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-strong);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.error-icon {
  flex-shrink: 0;
}

.error-cause,
.error-fix {
  margin: 0 0 0.4rem;
  font-size: 0.9rem;
  color: var(--text-soft);
  line-height: 1.55;
}

.error-fix {
  margin-bottom: 0;
}

.fix-list {
  margin: 0.4rem 0 0;
  padding-left: 1.2rem;
}

.fix-list li {
  margin-bottom: 0.25rem;
}

/* FAQ */
.faq-item {
  padding: 1rem 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  margin-bottom: 0.75rem;
}

.faq-item:last-child {
  margin-bottom: 0;
}

.faq-q {
  margin: 0 0 0.4rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-strong);
}

.faq-a {
  margin: 0;
  color: var(--muted);
  font-size: 0.92rem;
  line-height: 1.6;
}

/* CTA */
.guide-cta {
  margin-top: 1rem;
  padding: 3rem 2rem;
  border-radius: 16px;
  text-align: center;
}

.guide-cta h2 {
  margin: 0 0 0.5rem;
  font-family: 'Inter', 'Be Vietnam Pro', system-ui, sans-serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  color: var(--text-strong);
}

.guide-cta p {
  margin: 0 0 1.5rem;
  color: var(--muted);
  font-size: 0.95rem;
}

.btn-primary {
  padding: 0.85rem 1.75rem;
  border-radius: 8px;
  border: 1px solid var(--text-strong);
  background: var(--text-strong);
  color: var(--bg);
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
  font-family: inherit;
  font-size: 0.95rem;
}

.btn-primary:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.9);
}

[data-theme="light"] .btn-primary:hover {
  background: rgba(15, 23, 42, 0.9);
}

/* Responsive */
@media (max-width: 900px) {
  .guide-layout {
    grid-template-columns: 1fr;
  }
  .toc {
    position: static;
    max-height: none;
  }
  .toc-list {
    flex-direction: row;
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 0.5rem;
  }
  .toc-link {
    white-space: nowrap;
  }
  .guide-section {
    padding: 1.5rem;
  }
}
</style>