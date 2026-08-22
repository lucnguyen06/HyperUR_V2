<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/authStore'
import { useSerialStore } from '../stores/serialStore'
import { useHyperStore } from '../stores/hyperStore'

const { t } = useI18n()
const auth = useAuthStore()
const serials = useSerialStore()
const store = useHyperStore()

const emit = defineEmits(['navigate', 'need-login'])

const view = ref('lookup')
const submitError = ref(null)
const successMsg = ref(null)
const copyState = ref({})

const lookupInput = ref('')
const lookedUp = ref(null)

const registerForm = reactive({
  device: '',
  build: 'HyperUR 1.4.x',
  channel: 'stable',
  notes: ''
})

const channels = [
  { key: 'stable', label: 'Stable' },
  { key: 'beta', label: 'Beta' },
  { key: 'canary', label: 'Canary' }
]

const allBrands = computed(() => store.brands || [])
const allDevices = computed(() => {
  const out = []
  for (const brand of allBrands.value) {
    const list = store.devices[brand]?.devices || []
    for (const d of list) {
      out.push({ code: d.code, name: d.name })
    }
  }
  return out
})

const mySerials = computed(() => {
  if (!auth.user) return []
  return serials.getSerialsForUser(auth.user.username)
})

onMounted(() => {
  serials.load()
})

const switchView = (next) => {
  view.value = next
  submitError.value = null
  successMsg.value = null
  serials.error = null
}

const handleLookup = () => {
  submitError.value = null
  successMsg.value = null
  serials.error = null
  const entry = serials.lookup(lookupInput.value)
  if (!entry) {
    submitError.value = t('serial.errors.not_found')
    lookedUp.value = null
    return
  }
  lookedUp.value = entry
}

const handleRegister = async () => {
  submitError.value = null
  successMsg.value = null

  if (!auth.isAuthenticated) {
    submitError.value = t('serial.errors.need_login')
    return
  }
  if (!auth.user.username) {
    submitError.value = t('serial.errors.need_login')
    return
  }

  try {
    const entry = await serials.registerSerial({
      ownerUsername: auth.user.username,
      device: registerForm.device,
      build: registerForm.build,
      channel: registerForm.channel,
      notes: registerForm.notes
    })
    successMsg.value = t('serial.register.success', { serial: entry.serial })
    registerForm.device = ''
    registerForm.notes = ''
  } catch (e) {
    submitError.value = serials.error || e.message
  }
}

const handleUseLastIssued = () => {
  lookupInput.value = serials.lastIssued?.serial || ''
  view.value = 'lookup'
  handleLookup()
}

const handleCopy = async (serial) => {
  try {
    await navigator.clipboard.writeText(serial)
    copyState.value[serial] = true
    setTimeout(() => { copyState.value[serial] = false }, 1500)
  } catch (e) {
    const el = document.createElement('textarea')
    el.value = serial
    document.body.appendChild(el)
    el.select()
    try { document.execCommand('copy') } catch (err) { /* ignore */ }
    document.body.removeChild(el)
    copyState.value[serial] = true
    setTimeout(() => { copyState.value[serial] = false }, 1500)
  }
}

const handleRevoke = (serial) => {
  if (confirm(t('serial.confirm.revoke'))) {
    serials.revokeSerial(serial)
  }
}

const handleRenew = (serial) => {
  serials.renewSerial(serial)
}

const statusBadge = (entry) => {
  const s = serials.getStatus(entry)
  if (s === 'active') return { key: 'active', label: t('serial.status.active'), cls: 'badge-ok' }
  if (s === 'expired') return { key: 'expired', label: t('serial.status.expired'), cls: 'badge-warn' }
  if (s === 'revoked') return { key: 'revoked', label: t('serial.status.revoked'), cls: 'badge-bad' }
  return { key: s, label: s, cls: 'badge-muted' }
}

const formatDate = (iso) => {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString()
  } catch (e) {
    return iso
  }
}
</script>

