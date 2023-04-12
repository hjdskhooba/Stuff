let favoriteItems = document.querySelector(".favorites__row");
let cartItems = document.querySelector(".cart__row");

const showFavorites = () => {
  favoritesData.forEach((item) => {
    favoriteItems.innerHTML += `
        <div class="cart-card">${item.title}</div>
        `;
  });
};
const showCartItems = () => {
  cartData.forEach((item) => {
    cartItems.innerHTML += `
        <div class="cart-card">${item.title}</div>
      `;
  });
};
showFavorites();
showCartItems();
