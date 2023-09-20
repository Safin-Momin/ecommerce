<script setup>
import router from "../router";
</script>

<template>
  <div class="modal-div">
    <h1 class="modal-text">Congratulations! Your order is placed successfully 🚀</h1>
    <button
      @click="
        {
          {
            router.push('/');
          }
        }
      "
      class="modal-btn"
    >
      Back to home page
    </button>
  </div>
</template>
