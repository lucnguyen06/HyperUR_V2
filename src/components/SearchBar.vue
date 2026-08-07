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
  padding: 1rem 2rem;
  background: var(--search-bg, rgba(10, 13, 19, 0.5));
  font-family: 'Roboto', sans-serif;
}

[data-theme="light"] .search-bar {
  --search-bg: rgba(255, 255, 255, 0.6);
}

.search-input-wrapper {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  font-size: 1.2rem;
  opacity: 0.5;
}

input {
  width: 100%;
  padding: 0.875rem 3rem;
  border: 2px solid var(--input-border);
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: var(--input-bg);
  color: var(--text-strong);
}

input::placeholder {
  color: var(--input-placeholder);
}

input:focus {
  outline: none;
  border-color: var(--brand-2);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.12);
}

.clear-btn {
  position: absolute;
  right: 1rem;
  background: var(--input-border);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: var(--text-strong);
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: var(--brand-2);
  color: #fff;
}
</style>