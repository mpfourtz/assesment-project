<script setup lang="ts">
import Image from '../assets/images/image-movies.png'
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
    <div class="grid grid-cols-5 gap-10 mt-6">
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
              VIEW
            </button>
          </div>
        </div>

        <!-- Movie Title and Year -->
        <div class="text-white font-normal mt-2">Wonder Woman 1984</div>
        <div class="text-gray-400">2020</div>
      </div>
    </div>
  </div>
</template>
