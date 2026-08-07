<script setup>
import { computed } from 'vue'
import { useHyperStore } from '../stores/hyperStore'

const props = defineProps({
  device: {
    type: Object,
    required: true
  }
})

const store = useHyperStore()

const deviceName = computed(() => {
  return props.device.name[store.language] || props.device.name.en
})

const brandName = computed(() => {
  return props.device.series[store.language] || props.device.series.en
})

const deviceImage = computed(() => {
  return `/images/${props.device.image}`
})

const deviceIcon = computed(() => {
  const iconName = props.device.image.replace('render', 'icon')
  return `/images/${iconName}`
})

const getOsColor = (os) => {
  if (os === 'OS3.0') return '#FF6B6B'
  if (os === 'OS2.0') return '#4ECDC4'
  if (os === 'OS1.0') return '#45B7D1'
  return '#95A5A6'
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
  event.target.nextElementSibling.style.display = 'flex'
}

const handleDownload = () => {
  // Navigate to download page or open download modal
  console.log('Download:', props.device.code)
}
</script>

<template>
  <div class="device-card">
    <div class="device-image">
      <img
        :src="deviceImage"
        :alt="deviceName"
        class="device-render"
        @error="handleImageError"
      />
      <img
        :src="deviceIcon"
        :alt="deviceName"
        class="device-icon"
        @error="handleImageError"
      />
      <div class="image-placeholder" :style="{ display: 'none' }">
        {{ deviceName.charAt(0) }}
      </div>
    </div>
    <div class="device-info">
      <h3 class="device-name">{{ deviceName }}</h3>
      <p class="device-code">Code: {{ device.code }}</p>
      <div class="device-tags">
        <span class="series-tag">{{ brandName }}</span>
        <span
          v-for="os in device.supports"
          :key="os"
          class="os-tag"
          :style="{ backgroundColor: getOsColor(os) }"
        >
          {{ os }}
        </span>
      </div>
      <div class="android-version">
        <span>Android {{ device.android[0] }}</span>
      </div>
      <button class="download-btn" @click="handleDownload">
        <span class="download-icon">⬇</span>
        Download
      </button>
    </div>
  </div>
</template>

<style scoped>
.device-card {
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--glass-border);
  font-family: 'Roboto', sans-serif;
  isolation: isolate;
}

.device-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    var(--glass-highlight) 0%,
    transparent 35%,
    transparent 65%,
    rgba(255, 255, 255, 0.18) 100%
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

.device-card > * {
  position: relative;
  z-index: 1;
}

.device-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.35);
}

.device-image {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(15, 23, 42, 0.85) 100%);
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.device-render {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 16px;
  z-index: 1;
}

.device-icon {
  position: absolute;
  width: 48px;
  height: 48px;
  object-fit: contain;
  top: 8px;
  right: 8px;
  opacity: 0.9;
  z-index: 2;
}

.image-placeholder {
  width: 80px;
  height: 80px;
  background: var(--surface);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-strong);
}

.device-info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.device-name {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  color: var(--text-strong);
  font-weight: 600;
}

.device-code {
  margin: 0 0 0.5rem 0;
  font-size: 0.8rem;
  color: var(--muted);
}

.device-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.series-tag {
  background: var(--surface);
  color: var(--text-strong);
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 500;
  border: 1px solid var(--border);
}

.os-tag {
  color: #0f172a;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
}

.android-version {
  font-size: 0.75rem;
  color: var(--muted);
  margin-bottom: 0.75rem;
}

.download-btn {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(180deg, #ffffff 0%, #b0b0b0 100%);
  color: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.download-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.25);
  border-color: #ffffff;
}

.download-icon {
  font-size: 1.1rem;
}
</style>
