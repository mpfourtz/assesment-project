<script setup lang="ts">
import Image from '../assets/images/image-movies.png'
</script>
<template>
<div class="w-1200 top-post relative">
    <div class="grid grid-cols-5 gap-10">
        <div>
            <div class="relative">
            <span class="absolute pos-right-top">7.0</span>
            <img :src="Image" alt="Logo" class="fitted"/>
            </div>
            <div class="text-white font-normal">Wonder Woman 1984</div>
            <div>2020</div>
        </div>
    </div>
</div>
</template>