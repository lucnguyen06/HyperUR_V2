const BASE_URL = 'https://raw.githubusercontent.com/HegeKen/HyperData/main'

export const api = {
  async fetchDevices() {
    const res = await fetch('/data/devices.json')
    if (!res.ok) throw new Error('Failed to fetch devices')
    return res.json()
  },

  async fetchDevInfo() {
    const res = await fetch(`${BASE_URL}/dev.json`)
    if (!res.ok) throw new Error('Failed to fetch dev info')
    return res.json()
  },

  async fetchRecentUpdates() {
    const res = await fetch(`${BASE_URL}/index.json`)
    if (!res.ok) throw new Error('Failed to fetch recent updates')
    return res.json()
  },

  async fetchUpdates() {
    const res = await fetch(`${BASE_URL}/updates.json`)
    if (!res.ok) throw new Error('Failed to fetch updates')
    return res.json()
  },

  async fetchNewRom() {
    const res = await fetch(`${BASE_URL}/new-rom.json`)
    if (!res.ok) throw new Error('Failed to fetch new rom info')
    return res.json()
  }
}
