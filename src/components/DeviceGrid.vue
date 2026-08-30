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
      <div class="skeleton-grid">
        <div v-for="i in 6" :key="i" class="skeleton-card">
          <div class="skeleton-image"></div>
          <div class="skeleton-content">
            <div class="skeleton-title"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-tags">
              <div class="skeleton-tag"></div>
              <div class="skeleton-tag"></div>
            </div>
            <div class="skeleton-button"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="error-state">
      <div class="error-icon">⚠️</div>
      <h3>Oops! Something went wrong</h3>
      <p>{{ error }}</p>
      <button @click="store.fetchAllData" class="retry-btn">
        <span class="retry-icon">🔄</span>
        Try Again
      </button>
    </div>

    <div v-else-if="filteredDevices.length === 0" class="empty-state">
      <div class="empty-icon">🔍</div>
      <h3>No devices found</h3>
      <p>Try adjusting your search criteria</p>
    </div>

    <transition-group v-else name="fade-slide" tag="div" class="device-grid">
      <DeviceCard
        v-for="device in filteredDevices"
        :key="device.code"
        :device="device"
      />
    </transition-group>
  </div>
</template>

<style scoped>
.device-grid-container {
  padding: 1.5rem;
}

.section-header {
  margin-bottom: 2rem;
  animation: slideDown 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-header h2 {
  margin: 0;
  font-size: 1.75rem;
  color: var(--text-strong);
  font-weight: 700;
  letter-spacing: -0.02em;
  font-family: 'Inter', sans-serif;
}

.device-count {
  font-size: 1.1rem;
  color: var(--muted);
  font-weight: 400;
  margin-left: 0.5rem;
}

.device-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-slide-move,
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.95);
}

.fade-slide-leave-active {
  position: absolute;
}

.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  color: var(--muted);
  animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.skeleton-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.skeleton-image {
  height: 160px;
  background: linear-gradient(
    90deg,
    var(--surface) 0%,
    var(--glass-border) 50%,
    var(--surface) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skeleton-title {
  height: 20px;
  background: var(--glass-border);
  border-radius: 6px;
  width: 70%;
}

.skeleton-text {
  height: 14px;
  background: var(--glass-border);
  border-radius: 4px;
  width: 50%;
}

.skeleton-tags {
  display: flex;
  gap: 0.5rem;
}

.skeleton-tag {
  height: 24px;
  background: var(--glass-border);
  border-radius: 12px;
  width: 60px;
}

.skeleton-button {
  height: 42px;
  background: var(--glass-border);
  border-radius: 10px;
  margin-top: 0.5rem;
}

.error-icon,
.empty-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: bounce 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.error-state h3,
.empty-state h3 {
  font-size: 1.5rem;
  color: var(--text-strong);
  margin: 0 0 0.5rem;
  font-weight: 600;
}

.error-state p,
.empty-state p {
  font-size: 1rem;
  color: var(--muted);
  margin: 0 0 2rem;
  max-width: 400px;
  text-align: center;
  line-height: 1.6;
}

.retry-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.75rem;
  background: var(--text-strong);
  color: var(--bg);
  border: 1px solid transparent;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.2);
}

.retry-btn:active {
  transform: translateY(0);
}

.retry-icon {
  font-size: 1.2rem;
  display: inline-block;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.retry-btn:hover .retry-icon {
  animation-play-state: running;
}

.retry-btn:not(:hover) .retry-icon {
  animation: none;
}

@media (max-width: 768px) {
  .device-grid-container {
    padding: 1rem;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }

  .device-count {
    font-size: 0.95rem;
  }

  .device-grid,
  .skeleton-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }

  .loading-state,
  .error-state,
  .empty-state {
    padding: 3rem 1.5rem;
  }

  .error-icon,
  .empty-icon {
    font-size: 3rem;
  }

  .error-state h3,
  .empty-state h3 {
    font-size: 1.25rem;
  }
}
</style>
