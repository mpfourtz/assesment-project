<script setup>
  import Banner from '@/assets/images/banner.png';
  import Star from '@/assets/icon/star.png';
  import Poster from '@/assets/images/poster.png';
  import Image from '@/assets/images/image-movies.png'
  const recommendedMovies = [
    { id: 1, title: "The New Mutants", year: 2020, image: "/path-to-movie1.jpg" },
    { id: 2, title: "Soul", year: 2020, image: "/path-to-movie2.jpg" },
    { id: 3, title: "Tenet", year: 2020, image: "/path-to-movie3.jpg" },
    { id: 4, title: "The Old Guard", year: 2020, image: "/path-to-movie4.jpg" },
    { id: 5, title: "Project Power", year: 2020, image: "/path-to-movie5.jpg" }
  ];
  const reviews = [
  {
    author: "SWITCH.",
    date: "December 18, 2020",
    excerpt:
      "It isn't as easy as saying 'Wonder Woman 1984' is a good or bad movie. The pieces are there, and there are moments I adore, but it does come across as a bit of a mess, even though the action sequences are breathtaking. If you're a fan of the original film, you'll be more willing to take the ride, but for those more indifferent, it may be a bit of a blander sit. If you can and are planning to watch it, the theatrical experience is the way to go - there is nothing like seeing these stunning sets, fun action scenes and hearing Zimmer's jaw-dropping score like on the big screen. - Chris dos Santos... read the rest.",
    rating: "7.0",
  },
  {
    author: "msbreviews",
    date: "December 18, 2020",
    excerpt:
      `If you enjoy reading my Spoiler-Free reviews, please follow my blog @ https://www.msbreviews.com
The superhero genre has been growing exponentially during the last decade, so it's bizarre to go through an entire year with only Birds of Prey and The New Mutants instead of literally dozens of films from both Marvel and DC. Thankfully, Warner Bros. decided to release Wonder Woman 1984 before the year's end, but not without a catch. Most people will only have the possibility of watching one of the few blockbusters of 2020 through HBO Max, a streaming service only `,
    rating: "8.0",
  },
];
  </script>
<template>
      <div style="background-color: #fff;">
        <div class="relative h-[500px] overflow-hidden overlay">
          <img :src="Banner" class="w-full h-auto object-cover absolute top-0 left-0" style="transform: translateY(-20%);top:163px;" />
        </div>
        <div class="bottom-20 relative z-9999" style="height: 80px; background-color:rgba(0, 0, 0, 0.5) ; color:#fff;">
           <div style="margin-left: 29%;">
                <div class="grid grid-cols-7 relative gap-6" style="font-size: 11px; padding-top:10px">
                    <div class="grid grid-cols-3 col-span-2">
                        <div><img :src="Star" class="" /></div>
                        <div style="font-size: 36px;">7.0</div>
                        <div style="padding-top:10px">
                            <div style="color:rgba(255, 255, 255, 0.5); border-left:1px solid rgba(255, 255, 255, 0.2);">USER SCORE</div>
                            <div>3621 VOTES</div>
                        </div>
                    </div>
                    <div style="padding-top:10px">
                        <div class="" style="border-left:1px solid rgba(255, 255, 255, 0.2); padding-left:20px">
                            <div style="color:rgba(255, 255, 255, 0.5);">STATUS</div>
                            <div>RELEASED</div>
                        </div>
                    </div>
                    <div style="padding-top:10px">
                        <div class="" style="border-left:1px solid rgba(255, 255, 255, 0.2); padding-left:20px">
                            <div style="color:rgba(255, 255, 255, 0.5);">LANGUAGE</div>
                            <div>ENGLISH</div>
                        </div>
                    </div>
                    <div style="padding-top:10px">
                        <div class="" style="border-left:1px solid rgba(255, 255, 255, 0.2); padding-left:20px">
                            <div style="color:rgba(255, 255, 255, 0.5);">BUDGET</div>
                            <div>$200,000,000.00</div>
                        </div>
                    </div>
                    <div style="padding-top:10px">
                        <div class="" style="border-left:1px solid rgba(255, 255, 255, 0.2); padding-left:20px">
                            <div style="color:rgba(255, 255, 255, 0.5);">PRODUCTION</div>
                            <div>DC ENTERTAINMENT</div>
                        </div>
                    </div>
                </div>
           </div>
        </div>
        <section class="relative z-9999" style="top:-320px;">
            <div class="grid grid-cols-10 w-1200px relative" style="">
                <div class="col-span-2">
                    <img :src="Poster" class="w-40 h-60 rounded-lg imgs-100 hgs-100" />
                </div>
                <div class="col-span-8">
                    <div class="text-white" style="font-size: 36px;">2020</div>
                    <div class="text-white" style="font-size: 36px;">Wonder Woman 1984</div>
                    <div class="text-white" style="font-size: 14px;">Fantasy, Action, Adventure</div>
                    <div class="pt-37">
                        <div style="font-size: 14px; color:rgba(255, 0, 0, 1); font-weight:600">OVERVIEW</div>
                        <div style="font-size: 14px;"> Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s and finds a formidable foe by the name of the Cheetah.</div>
                    </div>
                </div>
            </div>
            <div class="w-1200px">
                <div style="font-size: 14px; color:rgba(255, 0, 0, 1); font-weight:600">REVIEWS</div>
                <div class="flex gap-4">
                    <div v-for="(review, index) in reviews" :key="index" class="bg-white shadow-md rounded-lg p-6 w-1/2">
                    <div class="flex justify-end mt-4">
                        <div class="bg-gray-100 px-3 py-1 rounded-md flex items-center gap-1">
                        <span class="text-yellow-500">⭐</span>
                        <span class="font-bold text-lg">{{ review.rating }}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 mb-2">
                        <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div>
                        <p class="font-semibold">{{ review.author }}</p>
                        <p class="text-sm text-gray-500">{{ review.date }}</p>
                        </div>
                    </div>
                    <p class="italic text-gray-700 mb-4">{{ review.excerpt }}</p>
                    <a href="#" class="text-red-500 underline">read the rest.</a>
                    </div>
                </div>
            </div>
        </section>
        <section style="background-color: rgba(30, 35, 43, 1);" class="pt-20 pb-20">
            <div class="w-1200px">
                <div class="grid grid-cols-5 gap-10 mt-6">
                    <div v-for="index in 5" :key="index" class="relative group">
                        <div class="relative overflow-hidden rounded-lg">
                        <!-- Rating Badge (Always Visible) -->
                        <span class="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 text-xs rounded z-10">
                            7.0
                        </span>
                        
                        <!-- Movie Image -->
                        <img :src="Image" alt="Movie Poster" class="rounded-lg transition-all duration-300 imgs-100">
                        
                        <!-- Darker Hover Overlay -->
                        <div class="absolute inset-0 bg-black bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
                            <div class="flex items-center space-x-2 text-white text-lg font-semibold">
                            <span class="text-yellow-400 text-2xl">⭐</span>
                            <span>6.5</span>
                            </div>
                            <div class="text-white text-sm mt-1">Action</div>
                            <button class="mt-3 px-6 py-2 bg-red-600 text-white font-semibold text-sm rounded-full">
                            VIEW
                            </button>
                        </div>
                        </div>

                        <!-- Movie Title and Year -->
                        <div class="text-white font-normal mt-2">Wonder Woman 1984</div>
                        <div class="text-gray-400">2020</div>
                    </div>
                </div>
            </div>
        </section>
      </div>
</template>