<script setup>
import { useHyperStore } from '../stores/hyperStore'

const store = useHyperStore()

const handleSearch = (event) => {
  store.setSearch(event.target.value)
}
</script>

<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <span class="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search devices..."
        :value="store.searchQuery"
        @input="handleSearch"
      />
      <button
        v-if="store.searchQuery"
        class="clear-btn"
        @click="store.setSearch('')"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  padding: 1.5rem 2rem;
  background: transparent;
  font-family: 'Roboto', sans-serif;
  animation: slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1);
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

.search-input-wrapper {
  max-width: 650px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  font-size: 1.3rem;
  opacity: 0.6;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 2;
}

.search-input-wrapper:focus-within .search-icon {
  opacity: 1;
  transform: scale(1.1);
}

input {
  width: 100%;
  padding: 1rem 3.5rem;
  border: 2px solid var(--input-border);
  border-radius: 16px;
  font-size: 1.05rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--input-bg);
  color: var(--text-strong);
  font-family: inherit;
  outline: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

input::placeholder {
  color: var(--input-placeholder);
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

input:focus::placeholder {
  opacity: 0.6;
}

input:focus {
  border-color: var(--text-strong);
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.15), 0 0 0 4px rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.clear-btn {
  position: absolute;
  right: 1rem;
  background: var(--surface);
  border: 1px solid var(--input-border);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: var(--text-strong);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
  opacity: 0;
  animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.clear-btn:hover {
  background: var(--text-strong);
  color: var(--bg);
  transform: scale(1.1) rotate(90deg);
  border-color: var(--text-strong);
}

.clear-btn:active {
  transform: scale(0.95) rotate(90deg);
}

@media (max-width: 768px) {
  .search-bar {
    padding: 1rem 1.5rem;
  }

  .search-input-wrapper {
    max-width: 100%;
  }

  input {
    padding: 0.875rem 3rem;
    font-size: 1rem;
    border-radius: 14px;
  }

  .search-icon {
    left: 1rem;
    font-size: 1.2rem;
  }

  .clear-btn {
    width: 28px;
    height: 28px;
    font-size: 0.85rem;
  }
}
</style>