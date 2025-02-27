import { createRouter, createWebHistory } from 'vue-router';
import Movie from '@/pages/Movie.vue'; // Import Movie.vue
import Detail from '@/pages/movie-detail/MovieDetail.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/pages/Home.vue'), // Ensure a Home page exists
  },
  {
    path: '/movies',
    component: Movie, // Set up the Movie page route
  },
  {
    path: '/detail',
    component: Detail, // Set up the Movie page route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
