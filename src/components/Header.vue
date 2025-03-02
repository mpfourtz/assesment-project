<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { useDebounceFn, onClickOutside } from '@vueuse/core';
import Logo from '../assets/icon/movie-timelogo.png';
import Magni from '../assets/icon/magni.png';
import MoviesIcon from '../assets/icon/movie-icons.png';
import { getSearchKeyword } from '@/api';

const isMenuOpen = ref<boolean>(false);
const isSticky = ref<boolean>(false);
const search = ref<string>('');
const searchData = ref<any[]>([]);
const loading = ref<boolean>(false);
const openSearch = ref<boolean>(false);
const error = ref<any>(null);

const searchRef = ref<HTMLElement | null>(null);

const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleScroll = (): void => {
  isSticky.value = window.scrollY > 50;
};

const closeSearch = () => {
  search.value = '';
  searchData.value = [];
  openSearch.value = false;
};

const searchMovies = async () => {
  if (!search.value) return;
  loading.value = true;
  try {
    searchData.value = await getSearchKeyword(search.value);
    openSearch.value = true; 
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

const throttledSearch = useDebounceFn(searchMovies, 500);
watch(search, () => throttledSearch());

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

onClickOutside(searchRef, () => {
  openSearch.value = false;
});

// Computed property to highlight search term
const highlightedSearchData = computed(() => {
  const regex = new RegExp(`(${search.value})`, 'gi');
  return searchData.value.map(movie => {
    return {
      ...movie,
      title: movie.title.replace(regex, `<span class="highlight">$1</span>`)
    };
  });
});

</script>

<template>
  <div :class="{ 'sticky-header': isSticky }" class="top-0 left-0 w-full shadow-md transition-all head-back z-9999 relative">
    <div class="container mx-auto flex justify-between items-center p-4 m-auto w-1200px">
      <router-link to="/" class="text-2xl font-bold">
        <img :src="Logo" class="rounded-lg transition-all duration-300 imgs-100">
      </router-link>
      <div class="relative w-custom" ref="searchRef">
        <img :src="MoviesIcon" alt="movie icon" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5">
        <input 
          v-model="search"
          type="text" 
          placeholder="Search..." 
          class="px-10 py-2 border border-gray-300 rounded-md focus:outline-none w-full text-white"
          style="background-color: #00000021; border:none;"
        />
        <img :src="Magni" alt="magnifying glass" class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5">
        <button v-if="search" class="absolute right-3 top-2 text-gray-500" @click="closeSearch">&times;</button>
        <div 
          v-if="openSearch && searchData.length" 
          class="absolute left-0 mt-2 w-full bg-white shadow-lg rounded-md z-9999"
          style="background-color: #000000E5;"
        >
          <ul>
            <li 
              v-for="(movie, index) in highlightedSearchData" 
              :key="index" 
              class="px-4 py-2 hover:bg-blue-900 cursor-pointer flex justify-between items-center"
              style="color: #E5E5E5;"
            >
              <router-link 
                :to="`/movie/${movie.id}`" 
                class="block w-full h-full text-sm"
                @click="closeSearch"
                v-html="movie.title" 
              >
              </router-link>
              <span v-if="movie.release_date" class="text-gray-400 ml-2">
                ({{ new Date(movie.release_date).getFullYear() }})
              </span>
            </li>
          </ul>
        </div>
      </div>
      
      <nav class="hidden md:flex space-x-6 white-color uppercase">
        <div class="relative group">
            <button class="nav-link pr-6 uppercase semibolds">Categories</button>
            <div class="absolute left-0 mt-2 w-48 shadow-lg opacity-0 group-hover:opacity-100 transition head-back z-9999 uppercase" style="background-color: #fff; color:rgba(30, 35, 43, 1);">
              <router-link to="/movies?category=Action" class="block px-4 py-2 text-xs" style="font-weight: 700;">Action</router-link>
              <router-link to="/movies?category=Adventure" class="block px-4 py-2 text-xs" style="font-weight: 700;">Adventure</router-link>
              <router-link to="/movies?category=Animation" class="block px-4 py-2 text-xs" style="font-weight: 700;">Animation</router-link>
              <router-link to="/movies?category=Comedy" class="block px-4 py-2 text-xs" style="font-weight: 700;">Comedy</router-link>
              <router-link to="/movies?category=Crime" class="block px-4 py-2 text-xs" style="font-weight: 700;">Crime</router-link>
              <router-link to="/movies?category=Documentary" class="block px-4 py-2 text-xs" style="font-weight: 700;">Documentary</router-link>
              <router-link to="/movies?category=Drama" class="block px-4 py-2 text-xs" style="font-weight: 700;">Drama</router-link>
              <router-link to="/movies?category=Family" class="block px-4 py-2 text-xs" style="font-weight: 700;">Family</router-link>
              <router-link to="/movies?category=Fantasy" class="block px-4 py-2 text-xs" style="font-weight: 700;">Fantasy</router-link>
              <router-link to="/movies?category=History" class="block px-4 py-2 text-xs" style="font-weight: 700;">History</router-link>
              <router-link to="/movies?category=Horror" class="block px-4 py-2 text-xs" style="font-weight: 700;">Horror</router-link>
            </div>
          </div>
        <router-link to="/movies" class="nav-link pr-6 semibolds">Movies</router-link>
        <router-link to="/tvshows" class="nav-link pr-6 semibolds">TV Shows</router-link>
        <router-link to="/login" class="nav-link pr-6 semibolds">Login</router-link>
      </nav>
      
      <button @click="toggleMenu" class="md:hidden focus:outline-none">
        <span v-if="!isMenuOpen">☰</span>
        <span v-else>&times;</span>
      </button>
    </div>

    <div v-if="isMenuOpen" class="md:hidden bg-white bg-opacity-5 shadow-md p-4">
      <router-link to="/movies" class="block py-2" @click="toggleMenu">Movies</router-link>
      <router-link to="/tvshows" class="block py-2" @click="toggleMenu">TV Shows</router-link>
      <router-link to="/login" class="block py-2" @click="toggleMenu">Login</router-link>
    </div>
  </div>
</template>

<style scoped>
.semibolds {
  font-weight: 600;
}
.white-color {
  color: #E5E5E5;
}
.prc-90 {
  width: 90%;
}
.w-custom {
  width: 476px;
}
.sticky-header {
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  background-opacity: 5%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.head-back {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
