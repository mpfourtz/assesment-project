<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import Logo from '../assets/icon/movie-timelogo.png'
  
  const isMenuOpen = ref<boolean>(false);
  const isSticky = ref<boolean>(false);
  
  const toggleMenu = (): void => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  
  const handleScroll = (): void => {
    isSticky.value = window.scrollY > 50;
  };
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>
<template>
    <div :class="{ 'sticky-header': isSticky }" class=" top-0 left-0 w-full shadow-md transition-all head-back">
      <div class="container mx-auto flex justify-between items-center p-4 m-auto prc-90">
        <!-- Logo -->
        <router-link to="/" class="text-2xl font-bold"><img :src="Logo" alt="Movie Poster" class="rounded-lg transition-all duration-300 imgs-100"></router-link>
        
        <!-- Search Bar -->
        <input 
          type="text" 
          placeholder="Search..." 
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none w-custom"
        />
        
        <!-- Desktop Nav -->
        <nav class="hidden md:flex space-x-6 white-color uppercase">
          <div class="relative group">
            <button class="nav-link pr-6 uppercase semibolds">Categories</button>
            <div class="absolute left-0 mt-2 w-48 shadow-lg opacity-0 group-hover:opacity-100 transition head-back z-9999" style="background-color: #fff; color:rgba(30, 35, 43, 1);">
              <router-link to="/movies" class="block px-4 py-2 text-xs" style="font-weight: 700;">Action</router-link>
              <router-link to="/movies" class="block px-4 py-2 text-xs" style="font-weight: 700;">Comedy</router-link>
            </div>
          </div>
          <router-link to="/movies" class="nav-link pr-6 semibolds">Movies</router-link>
          <router-link to="/tvshows" class="nav-link pr-6 semibolds">TV Shows</router-link>
          <router-link to="/login" class="nav-link pr-6 semibolds">Login</router-link>
        </nav>
        
        <!-- Mobile Menu Button -->
        <button @click="toggleMenu" class="md:hidden focus:outline-none">
          <span v-if="!isMenuOpen">☰</span>
          <span v-else>&times;</span>
        </button>
      </div>
  
      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="md:hidden bg-white bg-opacity-5 shadow-md p-4">
        <router-link to="/movies" class="block py-2" @click="toggleMenu">Movies</router-link>
        <router-link to="/tvshows" class="block py-2" @click="toggleMenu">TV Shows</router-link>
        <router-link to="/login" class="block py-2" @click="toggleMenu">Login</router-link>
      </div>
    </div>
  </template>
  
  
  <style scoped>
  .semibolds{
    font-weight: 600;
  }
  .white-color{
    color:#E5E5E5;
  }
  .prc-90{
    width: 90%;
  }
  .w-custom{
    width: 476px;
  }
  .sticky-header {
    /* position: fixed; */
    top: 0;
    left: 0;
    width: 100%;
    background: white;
    background-opacity: 5%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
.head-back{
    background-color: rgba(255, 255, 255, 0.1);
}
  </style>
  