<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['update-filter']);

const sortBy = ref('popularity');
const selectedGenres = ref<string[]>([]);

const genres = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Family', 'Fantasy', 'History', 'Horror'
];

// Emit filter changes
const updateFilter = () => {
  emit('update-filter', { sortBy: sortBy.value, selectedGenres: selectedGenres.value });
};
</script>

<template>
  <div class="filter-container">
    <!-- Sort Dropdown -->
    <h3 class="text-lg font-semibold mb-2">Sort Result By</h3>
    <select v-model="sortBy" @change="updateFilter" class="filter-dropdown">
      <option value="popularity">Popularity</option>
      <option value="release_date">Release Date</option>
    </select>

    <!-- Genre Filter -->
    <h3 class="text-lg font-semibold mt-4 mb-2 border-b border-gray-600 pb-1">Genres</h3>
    <div v-for="genre in genres" :key="genre" class="flex justify-between items-center py-2">
      <label class="text-sm">{{ genre }}</label>
      <input
        type="checkbox"
        :value="genre"
        v-model="selectedGenres"
        class="custom-checkbox"
      />
    </div>
  </div>
</template>

<style scoped>
/* 🔹 Filter Container with Gradient Background */
.filter-container {
  width: 260px;
  padding: 16px;
  border-radius: 8px;
  background: linear-gradient(180deg, #0E1723 0%, rgba(30, 35, 42, 1) 100%);
  color: white;
}

/* 🔹 Sort Dropdown */
.filter-dropdown {
  width: 100%;
  padding: 8px;
  background-color: #2A2A2A;
  color: white;
  border-radius: 4px;
  border: none;
  outline: none;
}

/* 🔹 Custom Checkbox */
.custom-checkbox {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #888;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  background-color: #2A2A2A;
}

/* 🔹 Checked state with checkmark */
.custom-checkbox:checked {
  background-color: red;
  border-color: red;
}

.custom-checkbox:checked::before {
  content: '✔';
  color: white;
  font-size: 14px;
  font-weight: bold;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