<template>
  <div class="serial-page">
    <div class="serial-shell glass">
      <aside class="serial-aside">
        <div class="brand-mark">
          <span class="brand-dot" />
          <span>{{ t('serial.brand') }}</span>
        </div>

        <h2>{{ t('serial.aside.title') }}</h2>
        <p>{{ t('serial.aside.desc') }}</p>

        <ul class="aside-list">
          <li>
            <span class="ico">🔑</span>
            <div>
              <strong>{{ t('serial.aside.f1.title') }}</strong>
              <p>{{ t('serial.aside.f1.desc') }}</p>
            </div>
          </li>
          <li>
            <span class="ico">📲</span>
            <div>
              <strong>{{ t('serial.aside.f2.title') }}</strong>
              <p>{{ t('serial.aside.f2.desc') }}</p>
            </div>
          </li>
          <li>
            <span class="ico">🛡</span>
            <div>
              <strong>{{ t('serial.aside.f3.title') }}</strong>
              <p>{{ t('serial.aside.f3.desc') }}</p>
            </div>
          </li>
        </ul>

        <div class="aside-cta">
          <div class="who">
            <template v-if="auth.isAuthenticated">
              <span class="hi">{{ t('serial.aside.logged_in_as', { name: auth.user.displayName || auth.user.username }) }}</span>
              <span class="count">{{ t('serial.aside.you_have', { count: mySerials.length }) }}</span>
            </template>
            <template v-else>
              <button class="link-cta" @click="emit('need-login')">
                {{ t('serial.aside.login_first') }}
              </button>
            </template>
          </div>
        </div>
      </aside>

      <section class="serial-main">
        <header class="serial-tabs">
          <button
            :class="['tab', { active: view === 'lookup' }]"
            type="button"
            @click="switchView('lookup')"
          >
            <span class="ti">🔍</span>
            {{ t('serial.tab.lookup') }}
          </button>
          <button
            :class="['tab', { active: view === 'register' }]"
            type="button"
            @click="switchView('register')"
          >
            <span class="ti">＋</span>
            {{ t('serial.tab.register') }}
          </button>
          <button
            :class="['tab', { active: view === 'mine' }]"
            type="button"
            @click="switchView('mine')"
          >
            <span class="ti">📋</span>
            {{ t('serial.tab.mine') }}
            <span v-if="mySerials.length" class="badge-mini">{{ mySerials.length }}</span>
          </button>
        </header>

        <transition name="fade" mode="out-in">
          <!-- LOOKUP -->
          <div v-if="view === 'lookup'" key="lookup" class="pane">
            <h3>{{ t('serial.lookup.title') }}</h3>
            <p class="muted">{{ t('serial.lookup.subtitle') }}</p>

            <form class="lookup-form" @submit.prevent="handleLookup">
              <label class="field">
                <span>{{ t('serial.lookup.label') }}</span>
                <input
                  v-model="lookupInput"
                  type="text"
                  :placeholder="t('serial.lookup.placeholder')"
                  spellcheck="false"
                  autocomplete="off"
                />
              </label>
              <button type="submit" class="primary-btn" :disabled="serials.loading">
                <span v-if="!serials.loading">{{ t('serial.lookup.submit') }}</span>
                <span v-else class="spinner" />
              </button>
            </form>

            <p v-if="submitError" class="alert error">{{ submitError }}</p>

            <div v-if="serials.lastIssued && view === 'lookup' && !lookedUp" class="recent-card">
              <div>
                <strong>{{ t('serial.recent.title') }}</strong>
                <p class="muted">{{ t('serial.recent.desc') }}</p>
              </div>
              <button class="ghost-btn" @click="handleUseLastIssued">
                {{ t('serial.recent.use') }}
              </button>
            </div>

            <div v-if="lookedUp" class="result-card">
              <div class="result-head">
                <div>
                  <span class="eyebrow">{{ t('serial.result.serial') }}</span>
                  <code class="serial-code">{{ lookedUp.serial }}</code>
                </div>
                <span :class="['badge', statusBadge(lookedUp).cls]">
                  {{ statusBadge(lookedUp).label }}
                </span>
              </div>

              <dl class="kv">
                <div>
                  <dt>{{ t('serial.result.device') }}</dt>
                  <dd>{{ lookedUp.device }}</dd>
                </div>
                <div>
                  <dt>{{ t('serial.result.build') }}</dt>
                  <dd>{{ lookedUp.build }}</dd>
                </div>
                <div>
                  <dt>{{ t('serial.result.channel') }}</dt>
                  <dd>{{ lookedUp.channel }}</dd>
                </div>
                <div>
                  <dt>{{ t('serial.result.owner') }}</dt>
                  <dd>{{ lookedUp.ownerUsername }}</dd>
                </div>
                <div>
                  <dt>{{ t('serial.result.issued') }}</dt>
                  <dd>{{ formatDate(lookedUp.issuedAt) }}</dd>
                </div>
                <div>
                  <dt>{{ t('serial.result.expires') }}</dt>
                  <dd>{{ formatDate(lookedUp.expiresAt) }}</dd>
                </div>
              </dl>

              <p v-if="lookedUp.notes" class="notes">
                <span class="eyebrow">{{ t('serial.result.notes') }}</span>
                {{ lookedUp.notes }}
              </p>

              <div class="result-actions">
                <button class="ghost-btn" @click="handleCopy(lookedUp.serial)">
                  <span v-if="!copyState[lookedUp.serial]">📋 {{ t('serial.result.copy') }}</span>
                  <span v-else>✓ {{ t('serial.result.copied') }}</span>
                </button>
                <button
                  v-if="auth.isAuthenticated && auth.user.username?.toLowerCase() === lookedUp.ownerUsername.toLowerCase()"
                  class="ghost-btn"
                  @click="switchView('mine')"
                >
                  {{ t('serial.result.manage') }}
                </button>
              </div>
            </div>
          </div>

          <!-- REGISTER -->
          <form
            v-else-if="view === 'register'"
            key="register"
            class="pane"
            @submit.prevent="handleRegister"
          >
            <h3>{{ t('serial.register.title') }}</h3>
            <p class="muted">{{ t('serial.register.subtitle') }}</p>

            <div v-if="!auth.isAuthenticated" class="locked-card">
              <span class="ico-big">🔒</span>
              <strong>{{ t('serial.errors.need_login') }}</strong>
              <button type="button" class="primary-btn" @click="emit('need-login')">
                {{ t('serial.errors.go_login') }}
              </button>
            </div>

            <template v-else>
              <div class="grid-2">
                <label class="field">
                  <span>{{ t('serial.register.username') }}</span>
                  <input :value="auth.user.username" disabled />
                </label>
                <label class="field">
                  <span>{{ t('serial.register.device') }}</span>
                  <input
                    v-model="registerForm.device"
                    type="text"
                    list="device-options"
                    :placeholder="t('serial.register.device_ph')"
                    required
                  />
                  <datalist id="device-options">
                    <option v-for="d in allDevices" :key="d.code" :value="d.name.en || d.code" />
                  </datalist>
                </label>
              </div>

              <div class="grid-2">
                <label class="field">
                  <span>{{ t('serial.register.build') }}</span>
                  <input
                    v-model="registerForm.build"
                    type="text"
                    :placeholder="t('serial.register.build_ph')"
                  />
                </label>
                <label class="field">
                  <span>{{ t('serial.register.channel') }}</span>
                  <div class="seg">
                    <button
                      v-for="c in channels"
                      :key="c.key"
                      type="button"
                      :class="['seg-btn', { active: registerForm.channel === c.key }]"
                      @click="registerForm.channel = c.key"
                    >
                      {{ t(`serial.channel.${c.key}`) }}
                    </button>
                  </div>
                </label>
              </div>

              <label class="field">
                <span>{{ t('serial.register.notes') }}</span>
                <textarea
                  v-model="registerForm.notes"
                  rows="3"
                  :placeholder="t('serial.register.notes_ph')"
                />
              </label>

              <p v-if="submitError" class="alert error">{{ submitError }}</p>
              <p v-if="successMsg" class="alert success">{{ successMsg }}</p>

              <button type="submit" class="primary-btn" :disabled="serials.loading">
                <span v-if="!serials.loading">{{ t('serial.register.submit') }}</span>
                <span v-else class="spinner" />
              </button>
            </template>
          </form>

          <!-- MINE -->
          <div v-else key="mine" class="pane">
            <h3>{{ t('serial.mine.title') }}</h3>
            <p class="muted">{{ t('serial.mine.subtitle') }}</p>

            <div v-if="!auth.isAuthenticated" class="locked-card">
              <span class="ico-big">🔒</span>
              <strong>{{ t('serial.errors.need_login') }}</strong>
              <button type="button" class="primary-btn" @click="emit('need-login')">
                {{ t('serial.errors.go_login') }}
              </button>
            </div>

            <div v-else-if="mySerials.length === 0" class="empty-card">
              <span class="ico-big">🗝</span>
              <strong>{{ t('serial.mine.empty_title') }}</strong>
              <p>{{ t('serial.mine.empty_desc') }}</p>
              <button class="primary-btn" @click="switchView('register')">
                {{ t('serial.mine.empty_cta') }}
              </button>
            </div>

            <div v-else class="serial-list">
              <article
                v-for="entry in mySerials"
                :key="entry.serial"
                class="serial-item"
              >
                <header>
                  <code class="serial-code small">{{ entry.serial }}</code>
                  <span :class="['badge', statusBadge(entry).cls]">
                    {{ statusBadge(entry).label }}
                  </span>
                </header>
                <dl class="kv compact">
                  <div>
                    <dt>{{ t('serial.result.device') }}</dt>
                    <dd>{{ entry.device }}</dd>
                  </div>
                  <div>
                    <dt>{{ t('serial.result.build') }}</dt>
                    <dd>{{ entry.build }}</dd>
                  </div>
                  <div>
                    <dt>{{ t('serial.result.channel') }}</dt>
                    <dd>{{ t(`serial.channel.${entry.channel}`) }}</dd>
                  </div>
                  <div>
                    <dt>{{ t('serial.result.expires') }}</dt>
                    <dd>{{ formatDate(entry.expiresAt) }}</dd>
                  </div>
                </dl>
                <p v-if="entry.notes" class="notes mini">{{ entry.notes }}</p>
                <footer>
                  <button class="ghost-btn" @click="handleCopy(entry.serial)">
                    <span v-if="!copyState[entry.serial]">📋 {{ t('serial.result.copy') }}</span>
                    <span v-else>✓ {{ t('serial.result.copied') }}</span>
                  </button>
                  <button
                    v-if="statusBadge(entry).key === 'expired'"
                    class="ghost-btn"
                    @click="handleRenew(entry.serial)"
                  >
                    🔄 {{ t('serial.action.renew') }}
                  </button>
                  <button
                    v-if="statusBadge(entry).key === 'active'"
                    class="ghost-btn danger"
                    @click="handleRevoke(entry.serial)"
                  >
                    ✕ {{ t('serial.action.revoke') }}
                  </button>
                </footer>
              </article>
            </div>
          </div>
        </transition>
      </section>
    </div>
  </div>
