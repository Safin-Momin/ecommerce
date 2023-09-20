<script setup>
import router from "../router";
import { computed, reactive, ref } from "vue";
import { useStore } from "../stores/store";
import { required, email, minLength, numeric } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import ModalView from "./ModalView.vue";

const store = useStore();
const showModal = ref(false);

const checkoutData = computed(() => {
  const checkoutData = localStorage.getItem("checkout");
  return checkoutData ? JSON.parse(checkoutData) : null;
});

const cart = computed(() => (checkoutData.value ? checkoutData.value.cart : []));
const totalPrice = computed(() =>
  checkoutData.value ? checkoutData.value.totalPrice : 0
);

const formattedTotal = computed(() => store.priceFormatter(totalPrice.value));

const formatPrice = (price) => {
  return store.priceFormatter(price);
};

const formattedDiscountPerItem = (product) => {
  const discount = product.mrp - product.price;
  return store.priceFormatter(discount);
};

const discount = computed(() => {
  const cartItems = cart.value;
  const totalDiscount = cartItems.reduce((total, item) => {
    const itemMRP = item.mrp || 0;
    const itemPrice = item.price || 0;
    const itemQuantity = item.quantity || 0;
    return total + (itemMRP - itemPrice) * itemQuantity;
  }, 0);
  return totalDiscount;
});

const formattedDiscount = computed(() => store.priceFormatter(discount.value));

const taxRate = 0.12;
const tax = computed(() => {
  return totalPrice.value * taxRate;
});

const totalIncludingTax = computed(() => {
  return totalPrice.value + tax.value;
});

const formattedTax = computed(() => store.priceFormatter(tax.value));
const formattedTotalIncludingTax = computed(() =>
  store.priceFormatter(totalIncludingTax.value)
);

const formData = reactive({
  emailAddress: "",
  firstName: "",
  lastName: "",
  company: "",
  address: "",
  apartment: "",
  city: "",
  postalCode: "",
  phone: "",
});

const rules = {
  emailAddress: { required, email },
  firstName: { required },
  lastName: { required },
  company: { required },
  address: { required },
  apartment: { required },
  city: { required },
  postalCode: { required },
  phone: { required, numeric, minLength: minLength(10) },
};
const v$ = useVuelidate(rules, formData);

const placeOrder = () => {
  v$.value.$touch();

  if (v$.value.$invalid) {
    return;
  }
  const orderData = {
    cart: cart.value,
    customer: formData,
    savings: formattedDiscount.value,
    subtotal: formattedTotal.value,
    taxes: formattedTax.value,
    total: formattedTotalIncludingTax.value,
  };

  store.placeOrder(orderData);
  showModal.value = true;
};
</script>

