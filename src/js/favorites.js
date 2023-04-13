let favoriteItems = document.querySelector(".favorites__row");

const showFavorites = () => {
  favoritesData.forEach((item) => {
    favoriteItems.innerHTML += `
        <div class="cart-card">${item.title}</div>
        `;
  });
};

showFavorites();