</template>

<style scoped>
.serial-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.25rem;
  font-family: 'Roboto', sans-serif;
}

.serial-shell {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  border-radius: 22px;
  overflow: hidden;
  min-height: 580px;
  background: var(--glass-bg);
}

.serial-aside {
  padding: 2.5rem 2rem;
  background:
    radial-gradient(ellipse at 0% 0%, rgba(255, 255, 255, 0.08), transparent 60%),
    radial-gradient(ellipse at 100% 100%, rgba(255, 255, 255, 0.05), transparent 55%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.01));
  border-right: 1px solid var(--glass-border);
  display: flex;
  flex-direction: column;
  color: var(--text-soft);
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  color: var(--text-strong);
  margin-bottom: 1.5rem;
}

.brand-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--brand-gradient);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
}

.serial-aside h2 {
  margin: 0 0 0.75rem;
  font-size: 1.7rem;
  color: var(--text-strong);
  font-family: 'Inter', sans-serif;
}

.serial-aside > p {
  margin: 0 0 1.5rem;
  color: var(--muted);
  line-height: 1.6;
  font-size: 0.95rem;
}

.aside-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.aside-list li {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
}

.aside-list .ico {
  font-size: 1.3rem;
  line-height: 1;
  flex-shrink: 0;
}

.aside-list strong {
  display: block;
  color: var(--text-strong);
  margin-bottom: 0.2rem;
  font-size: 0.95rem;
}

