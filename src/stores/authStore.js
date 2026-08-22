import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const USERS_KEY = 'hyperur_users'
const SESSION_KEY = 'hyperur_session'

const safeRead = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (e) {
    return fallback
  }
}

const safeWrite = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    /* ignore quota errors */
  }
}

const sanitizeUser = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  displayName: user.displayName || user.username,
  createdAt: user.createdAt,
  avatar: user.avatar || null,
  role: user.role || 'user'
})

const hashPassword = (pwd) => {
  let h = 5381
  for (let i = 0; i < pwd.length; i++) {
    h = ((h << 5) + h) + pwd.charCodeAt(i)
    h = h & 0xffffffff
  }
  return `h_${(h >>> 0).toString(16)}_${pwd.length}`
}

const DEMO_USER = {
  id: 'usr_demo_0000000001',
  username: 'demo',
  email: 'demo@hyperur.local',
  displayName: 'Demo User',
  passwordHash: hashPassword('HyperUR123'),
  createdAt: '2026-01-01T00:00:00.000Z',
  avatar: null,
  role: 'user'
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const initialized = ref(false)

  const isAuthenticated = computed(() => !!user.value)
  const users = ref([])

  const loadUsers = () => {
    users.value = safeRead(USERS_KEY, [])
    if (!users.value.some(u => u.id === DEMO_USER.id)) {
      users.value.unshift({ ...DEMO_USER })
      persistUsers()
    }
  }

  const persistUsers = () => safeWrite(USERS_KEY, users.value)

  const restoreSession = () => {
    loadUsers()
    const session = safeRead(SESSION_KEY, null)
    if (session && session.userId) {
      const found = users.value.find(u => u.id === session.userId)
      if (found) {
        user.value = sanitizeUser(found)
      } else {
        try { localStorage.removeItem(SESSION_KEY) } catch (e) { /* ignore */ }
      }
    }
    initialized.value = true
  }

  const setError = (msg) => {
    error.value = msg
  }

  const clearError = () => {
    error.value = null
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateUsername = (username) => {
    if (!username || username.length < 3 || username.length > 24) return false
    return /^[a-zA-Z0-9_.-]+$/.test(username)
  }

  const register = async ({ username, email, password, confirmPassword, displayName }) => {
    loading.value = true
    error.value = null
    try {
      await new Promise(r => setTimeout(r, 350))

      username = (username || '').trim()
      email = (email || '').trim().toLowerCase()
      const name = (displayName || '').trim()

      if (!validateUsername(username)) {
        throw new Error('Username phải từ 3–24 ký tự, chỉ gồm chữ, số, dấu . _ -')
      }
      if (!validateEmail(email)) {
        throw new Error('Email không hợp lệ')
      }
      if (!password || password.length < 6) {
        throw new Error('Mật khẩu phải có ít nhất 6 ký tự')
      }
      if (password !== confirmPassword) {
        throw new Error('Mật khẩu xác nhận không khớp')
      }

      loadUsers()
      const exists = users.value.some(
        u => u.email === email || u.username.toLowerCase() === username.toLowerCase()
      )
      if (exists) {
        throw new Error('Username hoặc email đã được sử dụng')
      }

      const newUser = {
        id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        username,
        email,
        displayName: name || username,
        passwordHash: hashPassword(password),
        createdAt: new Date().toISOString(),
        avatar: null,
        role: 'user'
      }

      users.value.push(newUser)
      persistUsers()

      const publicUser = sanitizeUser(newUser)
      user.value = publicUser
      safeWrite(SESSION_KEY, { userId: publicUser.id, ts: Date.now() })

      return publicUser
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const login = async ({ identifier, password }) => {
    loading.value = true
    error.value = null
    try {
      await new Promise(r => setTimeout(r, 300))

      const id = (identifier || '').trim().toLowerCase()
      const pwd = password || ''
      if (!id || !pwd) {
        throw new Error('Vui lòng nhập đầy đủ thông tin đăng nhập')
      }

      loadUsers()
      const found = users.value.find(
        u => u.email.toLowerCase() === id || u.username.toLowerCase() === id
      )
      if (!found) {
        throw new Error('Tài khoản không tồn tại')
      }
      if (found.passwordHash !== hashPassword(pwd)) {
        throw new Error('Mật khẩu không đúng')
      }

      const publicUser = sanitizeUser(found)
      user.value = publicUser
      safeWrite(SESSION_KEY, { userId: publicUser.id, ts: Date.now() })

      return publicUser
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    try { localStorage.removeItem(SESSION_KEY) } catch (e) { /* ignore */ }
  }

  const updateProfile = (patch) => {
    if (!user.value) return
    loadUsers()
    const idx = users.value.findIndex(u => u.id === user.value.id)
    if (idx === -1) return
    const next = {
      ...users.value[idx],
      displayName: patch.displayName ?? users.value[idx].displayName,
      avatar: patch.avatar ?? users.value[idx].avatar
    }
    users.value[idx] = next
    persistUsers()
    user.value = sanitizeUser(next)
  }

  const requestPasswordReset = ({ email }) => {
    loading.value = true
    error.value = null
    try {
      loadUsers()
      const found = users.value.find(u => u.email.toLowerCase() === (email || '').toLowerCase())
      if (!found) {
        throw new Error('Email không tồn tại trong hệ thống')
      }
      return {
        sentTo: found.email,
        token: Math.random().toString(36).slice(2, 10).toUpperCase()
      }
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const getAllAccounts = () => {
    loadUsers()
    return users.value.map(sanitizeUser)
  }

  return {
    user,
    loading,
    error,
    initialized,
    isAuthenticated,
    register,
    login,
    logout,
    updateProfile,
    requestPasswordReset,
    restoreSession,
    setError,
    clearError,
    getAllAccounts
  }
})