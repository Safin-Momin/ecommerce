<script setup>
import notFound from "../assets/img/404.gif";
</script>

<template>
  <div class="not-found">
    <img class="max-w-7xl" :src="notFound" alt="" />
    <router-link class="home" :to="{ name: 'home' }">Back to Home Page</router-link>
  </div>
</template>
