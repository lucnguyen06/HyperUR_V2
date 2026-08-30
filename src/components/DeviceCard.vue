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
  border-radius: 18px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--glass-border);
  font-family: 'Roboto', sans-serif;
  isolation: isolate;
  will-change: transform, box-shadow, border-color;
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
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.device-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(255, 255, 255, 0.08),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 0;
}

.device-card > * {
  position: relative;
  z-index: 1;
}

.device-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-hover);
  border-color: rgba(255, 255, 255, 0.4);
}

.device-card:hover::before {
  opacity: 1.5;
}

.device-card:hover::after {
  opacity: 1;
}

.device-card:active {
  transform: translateY(-4px) scale(1.01);
}

.device-image {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(15, 23, 42, 0.85) 100%);
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.device-card:hover .device-image {
  transform: scale(1.05);
}

.device-render {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 20px;
  z-index: 1;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}

.device-card:hover .device-render {
  transform: scale(1.1) rotate(2deg);
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
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
}

.device-name {
  margin: 0;
  font-size: 1.15rem;
  color: var(--text-strong);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.3;
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.device-card:hover .device-name {
  color: var(--brand-1);
}

.device-code {
  margin: 0;
  font-size: 0.82rem;
  color: var(--muted);
  font-family: 'Courier New', monospace;
  letter-spacing: 0.02em;
}

.device-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.series-tag {
  background: var(--surface);
  color: var(--text-strong);
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 500;
  border: 1px solid var(--border);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.device-card:hover .series-tag {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.os-tag {
  color: #0f172a;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.device-card:hover .os-tag {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.android-version {
  font-size: 0.78rem;
  color: var(--muted);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.android-version::before {
  content: '🤖';
  font-size: 0.9rem;
}

.download-btn {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: linear-gradient(135deg, #ffffff 0%, #d0d0d0 100%);
  color: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  padding: 0.85rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  font-family: inherit;
}

.download-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.4), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.download-btn:hover::before {
  transform: translateX(100%);
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.3);
  border-color: #ffffff;
  background: linear-gradient(135deg, #ffffff 0%, #e8e8e8 100%);
}

.download-btn:active {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
}

.download-icon {
  font-size: 1.2rem;
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.download-btn:hover .download-icon {
  transform: translateY(3px);
}
</style>
