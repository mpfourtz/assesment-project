<script setup lang="ts">
import Header from './components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <header>
    <Header/>
  </header>
  <router-view />
  <footer>
    <Footer />
  </footer>
</template>
