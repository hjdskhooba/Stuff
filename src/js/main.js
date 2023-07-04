let trendingItems = document.querySelector(".trending__items");
let underHundred = document.querySelector(".trending__items.underHundred");
let form = document.querySelector(".header__input");
let favoritesData = [];
let cartData = [];
let searchText = "";
let cardHTML;
let id = [1];

if (
  window.location.pathname.includes("favorites") == false &&
  window.location.pathname.includes("cart") == false
) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchText = e.target[0].value;
  });
}

if (localStorage.getItem("favorItem") !== null) {
  favoritesData = JSON.parse(localStorage.getItem("favorItem"));
}
if (localStorage.getItem("cartItem") !== null) {
  cartData = JSON.parse(localStorage.getItem("cartItem"));
}

const setLocalStorage = () => {
  localStorage.setItem("favorItem", JSON.stringify(favoritesData));
  localStorage.setItem("cartItem", JSON.stringify(cartData));
};

const getCards = (element, filter) => {
  element.innerHTML = "";
  fetch(`https://stuff-shop-server.onrender.com/products?${filter}`)
    .then((res) => res.json())
    .then((res) => {
      res.forEach((card) => {
        element.innerHTML += `
        <div class="card">
        <div class='card-img_block' data-id="${card.id}">
        <img class="card-img"
        src="${card.image[0]}"
        height="110px" alt="">
        
        </div>
          <div class="card_info">
          <div class="card_info-top">
          <h3 class="card-title">${card.title}</h3>
              <p class="card-category">${card.category}</p>
          </div>
          <div class="card_info_bottom">
              <div class="df">
                  <span class="price">${card.price}$</span>
                  <small class="old-price">${Math.floor(
                    (card.price / 100) * 121
                  )}$</small>
                  </div>
                  <div class='df'>
                  <small class="people">${
                    card.rating.rate + " &#11088;"
                  }</small>
                  <small class="people">${card.rating.count + " votes"}</small>
                  </div>
                </div>
            </div>
            </div>
        `;
        cardHTML = document.querySelectorAll(".card-img_block");
        openProduct(cardHTML);
      });
    });
};

const openProduct = (cardHTML) => {
  Array.from(cardHTML).forEach((el) => {
    el.addEventListener("mouseup", () => {
      id.unshift(Number(el.dataset.id));
      id.pop();
      switch (window.location.pathname) {
        case "/index.html":
          window.location.href = `/src/pages/product.html?id=${id}`;
        case "/src/pages/catalog.html":
          window.localStorage.href = `/src/pages/product.html?id=${id}`;
        default:
          window.location.href = `/src/pages/product.html?id=${id}`;
      }
    });
  });
};

const getTrendingCards = getCards(trendingItems, "_sort=rating.rate&_order=desc&_limit=5");
const getCheapProducts = getCards(underHundred, "_limit=5&price_lte=100&_sort=price&_order=desc");
getTrendingCards;
getCheapProducts;