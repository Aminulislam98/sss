import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutheader } from './checkout/CheckoutHeader.js';
import { cart } from '../data/cart-class.js';

//import '../data/cart-class.js';
//import '../data/car.js';
//import '../data/backend-practice.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';

async function loadPage() {
  try {
    await loadProductsFetch();
    await new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }

  renderCheckoutheader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then(() => {
  renderCheckoutheader();
  renderOrderSummary();
  renderPaymentSummary();
});*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
})
  .then(() => {
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderCheckoutheader();
    renderOrderSummary();
    renderPaymentSummary();
  });
*/
/*loadProducts(() => {
  renderCheckoutheader();
  renderOrderSummary();
  renderPaymentSummary();
});*/
