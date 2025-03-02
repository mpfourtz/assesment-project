<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

// Reactive variable for storing movies
const movies = ref<any[]>([]);

// Fetch movies from API
const fetchMovies = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}3/discover/movie?api_key=9fabcfbbc014bf7f64c9dcf89da12f67`);
    movies.value = response.data.results; // Assuming API returns a `results` array
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

// Fetch movies on component mount
onMounted(fetchMovies);
</script>
<template>
  <swiper
    :slidesPerView="2.5"
    :spaceBetween="40"
    :loop="true"
    :centeredSlides="true"
    :autoplay="{ delay: 2000, disableOnInteraction: false }"
    :pagination="{
            enabled: true,
            clickable: true,
          }"
    :modules="[Pagination, Autoplay]"
    class="mySwiper"
  >
    <swiper-slide v-for="movie in movies" :key="movie.id" class="slide">
      <div class="grid grid-cols-[max-content_1fr] items-center">
        <div class="aspect-10/16 max-w-56">
          <img
            :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'"
            alt="Movie Poster"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="h-[90%] w-full flex flex-col gap-1 bg-black p-6 text-white">
          <div class="flex items-center gap-2">
            <span class="i-ph-star-fill block h-4 w-4 text-[#FFB802]" />
              <span class="text-lg font-semibold">⭐ {{ movie.vote_average.toFixed(1) }}</span>
              </div>
              <h1 class="line-clamp-2 text-2xl font-semibold">
                {{ movie.title }}
              </h1>
              <div class="flex items-center gap-1.5">
                <span class="text-lg">{{ movie.release_date.split('-')[0] }} • {{ movie.genre_ids[0] || "Unknown" }}</span>
                <span class="inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
                <span class="text-lg">aaa</span>
              </div>
              <div class="line-clamp-7 text-xs leading-5">
                {{ movie.overview }}
              </div>
        </div>
      </div>
    </swiper-slide>

    <!-- Handle Empty State -->
    <div v-if="movies.length === 0" class="text-center text-gray-400 py-6">
      No movies available. Please try again later.
    </div>
  </swiper>
</template>

