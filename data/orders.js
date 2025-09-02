export const orders = JSON.parse(localStorage.getItem('orders')) || [];
export function addOrder(order) {
  orders.unshift(order);
  saveLocalStorage();
}

function saveLocalStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}
