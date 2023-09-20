<script setup>
import { computed } from "vue";
import ProductsView from "@/components/ProductsView.vue";
import { useStore } from "../stores/store";
const store = useStore();
const cartLength = computed(() => store.cartLength);
</script>

<template>
  <div class="main">
    <div class="box">
      <div class="header">
        <img
          class="logo"
          src="https://www.zarla.com/images/zarla-shop-stock-1x1-2400x2400-20220124-h7d7kv83x8xyx4ft9xjb.png?crop=1:1,smart&width=250&dpr=2"
          alt="logo"
        />
        <div class="cart">
          <RouterLink to="/cart">
            <div class="number">{{ cartLength }}</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-full h-full text-blue-950"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </RouterLink>
        </div>
      </div>
      <img
        class="banner-img"
        src="https://ecommercenews.com.au/uploads/story/2021/09/21/GettyImages-1323562285.webp"
        alt=""
      />
      <h1 class="heading">Electronics</h1>
      <p class="sub-heading">Innovation begins here!</p>
      <ProductsView />
    </div>
  </div>
</template>
