import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const SERIALS_KEY = 'hyperur_serials'
const LINKED_KEY = 'hyperur_serial_linked'

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
  } catch (e) { /* ignore */ }
}

const sanitize = (entry) => ({
  serial: entry.serial,
  ownerUsername: entry.ownerUsername,
  device: entry.device,
  build: entry.build,
  channel: entry.channel,
  issuedAt: entry.issuedAt,
  expiresAt: entry.expiresAt,
  status: entry.status,
  notes: entry.notes || ''
})

const formatSerial = (raw) => {
  const clean = (raw || '').toUpperCase().replace(/[^A-Z0-9]/g, '')
  if (clean.length !== 16) return clean
  return `${clean.slice(0,4)}-${clean.slice(4,8)}-${clean.slice(8,12)}-${clean.slice(12,16)}`
}

const genSerial = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let out = ''
  for (let i = 0; i < 16; i++) {
    out += chars[Math.floor(Math.random() * chars.length)]
  }
  return formatSerial(out)
}

const seedDemoSerials = (existing) => {
  if (existing.length > 0) return existing
  const now = Date.now()
  return [
    {
      serial: 'HUR1-DEMO-0001-AAAA',
      ownerUsername: 'demo',
      device: 'POCO F6 Pro',
      build: 'HyperUR 1.4.2',
      channel: 'stable',
      issuedAt: new Date(now - 86400000 * 30).toISOString(),
      expiresAt: new Date(now + 86400000 * 335).toISOString(),
      status: 'active',
      notes: 'Demo serial — pre-seeded for showcase.'
    },
    {
      serial: 'HUR1-DEMO-0002-BBBB',
      ownerUsername: 'demo',
      device: 'Redmi Note 13 Pro',
      build: 'HyperUR 1.3.9',
      channel: 'stable',
      issuedAt: new Date(now - 86400000 * 90).toISOString(),
      expiresAt: new Date(now - 86400000 * 1).toISOString(),
      status: 'expired',
      notes: 'Demo serial — expired sample.'
    }
  ]
}

export const useSerialStore = defineStore('serial', () => {
  const serials = ref([])
  const linked = ref({})
  const loading = ref(false)
  const error = ref(null)
  const lastIssued = ref(null)

  const allSerials = computed(() => serials.value.map(sanitize))

  const load = () => {
    serials.value = safeRead(SERIALS_KEY, [])
    if (serials.value.length === 0) {
      serials.value = seedDemoSerials([])
      safeWrite(SERIALS_KEY, serials.value)
    }
    linked.value = safeRead(LINKED_KEY, {})
  }

  const persist = () => safeWrite(SERIALS_KEY, serials.value)
  const persistLinked = () => safeWrite(LINKED_KEY, linked.value)

  const lookup = (raw) => {
    const want = formatSerial(raw)
    if (!want) return null
    return serials.value.find(s => s.serial === want) || null
  }

  const lookupByOwner = (username) => {
    if (!username) return []
    return serials.value
      .filter(s => (s.ownerUsername || '').toLowerCase() === username.toLowerCase())
      .map(sanitize)
  }

  const registerSerial = async ({ ownerUsername, device, build, channel = 'stable', notes }) => {
    loading.value = true
    error.value = null
    try {
      await new Promise(r => setTimeout(r, 350))

      if (!ownerUsername || ownerUsername.trim().length < 3) {
        throw new Error('Vui lòng nhập username (tối thiểu 3 ký tự)')
      }
      if (!device || device.trim().length < 2) {
        throw new Error('Vui lòng nhập tên thiết bị')
      }

      load()
      const userSerials = lookupByOwner(ownerUsername)
      if (userSerials.length >= 5) {
        throw new Error('Mỗi tài khoản chỉ được đăng ký tối đa 5 serial')
      }

      const issuedAt = new Date()
      const expiresAt = new Date(issuedAt.getTime() + 365 * 24 * 60 * 60 * 1000)

      let serial
      let attempts = 0
      do {
        serial = genSerial()
        attempts++
        if (attempts > 50) throw new Error('Không thể tạo serial, vui lòng thử lại')
      } while (serials.value.some(s => s.serial === serial))

      const entry = {
        serial,
        ownerUsername: ownerUsername.trim(),
        device: device.trim(),
        build: (build || 'HyperUR 1.4.x').trim(),
        channel,
        issuedAt: issuedAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        status: 'active',
        notes: (notes || '').trim()
      }

      serials.value.push(entry)
      persist()

      lastIssued.value = sanitize(entry)
      return sanitize(entry)
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const linkSerial = (serial, username) => {
    const want = formatSerial(serial)
    const target = serials.value.find(s => s.serial === want)
    if (!target) {
      error.value = 'Serial không tồn tại'
      return false
    }
    if (target.ownerUsername.toLowerCase() !== (username || '').toLowerCase()) {
      error.value = 'Serial này không thuộc tài khoản của bạn'
      return false
    }
    if (target.status !== 'active') {
      error.value = 'Serial không ở trạng thái active'
      return false
    }
    linked.value[want] = username
    persistLinked()
    return true
  }

  const unlinkSerial = (serial) => {
    const want = formatSerial(serial)
    delete linked.value[want]
    persistLinked()
  }

  const isLinked = (serial) => {
    const want = formatSerial(serial)
    return !!linked.value[want]
  }

  const revokeSerial = (serial) => {
    const want = formatSerial(serial)
    const idx = serials.value.findIndex(s => s.serial === want)
    if (idx === -1) return false
    serials.value[idx] = { ...serials.value[idx], status: 'revoked' }
    persist()
    return true
  }

  const renewSerial = (serial) => {
    const want = formatSerial(serial)
    const idx = serials.value.findIndex(s => s.serial === want)
    if (idx === -1) return false
    const newExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    serials.value[idx] = {
      ...serials.value[idx],
      status: 'active',
      expiresAt: newExpiry.toISOString()
    }
    persist()
    return true
  }

  const getSerialsForUser = (username) => {
    if (!username) return []
    return serials.value
      .filter(s => s.ownerUsername.toLowerCase() === username.toLowerCase())
      .map(sanitize)
  }

  const getStatus = (entry) => {
    if (entry.status === 'revoked') return 'revoked'
    if (new Date(entry.expiresAt).getTime() < Date.now()) return 'expired'
    return entry.status || 'active'
  }

  const formatInput = (raw) => formatSerial(raw)

  return {
    serials,
    linked,
    loading,
    error,
    lastIssued,
    allSerials,
    load,
    lookup,
    lookupByOwner,
    registerSerial,
    linkSerial,
    unlinkSerial,
    isLinked,
    revokeSerial,
    renewSerial,
    getSerialsForUser,
    getStatus,
    formatInput
  }
})