<template>
  <swiper
    :slidesPerView="2.5"
    :spaceBetween="40"
    :loop="true"
    :centeredSlides="true"
    :pagination="{ clickable: true }"
    :modules="[Pagination]"
    class="mySwiper"
  >
    <swiper-slide v-for="movie in movies" :key="movie.id" class="slide">
      <div class="slide-content flex text-white rounded-lg overflow-hidden">
        <!-- Movie Poster -->
        <div class="w-3/4 relative">
          <img
            :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'"
            alt="Movie Poster"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Movie Info -->
        <div class="w-2/2 p-4 flex flex-col justify-center bg-black rounded-r-lg">
          <div class="text-yellow-400 font-bold text-lg">⭐ {{ movie.vote_average.toFixed(1) }}</div>
          <h2 class="text-lg font-bold">{{ movie.title }}</h2>
          <p class="text-xs text-gray-400">{{ movie.release_date.split('-')[0] }} • {{ movie.genre_ids[0] || "Unknown" }}</p>
          <p class="text-xs mt-2 text-gray-300">{{ movie.overview }}</p>
        </div>
      </div>
    </swiper-slide>

    <!-- Handle Empty State -->
    <div v-if="movies.length === 0" class="text-center text-gray-400 py-6">
      No movies available. Please try again later.
    </div>
  </swiper>
</template>



<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

// Reactive variable for storing movies
const movies = ref<any[]>([]);

// Fetch movies from API
const fetchMovies = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}`);
    movies.value = response.data.results; // Assuming API returns a `results` array
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

// Fetch movies on component mount
onMounted(fetchMovies);
</script>

