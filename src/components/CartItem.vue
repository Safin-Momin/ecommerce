<script setup>
import { computed } from "vue";
import { useStore } from "../stores/store";
import router from "../router";
const store = useStore();
const productsInCart = store.cart;

const removeAllItems = () => {
  const confirmRemove = window.confirm("Do you want to remove all items in your cart?");
  if (confirmRemove) {
    const cartItems = document.querySelectorAll(".flex-inner");
    cartItems.forEach((item) => item.remove());
    store.removeAllItems();
    router.push("/");
  }
};

const removeProductFromCart = (product) => {
  const confirmRemove = window.confirm("Do you want to remove all items in your cart?");
  if (confirmRemove) {
    store.removeFromCart(product);
    window.location.reload();
  }
};

if (store.cart.length === 0) {
  router.push("/");
}

const incrementQuantity = (product) => {
  product.quantity++;
  calculateTotalPrice(product);
  store.updateCartInLocalStorage();
};

const decrementQuantity = (product) => {
  if (product.quantity > 1) {
    product.quantity--;
    calculateTotalPrice(product);
    store.updateCartInLocalStorage();
  }
};

const calculateTotalPrice = (product) => {
  product.total = product.price * product.quantity;
};

const formatPrice = (price) => {
  return store.priceFormatter(price);
};

const totalQuantityInCart = computed(() => {
  return productsInCart.reduce((total, product) => total + product.quantity, 0);
});

const totalPriceInCart = computed(() => {
  return productsInCart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
});

const checkout = () => {
  store.checkout();
  router.push("/checkout");
};
</script>
<template>
  <div class="cart-main">
    <div class="cart-box">
      <div class="cart-flex">
        <div class="cart-header">
          <h1 class="cart-heading">Shopping Cart</h1>
          <span class="remove-items" @click="removeAllItems">Remove All</span>
        </div>
        <div class="flex-inner" v-for="product in productsInCart" :key="product.id">
          <div class="cart-img">
            <img :src="product.img" alt="" />
          </div>
          <div class="cart-description">
            <div class="cart-item-name">
              {{ product.name }}
            </div>
            <span class="cart-discount">-{{ product.discount }}</span
            ><br />
            <div class="cart-price">{{ formatPrice(product.price) }}</div>
            <span class="ml-3 max-[283px]:ml-0">M.R.P.: </span>
            <span class="mrp"> {{ formatPrice(product.mrp) }}</span
            ><br />
            <span class="cart-stock">In Stock</span>
            <div class="inc-dec">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="w-7 h-7 max-[520px]:w-5 max-[520px]:h-5"
                @click="decrementQuantity(product)"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
              </svg>

              <span
                class="text-lg font-semibold text-[#333] select-none max-[520px]:font-normal max-[520px]:text-sm"
                >{{ product.quantity }}</span
              >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="w-7 h-7 max-[520px]:w-5 max-[520px]:h-5"
                @click="incrementQuantity(product)"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
              </svg>
            </div>
            <span class="remove" @click="removeProductFromCart(product)">Remove</span>
          </div>
        </div>
        <div class="total-footer">
          <div class="footer-text">
            <div class="text-total">
              <h1 class="sub-total">Sub-Total</h1>
              <p class="sub-item">{{ totalQuantityInCart }} items</p>
            </div>
            <div class="total">{{ formatPrice(totalPriceInCart) }}</div>
          </div>
          <div class="footer-checkout">
            <button class="add-cart" @click="checkout">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
