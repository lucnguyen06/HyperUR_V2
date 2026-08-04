<script setup>
import { useHyperStore } from '../stores/hyperStore'
import { computed } from 'vue'
import DeviceCard from './DeviceCard.vue'

const store = useHyperStore()

const filteredDevices = computed(() => store.filteredDevices)
const loading = computed(() => store.loading)
const error = computed(() => store.error)
</script>

<template>
  <div class="device-grid-container">
    <div class="section-header">
      <h2>
        Devices
        <span class="device-count">({{ filteredDevices.length }})</span>
      </h2>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading devices...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>❌ {{ error }}</p>
      <button @click="store.fetchAllData">
        Retry
      </button>
    </div>

    <div v-else-if="filteredDevices.length === 0" class="empty-state">
      <p>No devices found</p>
    </div>

    <div v-else class="device-grid">
      <DeviceCard
        v-for="device in filteredDevices"
        :key="device.code"
        :device="device"
      />
    </div>
  </div>
</template>

<style scoped>
.device-grid-container {
  padding: 1.5rem;
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #fff;
}

.device-count {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: normal;
}

.device-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: rgba(255, 255, 255, 0.6);
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(109, 116, 134, 0.3);
  border-top-color: #6d7486;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-state button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(180deg, #6d7486 0%, #0a0d13 100%);
  color: white;
  border: 1px solid rgba(109, 116, 134, 0.5);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.error-state button:hover {
  border-color: #6d7486;
  box-shadow: 0 4px 15px rgba(109, 116, 134, 0.3);
}
</style>