.aside-list p {
  color: var(--muted);
  font-size: 0.85rem;
  margin: 0;
  line-height: 1.5;
}

.aside-cta {
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  font-size: 0.85rem;
}

.aside-cta .who {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.aside-cta .hi {
  color: var(--text-strong);
}

.aside-cta .count {
  color: var(--muted);
  font-size: 0.8rem;
}

.link-cta {
  background: transparent;
  border: 1px solid var(--border-strong);
  color: var(--text-strong);
  padding: 0.5rem 0.9rem;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.85rem;
}

.link-cta:hover {
  background: var(--surface);
}

.serial-main {
  padding: 2.25rem 2rem;
  display: flex;
  flex-direction: column;
  color: var(--text-soft);
}

.serial-tabs {
  display: flex;
  gap: 0.4rem;
  background: var(--surface);
  padding: 0.35rem;
  border-radius: 10px;
  border: 1px solid var(--border);
  margin-bottom: 1.5rem;
  align-self: flex-start;
  flex-wrap: wrap;
}

.tab {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: transparent;
  border: none;
  padding: 0.55rem 0.9rem;
  border-radius: 8px;
  color: var(--muted);
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  position: relative;
}

.tab.active {
  background: var(--text-strong);
  color: var(--bg);
  box-shadow: var(--shadow);
}

.tab:hover:not(.active) {
  color: var(--text-strong);
}

.tab .ti {
  font-size: 0.95rem;
}

.badge-mini {
  background: var(--bg);
  color: var(--text-strong);
  padding: 0 0.4rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  margin-left: 0.2rem;
}

.tab.active .badge-mini {
  background: var(--text-strong);
  color: var(--bg);
}

.pane {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pane h3 {
  margin: 0;
  color: var(--text-strong);
  font-size: 1.35rem;
  font-family: 'Inter', sans-serif;
}

.muted {
  color: var(--muted);
  font-size: 0.9rem;
  margin: 0;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field > span {
  font-size: 0.78rem;
  color: var(--muted);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.field input,
.field textarea {
  background: var(--input-bg);
  border: 1px solid var(--input-border);
  border-radius: 10px;
  padding: 0.7rem 0.85rem;
  color: var(--text-strong);
  font-size: 0.95rem;
  font-family: inherit;
  transition: border-color 0.2s ease;
  outline: none;
  width: 100%;
  resize: vertical;
}

.field input:focus,
.field textarea:focus {
  border-color: var(--text-strong);
}

.field input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.field input::placeholder,
.field textarea::placeholder {
  color: var(--input-placeholder);
}

.lookup-form {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.75rem;
  align-items: end;
}

.lookup-form .field {
  min-width: 0;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.seg {
  display: flex;
  background: var(--surface);
  border: 1px solid var(--input-border);
  border-radius: 10px;
  padding: 0.25rem;
  gap: 0.25rem;
}

.seg-btn {
  flex: 1;
  background: transparent;
  border: none;
  padding: 0.5rem 0.6rem;
  border-radius: 7px;
  color: var(--muted);
  font-size: 0.85rem;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;
}

.seg-btn.active {
  background: var(--text-strong);
  color: var(--bg);
}

.seg-btn:hover:not(.active) {
  color: var(--text-strong);
}

.primary-btn {
  background: var(--text-strong);
  color: var(--bg);
  border: none;
  border-radius: 10px;
  padding: 0.85rem 1.1rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  font-family: inherit;
  transition: transform 0.15s ease, opacity 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
}

.primary-btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.primary-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ghost-btn {
  background: transparent;
  border: 1px solid var(--border-strong);
  color: var(--text-strong);
  border-radius: 10px;
  padding: 0.55rem 0.9rem;
  font-size: 0.85rem;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s ease;
}

.ghost-btn:hover {
  background: var(--surface);
}

.ghost-btn.danger {
  border-color: rgba(255, 86, 86, 0.35);
  color: #ff8a8a;
}

.ghost-btn.danger:hover {
  background: rgba(255, 86, 86, 0.12);
}

.alert {
  margin: 0;
  padding: 0.7rem 0.9rem;
  border-radius: 8px;
  font-size: 0.85rem;
  line-height: 1.45;
  border: 1px solid transparent;
}

.alert.error {
  background: rgba(255, 86, 86, 0.12);
  color: #ff8a8a;
  border-color: rgba(255, 86, 86, 0.3);
}

.alert.success {
  background: rgba(86, 255, 142, 0.1);
  color: #6fe79a;
  border-color: rgba(86, 255, 142, 0.3);
}

.recent-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: var(--surface);
  border: 1px dashed var(--border-strong);
  border-radius: 12px;
  padding: 1rem 1.1rem;
}

.recent-card strong {
  color: var(--text-strong);
  display: block;
  margin-bottom: 0.25rem;
}

.result-card {
  background: var(--surface);
  border: 1px solid var(--border-strong);
  border-radius: 14px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.result-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.serial-code {
  font-family: 'JetBrains Mono', 'Menlo', 'Consolas', monospace;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--text-strong);
  background: var(--input-bg);
  padding: 0.4rem 0.7rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  display: inline-block;
}

.serial-code.small {
  font-size: 0.9rem;
}

.eyebrow {
  display: block;
  font-size: 0.7rem;
  color: var(--muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 0.35rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border: 1px solid transparent;
}

.badge-ok {
  background: rgba(86, 255, 142, 0.12);
  color: #6fe79a;
  border-color: rgba(86, 255, 142, 0.3);
}

.badge-warn {
  background: rgba(255, 200, 86, 0.12);
  color: #ffd86b;
  border-color: rgba(255, 200, 86, 0.3);
}

.badge-bad {
  background: rgba(255, 86, 86, 0.12);
  color: #ff8a8a;
  border-color: rgba(255, 86, 86, 0.3);
}

.badge-muted {
  background: var(--surface);
  color: var(--muted);
  border-color: var(--border);
}

.kv {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem 1.25rem;
  margin: 0;
}

.kv.compact {
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem 0.9rem;
}

.kv > div {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.kv dt {
  font-size: 0.7rem;
  color: var(--muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.kv dd {
  margin: 0;
  color: var(--text-strong);
  font-size: 0.9rem;
}

.notes {
  margin: 0;
  padding: 0.75rem 0.9rem;
  border-left: 2px solid var(--border-strong);
  background: var(--surface);
  border-radius: 0 8px 8px 0;
  font-size: 0.85rem;
  color: var(--text-soft);
}

.notes.mini {
  padding: 0.5rem 0.7rem;
  font-size: 0.8rem;
}

.result-actions,
.serial-item footer {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.serial-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 1.1rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.serial-item header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.empty-card,
.locked-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.6rem;
  padding: 2.5rem 1.5rem;
  background: var(--surface);
  border: 1px dashed var(--border-strong);
  border-radius: 14px;
}

.empty-card .ico-big,
.locked-card .ico-big {
  font-size: 2.5rem;
  margin-bottom: 0.4rem;
}

.empty-card strong,
.locked-card strong {
  color: var(--text-strong);
  font-size: 1rem;
}

.empty-card p {
  color: var(--muted);
  margin: 0;
  max-width: 380px;
  font-size: 0.9rem;
}

.serial-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.spinner {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-top-color: var(--bg);
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 900px) {
  .serial-shell {
    grid-template-columns: 1fr;
  }
  .serial-aside {
    border-right: none;
    border-bottom: 1px solid var(--glass-border);
    padding: 2rem 1.5rem;
  }
  .aside-list {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .aside-list li {
    flex: 1 1 200px;
  }
}

@media (max-width: 600px) {
  .serial-page {
    padding: 1rem 0.75rem;
  }
  .serial-main {
    padding: 1.5rem 1.25rem;
  }
  .grid-2,
  .lookup-form,
  .kv {
    grid-template-columns: 1fr;
  }
  .serial-tabs {
    width: 100%;
  }
  .tab {
    flex: 1;
    justify-content: center;
  }
  .lookup-form button.primary-btn {
    width: 100%;
  }
}
</style>