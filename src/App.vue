<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Header from './components/Header.vue'
import Slider from './components/Slider.vue'
import '@/assets/main.css';
import MovieList from './components/MovieList.vue'
</script>

<template style="max-width:1280px">
  <header>
    <Header />
  </header>

  <main>
    <Slider />
    <div class="back-greyed">
    </div>
    <MovieList/>
  </main>
</template>
