<script setup lang="ts">
import Logo from '../assets/icon/foot-logo.png';
</script>
<template>
    <div class="text-gray-400 py-6 footer-set bg-foot">
      <div class="w-1200px mx-auto flex justify-between items-center">
        <span class="text-sm">© 2021 MoovieTime. All rights reserved.</span>
        <div class="flex items-center space-x-2">
          <img :src="Logo" class="rounded-lg transition-all duration-300 imgs-100">
        </div>
        <span class="text-sm">Made with VUEJS</span>
      </div>
    </div>
  </template>
  