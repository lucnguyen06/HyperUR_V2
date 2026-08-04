import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '../services/api'

export const useHyperStore = defineStore('hyper', () => {
  const devices = ref({})
  const devInfo = ref({})
  const recentUpdates = ref({})
  const updates = ref([])
  const newRom = ref({})
  const loading = ref(false)
  const error = ref(null)
  const selectedBrand = ref('mi')
  const searchQuery = ref('')
  const language = ref('en')

  const brands = computed(() => {
    return Object.keys(devices.value)
  })

  const currentBrandDevices = computed(() => {
    if (!devices.value[selectedBrand.value]) return []
    return devices.value[selectedBrand.value].devices || []
  })

  const filteredDevices = computed(() => {
    let result = currentBrandDevices.value
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(device => 
        device.name[language.value]?.toLowerCase().includes(query) ||
        device.code.toLowerCase().includes(query)
      )
    }
    return result
  })

  const recentRoms = computed(() => {
    if (!recentUpdates.value.recent?.roms) return []
    return Object.entries(recentUpdates.value.recent.roms).map(([code, data]) => ({
      code,
      ...data
    }))
  })

  async function fetchAllData() {
    loading.value = true
    error.value = null
    try {
      const [devicesData, devData, recentData, updatesData, newRomData] = await Promise.all([
        api.fetchDevices(),
        api.fetchDevInfo(),
        api.fetchRecentUpdates(),
        api.fetchUpdates(),
        api.fetchNewRom()
      ])
      devices.value = devicesData
      devInfo.value = devData
      recentUpdates.value = recentData
      updates.value = updatesData
      newRom.value = newRomData
    } catch (e) {
      error.value = e.message
      console.error('Error fetching data:', e)
    } finally {
      loading.value = false
    }
  }

  function setBrand(brand) {
    selectedBrand.value = brand
  }

  function setSearch(query) {
    searchQuery.value = query
  }

  function setLanguage(lang) {
    language.value = lang
  }

  function getDeviceName(code, brand = 'mi') {
    const brandDevices = devices.value[brand]?.devices || []
    const device = brandDevices.find(d => d.code === code)
    return device?.name[language.value] || code
  }

  return {
    devices,
    devInfo,
    recentUpdates,
    updates,
    newRom,
    loading,
    error,
    selectedBrand,
    searchQuery,
    language,
    brands,
    currentBrandDevices,
    filteredDevices,
    recentRoms,
    fetchAllData,
    setBrand,
    setSearch,
    setLanguage,
    getDeviceName
  }
})
