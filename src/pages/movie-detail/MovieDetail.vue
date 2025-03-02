<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import moment from 'moment';

// Assets
import Star from '@/assets/icon/star.png';

// Vue Router
const route = useRoute();
const router = useRouter();

// Movie State
const movieslist = ref<any[]>([]);
const movie = ref<Movie | null>(null);
const reviews = ref<Array<any>>([]);

// Movie Interface
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  status: string;
  original_language: string;
  budget: number;
  release_date: string;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string }[];
}

// Fetch Movie List
const fetchMovies = async () => {
  try {
    const response = await axios.get<{ results: Movie[] }>(
      `${import.meta.env.VITE_API_URL}3/movie/${route.params.id}/recommendations?api_key=9fabcfbbc014bf7f64c9dcf89da12f67`
    );
    movieslist.value = response.data.results.filter(
      (m) => m.id !== Number(route.params.id)
    );
  } catch (error) {
    console.error("API Error:", error);
  }
};

// Fetch Movie Details
const fetchMovieDetails = async () => {
  try {
    const response = await axios.get<Movie>(
      `${import.meta.env.VITE_API_URL}3/movie/${route.params.id}?api_key=9fabcfbbc014bf7f64c9dcf89da12f67`
    );
    movie.value = response.data;
    console.log(response.data)
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
};

// Fetch Reviews
const fetchReview = async () => {
  try {
    const response = await axios.get<{ results: any[] }>(
      `${import.meta.env.VITE_API_URL}3/movie/${route.params.id}/reviews?api_key=9fabcfbbc014bf7f64c9dcf89da12f67`
    );
    reviews.value = response.data.results;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

// Get Language Name
const getLanguageName = (code: string): string => {
  const languageMap: Record<string, string> = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    ja: "Japanese",
    zh: "Chinese",
    hi: "Hindi",
    ru: "Russian",
    pt: "Portuguese",
    ko: "Korean",
    ar: "Arabic",
    tr: "Turkish",
  };
  return languageMap[code] || "Unknown";
};

// Format Currency
const formatCurrency = (amount?: number) => {
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

// Watch Route Changes and Reload Page
watch(() => route.params.id, () => {
  window.scrollTo(0, 0); // Scroll to top
  window.location.reload(); // Force page reload
});


// Fetch Data on Mount
onMounted(() => {
  fetchMovies();
  fetchMovieDetails();
  fetchReview();
});
</script>
<template>
      <div style="background-color: #fff;">
        <div 
          class="bg-hero overlay bg-postt" 
          :style="{
            backgroundImage: movie?.backdrop_path ? `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')` : 'url(/placeholder.jpg)'
          }"
        >
          <!-- <img :src="movie?.poster_path ? `https://image.tmdb.org/t/p/original${movie?.backdrop_path}` : '/placeholder.jpg'" class="w-full h-auto object-cover absolute top-0 left-0" style="transform: translateY(-20%);top:163px;" /> -->
        </div>
        <div class="bottom-20 relative z-9998" style="height: 80px; background-color:rgba(0, 0, 0, 0.5) ; color:#fff;">
           <div style="margin-left: 29%;">
                <div class="grid grid-cols-7 relative gap-6" style="font-size: 11px; padding-top:10px">
                    <div class="grid grid-cols-3 col-span-2">
                        <div><img :src="Star" class="" /></div>
                        <div style="font-size: 36px;">{{ movie?.vote_average.toFixed(1) }}</div>
                        <div style="padding-top:10px">
                            <div style="color:rgba(255, 255, 255, 0.5); border-left:1px solid rgba(255, 255, 255, 0.2);">USER SCORE</div>
                            <div>{{movie?.vote_count}} VOTES</div>
                        </div>
                    </div>
                    <div style="padding-top:10px">
                        <div class="" style="border-left:1px solid rgba(255, 255, 255, 0.2); padding-left:20px">
                            <div style="color:rgba(255, 255, 255, 0.5);">STATUS</div>
                            <div class="uppercase">{{movie?.status}}</div>
                        </div>
                    </div>
                    <div style="padding-top:10px">
                        <div class="" style="border-left:1px solid rgba(255, 255, 255, 0.2); padding-left:20px">
                            <div style="color:rgba(255, 255, 255, 0.5);">LANGUAGE</div>
                            <div class="uppercase">{{ getLanguageName(movie?.original_language ?? '') }}</div>
                        </div>
                    </div>
                    <div style="padding-top:10px">
                        <div class="" style="border-left:1px solid rgba(255, 255, 255, 0.2); padding-left:20px">
                            <div style="color:rgba(255, 255, 255, 0.5);">BUDGET</div>
                            <div>{{ formatCurrency(movie?.budget) }}</div>
                        </div>
                    </div>
                    <div style="padding-top:10px">
                        <div class="" style="border-left:1px solid rgba(255, 255, 255, 0.2); padding-left:20px">
                            <div style="color:rgba(255, 255, 255, 0.5);">PRODUCTION</div>
                            <div class="uppercase">{{movie?.production_companies[0].name}}</div>
                        </div>
                    </div>
                </div>
           </div>
        </div>
        <section class="relative z-9998" style="top:-320px;">
            <div class="grid grid-cols-10 w-1200px relative" style="">
                <div class="col-span-2">
                    <img :src="movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}` : '/placeholder.jpg'"  class="w-40 h-60 rounded-lg imgs-100 hgs-100" />
                </div>
                <div class="col-span-8 pl-10">
                    <div class="text-white" style="font-size: 36px;"> {{ movie?.release_date ? new Date(movie.release_date).getFullYear() : '' }}</div>
                    <div class="text-white" style="font-size: 36px;">{{movie?.title}}</div>
                    <div class="text-white" style="font-size: 14px;">{{ movie?.genres?.map(genre => genre.name).join(', ') }}</div>
                    <div class="pt-37">
                        <div style="font-size: 14px; color:rgba(255, 0, 0, 1); font-weight:600">OVERVIEW</div>
                        <div style="font-size: 14px;">{{movie?.overview}}</div>
                    </div>
                </div>
            </div>
            <div class="w-1200px pt-30">
                <div class="pb-5" style="font-size: 14px; color:rgba(255, 0, 0, 1); font-weight:600">REVIEWS</div>
                <div class="grid grid-cols-2 gap-4">
                    <div v-for="review in reviews" :key="review.id" class="bg-white shadow-md rounded-lg p-6">   
                        <div class="flex justify-between items-center mb-2 pb-7">
                            <div class="flex items-center gap-2">
                                <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
                                <div>
                                <p class="font-semibold">{{ review?.author_details.username }}</p>
                                <p class="text-sm text-gray-500">{{ moment(review.created_at).format("MMMM D, YYYY") }}</p>
                                </div>
                            </div>
                            <div class="bg-gray-100 px-3 py-1 rounded-md flex items-center gap-1">
                                <span class="text-yellow-500">⭐</span>
                                <span class="font-bold" style="font-size: 36px;">{{ review?.author_details.rating }}</span>
                            </div>
                        </div>
                        <p class="italic text-gray-700 mb-4">{{ review?.content?.slice(0, 603) }}</p>
                        <a :href="review?.url" target="_blank" class="text-red-500 underline">read the rest.</a>
                    </div>
                </div>
            </div>
        </section>
        <section style="background-color: rgba(30, 35, 43, 1);" class="pt-20 pb-20">
            <div class="w-1200px">
                <div v-if="movieslist.length > 0" class="grid grid-cols-5 gap-10 mt-6">
                    <div v-for="movie in movieslist.slice(0, 5)" :key="movie.id" class="relative group">
                        <div class="relative overflow-hidden rounded-lg">
                            <span class="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 text-xs rounded z-10">
                            {{ movie.vote_average.toFixed(1) }}
                            </span>

                            <img :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'" 
                                alt="Movie Poster" class="rounded-lg transition-all duration-300 imgs-100">

                            <div class="absolute inset-0 bg-black bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
                            <div class="flex items-center space-x-2 text-white text-lg font-semibold">
                                <span class="text-yellow-400 text-2xl">⭐</span>
                                <span>{{ movie.vote_average.toFixed(1) }}</span>
                            </div>
                            <div class="text-white text-sm mt-1">{{ movie.genre_ids[0] || "Unknown" }}</div>
                            <router-link :to="`/movie/${movie.id}`">
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
                <div v-else class="text-gray-400 text-center mt-6 text-lg">
                No movies found. Please try again later.
                </div>
            </div>
        </section>
      </div>
</template>