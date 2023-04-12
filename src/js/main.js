let trendingItems = document.querySelector(".trending__items");
let underHundred = document.querySelector(".trending__items.underHundred");
let form = document.querySelector(".header__input");
let searchText = "";
let id = [1];
let favoritesData = [];
let cartData = [];

if(window.location.pathname.includes("favorites") == false && window.location.pathname.includes("cart") == false){
  form.addEventListener("submit", (e) => {
      e.preventDefault()
      searchText = e.target[0].value
  })
}

if(localStorage.getItem("favorItem") !== null){
  favoritesData = JSON.parse(localStorage.getItem("favorItem"))
}
if(localStorage.getItem("cartItem") !== null){
  cartData = JSON.parse(localStorage.getItem("cartItem"))
}

const setLocalStorage = () => {
  localStorage.setItem("favorItem", JSON.stringify(favoritesData))
  localStorage.setItem("cartItem", JSON.stringify(cartData))
}

const appendTrendingItems = () => {
  trendingItems.innerHTML = ""
  fetch("http://localhost:3000/products")
  .then((res) => res.json())
  .then((res) => {
      res.forEach((card) => {
        trendingItems.innerHTML += `
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
                  <small class="people">${
                    card.rating.count + " votes"
                  }</small>
                  </div>
                </div>
            </div>
        </div>
        `;
        let cardHTML = document.querySelectorAll(".card-img_block");
        Array.from(cardHTML).forEach((el) => {
          el.addEventListener("mouseup", () => {
            id.unshift(Number(el.dataset.id));
            id.pop();
            appendTrendingItems();
            window.location.href = `./src/pages/product.html?id=${id}`;
          });
        });
      });
    });
};
const getUnderHundredItems = () => {
  underHundred.innerHTML = "";
  fetch("http://localhost:3000/products?price_lte=100")
    .then((res) => res.json())
    .then((res) => {
      res.forEach((card) => {
        underHundred.innerHTML += `
            <div class="card">
                <div class='card-img_block'>
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
                        <small class="people">${
                          card.rating.count + " votes"
                        }</small>
                        </div>
                    </div>
                </div>
            </div>
            `;
      });
    });
};

appendTrendingItems();
getUnderHundredItems();