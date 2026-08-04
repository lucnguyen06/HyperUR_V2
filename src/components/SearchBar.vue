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
  background: rgba(10, 13, 19, 0.5);
  font-family: 'Roboto', sans-serif;
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
  border: 2px solid rgba(109, 116, 134, 0.3);
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(20, 22, 28, 0.8);
  color: #fff;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

input:focus {
  outline: none;
  border-color: #6d7486;
  box-shadow: 0 0 0 4px rgba(109, 116, 134, 0.2);
}

.clear-btn {
  position: absolute;
  right: 1rem;
  background: rgba(109, 116, 134, 0.3);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: rgba(109, 116, 134, 0.5);
  color: #fff;
}
</style>