<script setup>
import { useStore } from "../stores/store";
const store = useStore();

import { onMounted } from "vue";

onMounted(() => {
  store.fetchProducts();
});

const addToCart = (product) => {
  store.addToCart(product);
};

const formatPrice = (price) => {
  return store.priceFormatter(price);
};
</script>

<template>
  <div class="card">
    <div class="product" v-for="product in store.products" :key="product.id">
      <div class="flex justify-center">
        <img class="product-img" :src="product.img" alt="" />
      </div>
      <p class="product-name">
        {{ product.name }}
      </p>
      <div class="price-detail">
        <div class="discount">-{{ product.discount }}</div>
        <div class="price">{{ formatPrice(product.price) }}</div>
      </div>
      <span class="">M.R.P.: </span>
      <span class="mrp"> {{ formatPrice(product.mrp) }}</span
      ><br />
      <button class="add-cart" @click="addToCart(product)">Add to Cart</button>
    </div>
  </div>
</template>
