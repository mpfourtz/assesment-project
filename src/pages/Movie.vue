<script setup lang="ts">
import { ref, computed } from 'vue';
import MovieFilter from '@/components/MovieFilter.vue';
import Image from '../assets/images/image-movies.png';

const movies = ref([
  { title: 'Wonder Woman 1984', year: 2020, rating: 7.0, genre: 'Action' },
  { title: 'Inception', year: 2010, rating: 8.8, genre: 'Sci-Fi' },
  { title: 'The Dark Knight', year: 2008, rating: 9.0, genre: 'Action' },
  { title: 'Interstellar', year: 2014, rating: 8.6, genre: 'Sci-Fi' },
  { title: 'Joker', year: 2019, rating: 8.5, genre: 'Drama' }
]);

const sortBy = ref('popularity');
const selectedGenres = ref<string[]>([]);

// Update filters when user interacts with MovieFilter.vue
const updateFilter = (filterData: { sortBy: string; selectedGenres: string[] }) => {
  sortBy.value = filterData.sortBy;
  selectedGenres.value = filterData.selectedGenres;
};

// Computed property to filter movies
const filteredMovies = computed(() => {
  let filtered = movies.value;

  // Filter by genre
  if (selectedGenres.value.length > 0) {
    filtered = filtered.filter(movie => selectedGenres.value.includes(movie.genre));
  }

  // Sort movies
  if (sortBy.value === 'release_date') {
    return filtered.sort((a, b) => b.year - a.year);
  } else {
    return filtered.sort((a, b) => b.rating - a.rating);
  }
});
</script>

<template>
  <div class="back-greyed"></div>
    <div class="top-post relative w-1200px">
      <div class="flex justify-between items-center pb-10">
        <div>
          <h2 class="text-white text-xl font-semibold relative">
            Movies
            <span class="absolute w-20 h-1 bg-red-500 -top-2 left-0"></span>
          </h2>
        </div>
      </div>
      <div class="grid grid-cols-5 gap-70">
      <!-- Filter Sidebar -->
      <div class="">
        <MovieFilter @update-filter="updateFilter" />
      </div>
      <!-- Movies Grid -->
          <div class="grid grid-cols-4 gap-6 col-span-4">
            <div v-for="index in 6" :key="index" class="relative group">
              <div class="relative overflow-hidden rounded-lg">
                <!-- Rating Badge (Always Visible) -->
                <span class="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 text-xs rounded z-10">
                  7.0
                </span>
                
                <!-- Movie Image -->
                <img :src="Image" alt="Movie Poster" class="rounded-lg transition-all duration-300 imgs-100">
                
                <!-- Darker Hover Overlay -->
                <div class="absolute inset-0 bg-black bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
                  <div class="flex items-center space-x-2 text-white text-lg font-semibold">
                    <span class="text-yellow-400 text-2xl">⭐</span>
                    <span>6.5</span>
                  </div>
                  <div class="text-white text-sm mt-1">Action</div>
                  <button class="mt-3 px-6 py-2 bg-red-600 text-white font-semibold text-sm rounded-full">
                    <router-link to="/detail">VIEW</router-link>
                  </button>
                </div>
              </div>
              <!-- Movie Title and Year -->
              <div class="text-white font-normal mt-2">Wonder Woman 1984</div>
              <div class="text-gray-400">2020</div>
            </div>
          </div>
      </div>
   </div>
</template>
