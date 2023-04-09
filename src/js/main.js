let trendingItems = document.querySelector(".trending__items");
let underHundred = document.querySelector(".trending__items.underHundred");

const appendTrendingItems = () => {
    fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((res) => {
        trendingItems.innerHTML = "";
        res.forEach((card) => {
        trendingItems.innerHTML += `
        <div class="card">
        <a href="./src/pages/product.html">    
        <div class='card-img_block'>
        <img class="card-img"
        src="${card.image[0]}"
        height="110px" alt="">
        </a>
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
const getUnderHundredItems = () => {
  fetch("http://localhost:3000/products?price_lte=100")
    .then((res) => res.json())
    .then((res) => {
        underHundred.innerHTML = "";
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