<template>
  <div>
    <div class="checkout-main">
      <h2 class="sr-only">Checkout</h2>

      <form class="checkout-form" @submit.prevent="placeOrder">
        <div>
          <div>
            <h2 class="form-heading">Contact information</h2>

            <div class="mt-4">
              <label for="email-address" class="form-label">Email address</label>
              <div class="mt">
                <input
                  type="email"
                  id="email-address"
                  name="email-address"
                  autocomplete="email"
                  class="form-input"
                  v-model="formData.emailAddress"
                  @blur="v$.emailAddress.$touch"
                />
              </div>
              <div class="red" v-if="v$.emailAddress.$error">
                {{ v$.emailAddress.$errors[0].$message }}
              </div>
            </div>
          </div>

          <div class="form-shipping">
            <h2 class="form-heading">Shipping information</h2>

            <div class="shipping-grid">
              <div>
                <label for="first-name" class="form-label">First name</label>
                <div class="mt">
                  <input
                    type="text"
                    id="first-name"
                    name="first-name"
                    autocomplete="given-name"
                    class="form-input"
                    v-model="formData.firstName"
                    @blur="v$.firstName.$touch"
                  />
                </div>
                <div class="red" v-if="v$.firstName.$error">
                  {{ v$.firstName.$errors[0].$message }}
                </div>
              </div>

              <div>
                <label for="last-name" class="form-label">Last name</label>
                <div class="mt">
                  <input
                    type="text"
                    id="last-name"
                    name="last-name"
                    autocomplete="family-name"
                    class="form-input"
                    v-model="formData.lastName"
                    @blur="v$.lastName.$touch"
                  />
                </div>
                <div class="red" v-if="v$.lastName.$error">
                  {{ v$.lastName.$errors[0].$message }}
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="company" class="form-label">Company</label>
                <div class="mt">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    class="form-input"
                    v-model="formData.company"
                    @blur="v$.company.$touch"
                  />
                </div>
                <div class="red" v-if="v$.company.$error">
                  {{ v$.company.$errors[0].$message }}
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="address" class="form-label">Address</label>
                <div class="mt">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    autocomplete="street-address"
                    class="form-input"
                    v-model="formData.address"
                    @blur="v$.address.$touch"
                  />
                </div>
                <div class="red" v-if="v$.address.$error">
                  {{ v$.address.$errors[0].$message }}
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="apartment" class="form-label">Apartment, suite, etc.</label>
                <div class="mt">
                  <input
                    type="text"
                    name="apartment"
                    id="apartment"
                    class="form-input"
                    v-model="formData.apartment"
                    @blur="v$.apartment.$touch"
                  />
                </div>
                <div class="red" v-if="v$.apartment.$error">
                  {{ v$.apartment.$errors[0].$message }}
                </div>
              </div>

              <div>
                <label for="city" class="form-label">City</label>
                <div class="mt">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autocomplete="address-level2"
                    class="form-input"
                    v-model="formData.city"
                    @blur="v$.city.$touch"
                  />
                </div>
                <div class="red" v-if="v$.city.$error">
                  {{ v$.city.$errors[0].$message }}
                </div>
              </div>

              <div>
                <label for="postal-code" class="form-label">Postal code</label>
                <div class="mt">
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autocomplete="postal-code"
                    class="form-input"
                    v-model="formData.postalCode"
                    @blur="v$.postalCode.$touch"
                  />
                </div>
                <div class="red" v-if="v$.postalCode.$error">
                  {{ v$.postalCode.$errors[0].$message }}
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="phone" class="form-label">Phone</label>
                <div class="mt">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    autocomplete="tel"
                    class="form-input"
                    v-model="formData.phone"
                    @blur="v$.phone.$touch"
                  />
                </div>
                <div class="red" v-if="v$.phone.$error">
                  {{ v$.phone.$errors[0].$message }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order summary -->
        <div class="mt-10 lg:mt-0">
          <h2 class="form-heading">Order summary</h2>

          <div class="order-main">
            <h3 class="sr-only">Items in your cart</h3>
            <ul role="list" class="divide-y divide-gray-200">
              <li v-for="(product, index) in cart" :key="index" class="order-summary">
                <div class="flex-shrink-0 max-[240px]:flex max-[240px]:justify-center">
                  <img :src="product.img" alt="" class="w-20 h-28" />
                </div>

                <div class="order-flex">
                  <div class="flex max-[430px]:flex-col">
                    <div class="min-w-0 flex-1">
                      <h4 class="text-sm">
                        <a class="order-title">{{ product.name }}</a>
                      </h4>
                      <p class="order-description">{{ formatPrice(product.price) }}</p>
                      <p class="order-description mrp">
                        {{ formatPrice(product.mrp) }}
                      </p>
                    </div>

                    <div class="order-edit">
                      <button type="button" class="order-edit-btn">
                        <span class="sr-only">Edit</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5"
                          @click="router.push('/cart')"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div class="order-save-qty">
                    <p class="mt-1 !text-orange-400 order-number">
                      Save {{ formattedDiscountPerItem(product) }} ({{
                        product.discount
                      }})
                    </p>

                    <div class="ml-4 max-[430px]:ml-0">
                      <h1 class="order-quantity">Quantity: {{ product.quantity }}</h1>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <dl class="order-total">
              <div class="order-total-flex">
                <dt class="text-sm">Savings</dt>
                <dd class="order-number">{{ formattedDiscount }}</dd>
              </div>
              <div class="order-total-flex">
                <dt class="text-sm">Subtotal</dt>
                <dd class="order-number">{{ formattedTotal }}</dd>
              </div>
              <div class="order-total-flex">
                <dt class="text-sm">Taxes (12%)</dt>
                <dd class="order-number">{{ formattedTax }}</dd>
              </div>
              <div class="order-total-flex border-t border-gray-200 pt-6">
                <dt class="text-base font-medium">Total</dt>
                <dd class="text-base font-medium text-gray-900">
                  {{ formattedTotalIncludingTax }}
                </dd>
              </div>
            </dl>
            <div class="order-div">
              <button type="submit" class="add-cart">Place order</button>
            </div>
            <ModalView v-if="showModal" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
