<script setup>
import { computed } from 'vue'
import { useHyperStore } from '../stores/hyperStore'

const store = useHyperStore()

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US')
}

const getVersionType = (version) => {
  if (version.includes('WPK')) return 'CN'
  if (version.includes('WPK')) return 'CN'
  if (version.includes('WOE') || version.includes('WOK') || version.includes('WON')) return 'EU'
  if (version.includes('WPK')) return 'CN'
  if (version.includes('WPX') || version.includes('WOH')) return 'TW'
  if (version.includes('VG')) return 'MI'
  if (version.includes('VHW') || version.includes('VNQ')) return 'IN'
  return 'Global'
}

const getRegionColor = (region) => {
  const colors = {
    'CN': '#e74c3c',
    'EU': '#3498db',
    'TW': '#9b59b6',
    'IN': '#f39c12',
    'MI': '#27ae60'
  }
  return colors[region] || '#95a5a6'
}
</script>

<template>
  <div class="recent-updates">
    <div class="section-header">
      <h2>Recent Updates</h2>
    </div>

    <div class="updates-list">
      <div
        v-for="rom in store.recentRoms.slice(0, 20)"
        :key="rom.code"
        class="update-item"
      >
        <div class="device-info">
          <h4>{{ rom.name[store.language] || rom.name.en }}</h4>
          <span class="device-code">{{ rom.code }}</span>
        </div>
        <div class="versions-list">
          <div
            v-for="(version, idx) in rom.versions.slice(0, 3)"
            :key="idx"
            class="version-item"
          >
            <span class="version-number">{{ version.version }}</span>
            <span class="version-date">{{ formatDate(version.insert_date) }}</span>
            <span
              class="region-badge"
              :style="{ backgroundColor: getRegionColor(getVersionType(version.version)) }"
            >
              {{ getVersionType(version.version) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recent-updates {
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--glass-border);
  font-family: 'Roboto', sans-serif;
  isolation: isolate;
}

.recent-updates::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    var(--glass-highlight) 0%,
    transparent 50%,
    rgba(138, 108, 255, 0.2) 100%
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  pointer-events: none;
  z-index: 0;
}

.recent-updates > * {
  position: relative;
  z-index: 1;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--border);
}

.section-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-strong);
}

.update-time {
  font-size: 0.85rem;
  color: var(--muted);
}

.updates-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.update-item {
  background: var(--surface);
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.3s ease;
  border: 1px solid var(--border);
}

.update-item:hover {
  border-color: rgba(138, 108, 255, 0.4);
}

.device-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.device-info h4 {
  margin: 0;
  font-size: 1rem;
  color: var(--text-strong);
}

.device-code {
  font-size: 0.75rem;
  color: var(--muted);
  font-family: monospace;
  background: var(--surface);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--border);
}

.versions-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.version-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  background: var(--surface);
  border-radius: 8px;
  font-size: 0.9rem;
}

.version-number {
  font-family: monospace;
  color: var(--text-strong);
  font-weight: 500;
}

.version-date {
  color: var(--muted);
  font-size: 0.8rem;
}

.region-badge {
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  margin-left: auto;
}
</style>
