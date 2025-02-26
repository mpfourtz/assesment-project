<template>
    <swiper
      :slidesPerView="2.5"
      :spaceBetween="40"
      :loop="true"
      :centeredSlides="true"
      :pagination="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="movie in movies" :key="movie.title" class="slide">
        <div class="slide-content flex text-white rounded-lg overflow-hidden">
          <!-- Movie Poster -->
          <div class="w-3/4 relative">
            <img :src="movie.image" alt="Movie Poster" class="w-full h-full object-cover" />
          </div>
  
          <!-- Movie Info -->
          <div class="w-2/2 p-4 flex flex-col justify-center bg-black rounded-r-lg">
            <div class="text-yellow-400 font-bold text-lg">⭐ {{ movie.rating }}</div>
            <h2 class="text-lg font-bold">{{ movie.title }}</h2>
            <p class="text-xs text-gray-400">{{ movie.year }} • {{ movie.genre }}</p>
            <p class="text-xs mt-2 text-gray-300">{{ movie.description}}...</p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </template>
  
  
  <script>
  import { Swiper, SwiperSlide } from "swiper/vue";
  import "swiper/css";
  import "swiper/css/pagination";
  
  export default {
    components: { Swiper, SwiperSlide },
    setup() {
      const movies = [
        {
          title: "Space Sweepers",
          rating: 7.3,
          year: 2021,
          genre: "Sci-Fi",
          description:
            "When the crew of a space junk collector ship called The Victory discovers a humanoid robot named Dorothy that's known to be a weapon of mass destruction, they get involved in a risky business deal which puts their lives at stake.",
          image: "https://img.freepik.com/free-psd/halloween-make-up-woman-triangle-glitch-effect_23-2148313631.jpg",
        },
        {
          title: "Space Sweepers",
          rating: 7.3,
          year: 2021,
          genre: "Sci-Fi",
          description:
            "When the crew of a space junk collector ship called The Victory discovers a humanoid robot named Dorothy that's known to be a weapon of mass destruction, they get involved in a risky business deal which puts their lives at stake.",
          image: "https://img.freepik.com/free-psd/halloween-make-up-woman-triangle-glitch-effect_23-2148313631.jpg",
        },
        {
          title: "Space Sweepers",
          rating: 7.3,
          year: 2021,
          genre: "Sci-Fi",
          description:
            "When the crew of a space junk collector ship called The Victory discovers a humanoid robot named Dorothy that's known to be a weapon of mass destruction, they get involved in a risky business deal which puts their lives at stake.",
          image: "https://img.freepik.com/free-psd/halloween-make-up-woman-triangle-glitch-effect_23-2148313631.jpg",
        },
        {
          title: "Space Sweepers",
          rating: 7.3,
          year: 2021,
          genre: "Sci-Fi",
          description:
            "When the crew of a space junk collector ship called The Victory discovers a humanoid robot named Dorothy that's known to be a weapon of mass destruction, they get involved in a risky business deal which puts their lives at stake.",
          image: "https://img.freepik.com/free-psd/halloween-make-up-woman-triangle-glitch-effect_23-2148313631.jpg",
        },
        {
          title: "Space Sweepers",
          rating: 7.3,
          year: 2021,
          genre: "Sci-Fi",
          description:
            "When the crew of a space junk collector ship called The Victory discovers a humanoid robot named Dorothy that's known to be a weapon of mass destruction, they get involved in a risky business deal which puts their lives at stake.",
          image: "https://img.freepik.com/free-psd/halloween-make-up-woman-triangle-glitch-effect_23-2148313631.jpg",
        },
        {
          title: "Space Sweepers",
          rating: 7.3,
          year: 2021,
          genre: "Sci-Fi",
          description:
            "When the crew of a space junk collector ship called The Victory discovers a humanoid robot named Dorothy that's known to be a weapon of mass destruction, they get involved in a risky business deal which puts their lives at stake.",
          image: "https://img.freepik.com/free-psd/halloween-make-up-woman-triangle-glitch-effect_23-2148313631.jpg",
        },
        {
          title: "Space Sweepers",
          rating: 7.3,
          year: 2021,
          genre: "Sci-Fi",
          description:
            "When the crew of a space junk collector ship called The Victory discovers a humanoid robot named Dorothy that's known to be a weapon of mass destruction, they get involved in a risky business deal which puts their lives at stake.",
          image: "https://img.freepik.com/free-psd/halloween-make-up-woman-triangle-glitch-effect_23-2148313631.jpg",
        },
        // Add more movie objects here
      ];
      return { movies };
    },
  };
  </script>
  
  <style scoped>
  .mySwiper {
    padding: 20px;
  }
  .slide-content {
    transition: transform 0.3s ease-in-out;
    display: flex;
    align-items: center;
  }
  .slide:hover .slide-content {
    transform: scale(1.05);
  }
  </style>
  