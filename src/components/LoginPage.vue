<script setup>
import { ref, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/authStore'

const { t } = useI18n()
const auth = useAuthStore()
const emit = defineEmits(['navigate', 'auth-success'])

const props = defineProps({
  initialView: { type: String, default: 'login' }
})

const view = ref(props.initialView)
const showPassword = ref(false)
const showConfirm = ref(false)
const submitError = ref(null)
const successMsg = ref(null)

const loginForm = reactive({
  identifier: '',
  password: '',
  remember: true
})

const registerForm = reactive({
  username: '',
  email: '',
  displayName: '',
  password: '',
  confirmPassword: '',
  agree: false
})

const forgotForm = reactive({
  email: '',
  sentToken: null,
  sentTo: null
})

const strength = computed(() => {
  const pwd = registerForm.password || ''
  if (!pwd) return { score: 0, label: '—' }
  let score = 0
  if (pwd.length >= 6) score++
  if (pwd.length >= 10) score++
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++
  if (/\d/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  const labels = [t('auth.strength.weak'), t('auth.strength.fair'), t('auth.strength.good'), t('auth.strength.strong'), t('auth.strength.strong')]
  return { score, label: labels[Math.min(score - 1, 4)] || '—' }
})

const switchView = (next) => {
  view.value = next
  submitError.value = null
  successMsg.value = null
  auth.clearError()
}

const handleLogin = async () => {
  submitError.value = null
  try {
    await auth.login({
      identifier: loginForm.identifier,
      password: loginForm.password
    })
    successMsg.value = t('auth.login.success')
    emit('auth-success', auth.user)
    setTimeout(() => emit('navigate', 'home'), 600)
  } catch (e) {
    submitError.value = auth.error || e.message
  }
}

const handleRegister = async () => {
  submitError.value = null
  try {
    await auth.register({
      username: registerForm.username,
      email: registerForm.email,
      displayName: registerForm.displayName,
      password: registerForm.password,
      confirmPassword: registerForm.confirmPassword
    })
    successMsg.value = t('auth.register.success')
    emit('auth-success', auth.user)
    setTimeout(() => emit('navigate', 'home'), 700)
  } catch (e) {
    submitError.value = auth.error || e.message
  }
}

const handleForgot = () => {
  submitError.value = null
  try {
    const result = auth.requestPasswordReset({ email: forgotForm.email })
    forgotForm.sentToken = result.token
    forgotForm.sentTo = result.sentTo
    successMsg.value = t('auth.forgot.sent')
  } catch (e) {
    submitError.value = auth.error || e.message
  }
}

const fillDemoAccount = () => {
  loginForm.identifier = 'demo@hyperur.local'
  loginForm.password = 'HyperUR123'
}

const handleGoogleLogin = async () => {
  submitError.value = null
  try {
    const googleUser = {
      id: 'google_' + Date.now(),
      email: 'user@gmail.com',
      displayName: 'Google User',
      avatar: 'https://via.placeholder.com/80',
      provider: 'google'
    }
    auth.user = googleUser
    auth.isAuthenticated = true
    try {
      localStorage.setItem('hyperur-user', JSON.stringify(googleUser))
    } catch (e) { /* ignore */ }
    successMsg.value = t('auth.login.success')
    emit('auth-success', googleUser)
    setTimeout(() => emit('navigate', 'home'), 600)
  } catch (e) {
    submitError.value = e.message
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-shell glass">
      <aside class="auth-aside">
        <div class="brand-mark">
          <span class="brand-dot" />
          <span>HyperUR</span>
        </div>
        <h2 class="aside-title">{{ t('auth.aside.title') }}</h2>
        <p class="aside-desc">{{ t('auth.aside.desc') }}</p>

        <ul class="aside-feats">
          <li>
            <span class="ico">⚡</span>
            <div>
              <strong>{{ t('auth.aside.f1.title') }}</strong>
              <p>{{ t('auth.aside.f1.desc') }}</p>
            </div>
          </li>
          <li>
            <span class="ico">🔔</span>
            <div>
              <strong>{{ t('auth.aside.f2.title') }}</strong>
              <p>{{ t('auth.aside.f2.desc') }}</p>
            </div>
          </li>
          <li>
            <span class="ico">🔐</span>
            <div>
              <strong>{{ t('auth.aside.f3.title') }}</strong>
              <p>{{ t('auth.aside.f3.desc') }}</p>
            </div>
          </li>
        </ul>

        <p class="aside-foot">{{ t('auth.aside.foot') }}</p>
      </aside>

      <section class="auth-main">
        <header class="auth-tabs">
          <button :class="['tab', { active: view === 'login' }]" @click="switchView('login')" type="button">
            {{ t('auth.tab.login') }}
          </button>
          <button :class="['tab', { active: view === 'register' }]" @click="switchView('register')" type="button">
            {{ t('auth.tab.register') }}
          </button>
        </header>

        <transition name="fade" mode="out-in">
          <!-- LOGIN -->
          <form v-if="view === 'login'" key="login" class="auth-form" @submit.prevent="handleLogin">
            <h3>{{ t('auth.login.title') }}</h3>
            <p class="muted">{{ t('auth.login.subtitle') }}</p>

            <label class="field">
              <span>{{ t('auth.login.identifier') }}</span>
              <input v-model="loginForm.identifier" type="text" autocomplete="username" :placeholder="t('auth.login.identifier_ph')" required />
            </label>

            <label class="field">
              <span>{{ t('auth.login.password') }}</span>
              <div class="pwd-wrap">
                <input v-model="loginForm.password" :type="showPassword ? 'text' : 'password'" autocomplete="current-password" :placeholder="t('auth.login.password_ph')" required />
                <button type="button" class="eye-btn" :aria-label="showPassword ? 'Hide' : 'Show'" @click="showPassword = !showPassword">
                  {{ showPassword ? '🙈' : '👁' }}
                </button>
              </div>
            </label>

            <div class="row-between">
              <label class="check">
                <input v-model="loginForm.remember" type="checkbox" />
                <span>{{ t('auth.login.remember') }}</span>
              </label>
              <button type="button" class="link-btn" @click="switchView('forgot')">
                {{ t('auth.login.forgot') }}
              </button>
            </div>

            <p v-if="submitError" class="alert error">{{ submitError }}</p>
            <p v-if="successMsg" class="alert success">{{ successMsg }}</p>

            <button type="submit" class="primary-btn" :disabled="auth.loading">
              <span v-if="!auth.loading">{{ t('auth.login.submit') }}</span>
              <span v-else class="spinner" />
            </button>

            <div class="divider"><span>{{ t('auth.divider.or') }}</span></div>

            <button type="button" class="google-btn" @click="handleGoogleLogin">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
                <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
              </svg>
              <span>{{ t('auth.login.google') }}</span>
            </button>

            <button type="button" class="ghost-btn" @click="fillDemoAccount">
              {{ t('auth.login.demo') }}
            </button>

            <p class="switch-line">
              {{ t('auth.login.no_account') }}
              <button type="button" class="link-btn" @click="switchView('register')">
                {{ t('auth.tab.register') }}
              </button>
            </p>
          </form>

          <!-- REGISTER -->
          <form v-else-if="view === 'register'" key="register" class="auth-form" @submit.prevent="handleRegister">
            <h3>{{ t('auth.register.title') }}</h3>
            <p class="muted">{{ t('auth.register.subtitle') }}</p>

            <div class="grid-2">
              <label class="field">
                <span>{{ t('auth.register.username') }}</span>
                <input v-model="registerForm.username" type="text" autocomplete="username" :placeholder="t('auth.register.username_ph')" required />
              </label>
              <label class="field">
                <span>{{ t('auth.register.displayName') }}</span>
                <input v-model="registerForm.displayName" type="text" :placeholder="t('auth.register.displayName_ph')" />
              </label>
            </div>

            <label class="field">
              <span>{{ t('auth.register.email') }}</span>
              <input v-model="registerForm.email" type="email" autocomplete="email" :placeholder="t('auth.register.email_ph')" required />
            </label>

            <label class="field">
              <span>{{ t('auth.register.password') }}</span>
              <div class="pwd-wrap">
                <input v-model="registerForm.password" :type="showPassword ? 'text' : 'password'" autocomplete="new-password" :placeholder="t('auth.register.password_ph')" required />
                <button type="button" class="eye-btn" @click="showPassword = !showPassword" :aria-label="showPassword ? 'Hide' : 'Show'">
                  {{ showPassword ? '🙈' : '👁' }}
                </button>
              </div>
              <div class="strength" :data-level="strength.score">
                <div class="bar"><div class="fill" :style="{ width: (strength.score * 20) + '%' }" /></div>
                <span>{{ strength.label }}</span>
              </div>
            </label>

            <label class="field">
              <span>{{ t('auth.register.confirmPassword') }}</span>
              <div class="pwd-wrap">
                <input v-model="registerForm.confirmPassword" :type="showConfirm ? 'text' : 'password'" autocomplete="new-password" :placeholder="t('auth.register.confirmPassword_ph')" required />
                <button type="button" class="eye-btn" @click="showConfirm = !showConfirm" :aria-label="showConfirm ? 'Hide' : 'Show'">
                  {{ showConfirm ? '🙈' : '👁' }}
                </button>
              </div>
            </label>

            <label class="check">
              <input v-model="registerForm.agree" type="checkbox" required />
              <span>
                {{ t('auth.register.agree_prefix') }}
                <a href="#" @click.prevent>{{ t('auth.register.agree_terms') }}</a>
                {{ t('auth.register.agree_and') }}
                <a href="#" @click.prevent>{{ t('auth.register.agree_privacy') }}</a>
              </span>
            </label>

            <p v-if="submitError" class="alert error">{{ submitError }}</p>
            <p v-if="successMsg" class="alert success">{{ successMsg }}</p>

            <button type="submit" class="primary-btn" :disabled="auth.loading || !registerForm.agree">
              <span v-if="!auth.loading">{{ t('auth.register.submit') }}</span>
              <span v-else class="spinner" />
            </button>

            <p class="switch-line">
              {{ t('auth.register.have_account') }}
              <button type="button" class="link-btn" @click="switchView('login')">
                {{ t('auth.tab.login') }}
              </button>
            </p>
          </form>

          <!-- FORGOT PASSWORD -->
          <form v-else key="forgot" class="auth-form" @submit.prevent="handleForgot">
            <h3>{{ t('auth.forgot.title') }}</h3>
            <p class="muted">{{ t('auth.forgot.subtitle') }}</p>

            <label class="field">
              <span>{{ t('auth.forgot.email') }}</span>
              <input v-model="forgotForm.email" type="email" autocomplete="email" :placeholder="t('auth.forgot.email_ph')" required />
            </label>

            <p v-if="submitError" class="alert error">{{ submitError }}</p>
            <div v-if="forgotForm.sentToken" class="alert success">
              {{ t('auth.forgot.demo_token', { token: forgotForm.sentToken }) }}
            </div>

            <button type="submit" class="primary-btn" :disabled="auth.loading">
              <span v-if="!auth.loading">{{ t('auth.forgot.submit') }}</span>
              <span v-else class="spinner" />
            </button>

            <p class="switch-line">
              <button type="button" class="link-btn" @click="switchView('login')">
                ← {{ t('auth.forgot.back') }}
              </button>
            </p>
          </form>
        </transition>
      </section>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.25rem;
  font-family: 'Roboto', sans-serif;
  min-height: calc(100vh - 180px);
}

.auth-shell {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  border-radius: 22px;
  overflow: hidden;
  min-height: 580px;
}

.auth-aside {
  padding: 2.5rem 2rem;
  background: radial-gradient(ellipse at 0% 0%, rgba(255, 255, 255, 0.08), transparent 60%),
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
  letter-spacing: 0.02em;
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

.aside-title {
  margin: 0 0 0.75rem;
  font-size: 1.8rem;
  line-height: 1.25;
  color: var(--text-strong);
  font-family: 'Inter', 'Be Vietnam Pro', sans-serif;
}

.aside-desc {
  margin: 0 0 1.5rem;
  color: var(--muted);
  line-height: 1.6;
  font-size: 0.95rem;
}

.aside-feats {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.aside-feats li {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
}

.aside-feats .ico {
  font-size: 1.4rem;
  line-height: 1;
  flex-shrink: 0;
}

.aside-feats strong {
  color: var(--text-strong);
  display: block;
  margin-bottom: 0.2rem;
  font-size: 0.95rem;
}

.aside-feats p {
  color: var(--muted);
  font-size: 0.85rem;
  margin: 0;
  line-height: 1.5;
}

.aside-foot {
  margin-top: auto;
  padding-top: 2rem;
  font-size: 0.8rem;
  color: var(--muted-soft);
}

.auth-main {
  padding: 2.25rem 2rem;
  display: flex;
  flex-direction: column;
}

.auth-tabs {
  display: flex;
  gap: 0.4rem;
  background: var(--surface);
  padding: 0.35rem;
  border-radius: 10px;
  border: 1px solid var(--border);
  margin-bottom: 1.5rem;
  align-self: flex-start;
}

.tab {
  background: transparent;
  border: none;
  padding: 0.55rem 1rem;
  border-radius: 8px;
  color: var(--muted);
  font-weight: 500;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.tab.active {
  background: var(--text-strong);
  color: var(--bg);
  box-shadow: var(--shadow);
}

.tab:hover:not(.active) {
  color: var(--text-strong);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-form h3 {
  margin: 0;
  color: var(--text-strong);
  font-size: 1.4rem;
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

.field input {
  background: var(--input-bg);
  border: 1px solid var(--input-border);
  border-radius: 10px;
  padding: 0.7rem 0.85rem;
  color: var(--text-strong);
  font-size: 0.95rem;
  font-family: inherit;
  transition: border-color 0.2s ease, background 0.2s ease;
  outline: none;
  width: 100%;
}

.field input:focus {
  border-color: var(--text-strong);
}

.field input::placeholder {
  color: var(--input-placeholder);
}

.pwd-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.pwd-wrap input {
  padding-right: 2.6rem;
}

.eye-btn {
  position: absolute;
  right: 0.4rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.3rem 0.45rem;
  border-radius: 6px;
  color: var(--muted);
}

.eye-btn:hover {
  background: var(--surface);
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.row-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.check {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--muted);
  cursor: pointer;
}

.check input {
  accent-color: var(--text-strong);
}

.check a {
  color: var(--text-strong);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.link-btn {
  background: transparent;
  border: none;
  color: var(--text-strong);
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.link-btn:hover {
  opacity: 0.85;
}

.primary-btn {
  background: var(--text-strong);
  color: var(--bg);
  border: none;
  border-radius: 10px;
  padding: 0.85rem 1rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  font-family: inherit;
  transition: transform 0.15s ease, opacity 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
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
  padding: 0.7rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s ease;
}

.ghost-btn:hover {
  background: var(--surface);
}

.google-btn {
  background: #ffffff;
  border: 1px solid #dadce0;
  color: #3c4043;
  border-radius: 10px;
  padding: 0.7rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-weight: 500;
}

.google-btn:hover {
  background: #f8f9fa;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

[data-theme="dark"] .google-btn {
  background: #ffffff;
  border-color: #dadce0;
  color: #3c4043;
}

[data-theme="dark"] .google-btn:hover {
  background: #f8f9fa;
}

.divider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--muted);
  font-size: 0.8rem;
  margin: 0.25rem 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
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

.switch-line {
  text-align: center;
  font-size: 0.85rem;
  color: var(--muted);
  margin: 0.5rem 0 0;
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

.strength {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.78rem;
  color: var(--muted);
}

.strength .bar {
  flex: 1;
  height: 4px;
  background: var(--surface);
  border-radius: 2px;
  overflow: hidden;
}

.strength .fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s ease;
  background: var(--brand-gradient);
}

.strength[data-level="1"] .fill { background: linear-gradient(90deg, #ff6b6b, #ff9b6b); }
.strength[data-level="2"] .fill { background: linear-gradient(90deg, #ffb86b, #ffd86b); }
.strength[data-level="3"] .fill { background: linear-gradient(90deg, #8be78d, #6fe79a); }
.strength[data-level="4"] .fill,
.strength[data-level="5"] .fill { background: linear-gradient(90deg, #6fe79a, #4cd9c7); }

.fade-enter-active, .fade-leave-active {
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
  .auth-shell {
    grid-template-columns: 1fr;
  }
  .auth-aside {
    border-right: none;
    border-bottom: 1px solid var(--glass-border);
    padding: 2rem 1.5rem;
  }
  .grid-2 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .auth-page {
    padding: 1rem 0.75rem;
  }
  .auth-main {
    padding: 1.5rem 1.25rem;
  }
  .auth-tabs {
    width: 100%;
  }
  .tab {
    flex: 1;
    text-align: center;
  }
}
</style>
