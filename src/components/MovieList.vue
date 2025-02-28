<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';

// Reactive variable to store movie list
const movies = ref<any[]>([]); // Array to store movies

// Function to fetch data from API
const fetchData = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}`);
    console.log("API Response:", response.data); // Adjust the API endpoint
    movies.value = response.data.results; // Assuming the API response has a 'results' array
  } catch (error) {
    console.error("API Error:", error);
  }
};

// Fetch movies when component is mounted
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="w-1200px p-6 top-post relative">
    <!-- Header Section -->
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-white text-xl font-semibold relative">
          Discover Movies
          <span class="absolute w-20 h-1 bg-red-500 -top-2 left-0"></span>
        </h2>
      </div>
      <div class="flex space-x-3">
        <button class="px-4 py-2 bg-red-600 text-white text-sm rounded-full">
          Popularity
        </button>
        <button class="px-4 py-2 bg-gray-800 text-white text-sm rounded-full">
          Release Date
        </button>
      </div>
    </div>

    <!-- Movies Grid -->
    <!-- Movies Grid -->
  <div v-if="movies.length > 0" class="grid grid-cols-5 gap-10 mt-6">
    <div v-for="movie in movies" :key="movie.id" class="relative group">
      <div class="relative overflow-hidden rounded-lg">
        <!-- Rating Badge -->
        <span class="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 text-xs rounded z-10">
          {{ movie.vote_average.toFixed(1) }}
        </span>

        <!-- Movie Image -->
        <img :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'" 
            alt="Movie Poster" class="rounded-lg transition-all duration-300 imgs-100">

        <!-- Darker Hover Overlay -->
        <div class="absolute inset-0 bg-black bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
          <div class="flex items-center space-x-2 text-white text-lg font-semibold">
            <span class="text-yellow-400 text-2xl">⭐</span>
            <span>{{ movie.vote_average.toFixed(1) }}</span>
          </div>
          <div class="text-white text-sm mt-1">{{ movie.genre_ids[0] || "Unknown" }}</div>
          <button class="mt-3 px-6 py-2 bg-red-600 text-white font-semibold text-sm rounded-full">
            VIEW
          </button>
        </div>
      </div>

      <!-- Movie Title and Year -->
      <div class="text-white font-normal mt-2">{{ movie.title }}</div>
      <div class="text-gray-400">{{ movie.release_date.split('-')[0] }}</div>
    </div>
  </div>
  <div v-else class="text-gray-400 text-center mt-6 text-lg">
  No movies found. Please try again later.
</div>
  </div>
</template>
