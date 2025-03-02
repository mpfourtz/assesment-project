<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue';

const emit = defineEmits(['update-filter']);

const sortBy = ref('popularity');
const selectedGenres = ref<string[]>([]);

const genres = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Family', 'Fantasy', 'History', 'Horror'
];

const updateFilter = () => {
  emit('update-filter', { sortBy: sortBy.value, selectedGenres: selectedGenres.value });
};

watch(selectedGenres, updateFilter);
</script>

<template>
  <div class="filter-container">
    <h3 class="text-lg font-semibold mb-2">Sort Result By</h3>
    <select v-model="sortBy" @change="updateFilter" class="filter-dropdown">
      <option value="popularity">Popularity</option>
      <option value="release_date">Release Date</option>
    </select>
    <h3 class="text-lg font-semibold mt-4 mb-2 border-b border-gray-600 pb-1">Genres</h3>
    <div v-for="genre in genres" :key="genre" class="flex justify-between items-center py-2">
      <label class="text-sm">{{ genre }}</label>
      <input
        type="checkbox"
        :value="genre"
        v-model="selectedGenres"
        class="custom-checkbox"
        @change="updateFilter"
      />
    </div>
  </div>
</template>

<style scoped>
.filter-container {
  width: 260px;
  padding: 16px;
  border-radius: 8px;
  background: linear-gradient(180deg, #0E1723 0%, rgba(30, 35, 42, 1) 100%);
  color: white;
}

.filter-dropdown {
  width: 100%;
  padding: 8px;
  background-color: #2A2A2A;
  color: white;
  border-radius: 4px;
  border: none;
  outline: none;
}

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
