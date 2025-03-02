<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import MovieFilter from '@/components/MovieFilter.vue';

const movies = ref<any[]>([]);
const sortBy = ref('popularity');
const selectedGenres = ref<string[]>([]);

const genreMap: Record<string, number> = {
  'Action': 28, 'Adventure': 12, 'Animation': 16, 'Comedy': 35, 'Crime': 80,
  'Documentary': 99, 'Drama': 18, 'Family': 10751, 'Fantasy': 14, 'History': 36,
  'Horror': 27, 'Music': 10402, 'Mystery': 9648, 'Romance': 10749, 'Science Fiction': 878,
  'TV Movie': 10770, 'Thriller': 53, 'War': 10752, 'Western': 37
};

const fetchMovies = async () => {
  try {
    const genreIds = selectedGenres.value
      .map(genre => genreMap[genre])
      .filter(id => id !== undefined)
      .join(',');

    const genreQuery = genreIds ? `&with_genres=${genreIds}` : '';
    const sortQuery = `&sort_by=${sortBy.value}.desc`;

    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=9fabcfbbc014bf7f64c9dcf89da12f67${sortQuery}${genreQuery}`
    );

    movies.value = response.data.results;
  } catch (error) {
    console.error('API Error:', error);
  }
};

const updateFilter = (filter: { sortBy: string, selectedGenres: string[] }) => {
  sortBy.value = filter.sortBy;
  selectedGenres.value = filter.selectedGenres;
  fetchMovies();
};

const route = useRoute();

watch(() => route.query.category, (newCategory) => {
   //window.scrollTo(0, 0);
    //window.location.reload();
  if (newCategory && typeof newCategory === 'string') {
    selectedGenres.value = newCategory.split(',');
    fetchMovies();
  }
});

onMounted(() => {
  fetchMovies();
});
</script>



<template>
  <div class="back-greyed"></div>
  <div class="top-post relative w-1200px">
    <div class="flex justify-between items-center pb-10">
      <h2 class="text-white text-xl font-semibold relative">
        Movies
        <span class="absolute w-20 h-1 bg-red-500 -top-2 left-0"></span>
      </h2>
    </div>
    
    <div class="grid grid-cols-5 gap-70">
      <div>
        <MovieFilter @update-filter="updateFilter" />
      </div>
      <div class="grid grid-cols-4 gap-6 col-span-4">
        <div v-for="movie in movies" :key="movie.id" class="relative group">
          <div class="relative overflow-hidden rounded-lg">
            <span class="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 text-xs rounded z-10">
              {{ movie.vote_average.toFixed(1) }}
            </span>
            <img 
              :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'"
              alt="Movie Poster"
              class="rounded-lg transition-all duration-300 imgs-100"
              style="min-height: 370px;"
            />
            <div class="absolute inset-0 bg-black bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
              <div class="flex items-center space-x-2 text-white text-lg font-semibold">
                <span class="text-yellow-400 text-2xl">⭐</span>
                <span>{{ movie.vote_average.toFixed(1) }}</span>
              </div>
              <router-link :to="`/movie/${movie.id}`" class="cursor-pointer">
                <button class="mt-3 px-6 py-2 bg-red-600 text-white font-semibold text-sm rounded-full cursor-pointer">
                  VIEW
                </button>
              </router-link>
            </div>
          </div>

          <div class="text-white font-normal mt-2">{{ movie.title }}</div>
          <div class="text-gray-400">{{ movie.release_date.split('-')[0] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
