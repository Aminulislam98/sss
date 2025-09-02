function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

      if (!this.cartItems) {
        this.cartItems = [
          {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1',
          },
          {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2',
          },
        ];
      }
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
      let matchingitem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingitem = cartItem;
        }
      });

      if (matchingitem) {
        matchingitem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: '1',
        });
      }
      this.saveToStorage();
    },

    removeFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;
      this.saveToStorage();
    },

    calculateCartQuantity() {
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      return cartQuantity;
    },
    updateQuantity(productId, newQuantity) {
      let matchingitem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingitem = cartItem;
        }
      });
      matchingitem.quantity = newQuantity;
      this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingitem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingitem = cartItem;
        }
      });
      if (!matchingitem) {
        return;
      }
      if (!validDeliveryOption(deliveryOptionId)) {
        return;
      }
      matchingitem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage(); //
    },
    //TODO:
    updateCartQuantity(updateCartQuantity) {
      const cartQuantity = updateCartQuantity();

      document.querySelector(
        '.js-return-to-home-link'
      ).innerHTML = `${cartQuantity} items`;
      return updateCartQuantity;
    },
  };
  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
