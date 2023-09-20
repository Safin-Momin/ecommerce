import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
    state: () => ({
        products: [],
        cart: JSON.parse(localStorage.getItem('cart')) || [],
    }),
    getters: {
        productById: (state) => (id) => {
            return state.products.find((product) => product.id === id);
        },
        cartLength: (state) => {
            return state.cart.length;
        },
        productsInCart: (state) => {
            return state.products.filter((product) =>
                state.cart.some((cartItem) => cartItem.id === product.id)
            );
        },
    },
    actions: {
        addToCart(product) {
            const isProductInCart = this.cart.some((item) => item.id === product.id);

            if (!isProductInCart) {
                product.quantity = 1;
                this.cart.push(product);
            } else {
                const existingProduct = this.cart.find((item) => item.id === product.id);
                existingProduct.quantity++;
            }

            this.updateCartInLocalStorage();
        },
        removeFromCart(product) {
            this.cart = this.cart.filter((item) => item.id !== product.id);
            this.updateCartInLocalStorage()
        },
        fetchProducts() {
            this.products = [
                {
                    id: 1,
                    img: "src/assets/img/refrigerator1.png",
                    name:
                        "Haier 628L Frost Free Inverter Triple Door Convertible Side by Side Refrigerator",
                    price: 89990,
                    mrp: 139999,
                    discount: "36%",
                },
                {
                    id: 2,
                    img: "src/assets/img/refrigerator2.png",
                    name:
                        "LG 674 L Frost-Free Inverter Linear Compressor Wi-Fi Side-By-Side Refrigerator",
                    price: 68990,
                    mrp: 75050,
                    discount: "24%",
                },
                {
                    id: 3,
                    img: "src/assets/img/refrigerator3.1.png",
                    name:
                        "Godrej 564 L Multi Air Flow System, With Advanced Controls Frost Free Side-By-Side Refrigerator",
                    price: 59990,
                    mrp: 95000,
                    discount: "37%",
                },
                {
                    id: 4,
                    img: "src/assets/img/refrigerator4.png",
                    name:
                        "Godrej 670 L Multi Door, Triple Zones with Convertible Mode, Free Inverter Refrigerator",
                    price: 87490,
                    mrp: 120000,
                    discount: "27%",
                },
                {
                    id: 5,
                    img: "src/assets/img/machine1.png",
                    name: "Godrej 6.2 Kg I-Wash Technology Fully-Automatic Top Load Washing Machine",
                    price: 12690,
                    mrp: 19410,
                    discount: "35%",
                },
                {
                    id: 6,
                    img: "src/assets/img/machine2.png",
                    name: "Samsung 7 kg Fully-Automatic Top Loading Imperial Silver Washing Machine",
                    price: 15790,
                    mrp: 21000,
                    discount: "25%",
                },
                {
                    id: 7,
                    img: "src/assets/img/machine3.png",
                    name:
                        "Haier 8 Kg 5 Star Voltex Pulsator Semi-Automatic Top Load Washing Machine (2023 Model)",
                    price: 11690,
                    mrp: 18900,
                    discount: "38%",
                },
                {
                    id: 8,
                    img: "src/assets/img/machine4.png",
                    name:
                        "IFB 7 Kg 5 Star Front Load Washing Machine 2X Power Steam (DIVA AQUA MXS 7010, 2023)",
                    price: 28990,
                    mrp: 37090,
                    discount: "22%",
                },
                {
                    id: 9,
                    img: "src/assets/img/speaker1.png",
                    name:
                        "GOVO GOSURROUND 900 | 200W Soundbar | 2.1 Channel Home Theatre | Deep Bass Subwoofer",
                    price: 6498,
                    mrp: 17999,
                    discount: "64%",
                },
                {
                    id: 10,
                    img: "src/assets/img/speaker2.1.png",
                    name:
                        "Sony HT-S40R Real 5.1ch Dolby Audio Soundbar for TV with Subwoofer & Wireless Rear Speakers",
                    price: 26990,
                    mrp: 34990,
                    discount: "23%",
                },
                {
                    id: 11,
                    img: "src/assets/img/speaker3.png",
                    name:
                        "Philips Audio MMS2625B 32W 2.1 Channel Wireless Bluetooth, Wired Multimedia Speaker",
                    price: 3429,
                    mrp: 5490,
                    discount: "38%",
                },
                {
                    id: 12,
                    img: "src/assets/img/speaker4.png",
                    name:
                        "boAt Aavante Bar 3200D Soundbar with Dolby Audio,350W RMS Signature Sound,5.1 Channel",
                    price: 13999,
                    mrp: 39990,
                    discount: "65%",
                },
            ];
            localStorage.setItem('products', JSON.stringify(this.products));
            const storedProducts = JSON.parse(localStorage.getItem('products'));
            if (storedProducts) {
                this.products = storedProducts;
            }
        },
        updateCartInLocalStorage() {
            const cartData = this.cart.map((item) => ({
                id: item.id,
                quantity: item.quantity,
                img: item.img,
                name: item.name,
                price: item.price,
                mrp: item.mrp,
                discount: item.discount,
            }));
            localStorage.setItem('cart', JSON.stringify(cartData));
        },
        removeAllItems() {
            this.cart = [];
            this.updateCartInLocalStorage();
        },
        initCartFromLocalStorage() {
            const cartData = JSON.parse(localStorage.getItem('cart'));
            if (cartData) {
                this.cart = cartData.map((item) => ({
                    id: item.id,
                    quantity: item.quantity,
                    img: item.img,
                    name: item.name,
                    price: item.price,
                    mrp: item.mrp,
                    discount: item.discount,
                }));
            }
        },
        priceFormatter(value) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'INR'
            });
            return formatter.format(value);
        },
        checkout() {
            const totalPrice = this.cart.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            const checkoutData = {
                cart: this.cart,
                totalPrice: totalPrice,
            };

            localStorage.setItem('checkout', JSON.stringify(checkoutData));
        },
        placeOrder(orderData) {
            localStorage.setItem('order', JSON.stringify(orderData));
        },
    },
    watch: {
        cart: {
            handler(newCart) {
                localStorage.setItem('cart', JSON.stringify(newCart));
            },
            deep: true,
        },
    },
});
