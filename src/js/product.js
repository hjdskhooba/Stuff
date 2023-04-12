let row = document.querySelector(".product__body.df");
let id = new URL(document.location).searchParams.get("id");
const fac = new FastAverageColor();
let tumbler = false;
let hex = "#000000";
let addToCartBtn;
let addToHeartBtn;

const getProductCard = () => {
  fetch(`http://localhost:3000/products?id=${id}`)
    .then((res) => res.json())
    .then((res) => {
      res.forEach((card) => {
        row.innerHTML = `
                <div class="product__img df">
                    <div class="product__img-back"><img src="${
                      card.image[0]
                    }" class="product__img-img"
                            alt="" height="380px"></div>
                    <div class="product__img__row">
                        <div class="img-back"><img src="${
                          card.image[0]
                        }" class="product__img-littleOne"
                                alt="" height="91.26px"></div>
                        <div class="img-back"><img src="${
                          card.image[1]
                        }" class="product__img-littleOne"
                                alt="" height="91.26px"></div>
                        <div class="img-back"><img src="${
                          card.image[2]
                        }" class="product__img-littleOne"
                                alt="" height="91.26px"></div>
                        <div class="img-back"><img src="${
                          card.image[3]
                        }" class="product__img-littleOne"
                                alt="" height="91.26px"></div>
                    </div>
                </div>
                <div class="product__info">
                    <div class="product__info_info">
                        <h3 class="product__info_info-title">${card.title}</h3>
                        <h3 class="product__info_info-price">${card.price}$</h3>
                        <div class="product_color">
                            <p class="gray">color:</p>
                            <p class="bright">rgb(${hex})</p>
                            <span class='color' style="background: rgb(${hex})"></span>
                        </div>
                        <div class="product_sizes">
                            <p class="gray">rating</p>
                            <div class="bright">
                                <span class="size">${
                                  card.rating.rate + " "
                                }<s class='yellow'>&starf;</s></span>
                                <span class="size">${
                                  card.rating.count
                                } votes</span>
                            </div>
                        </div>
                        <p class="product_description">
                            ${card.description}
                        </p>
                        <button class="add-to-cart btn">Add to cart</button>
                        <button class="add-to-favorites btn">Add to favorites</button>
                    </div>
                    <div class="product__info_links">
                        <p class="product__links link1">${
                          card.rating.count + 218
                        } people purchased</p>
                        <p class="product__links link2">Find in a store</p>
                    </div>
                </div>
            `;
        addToCartBtn = document.querySelector(".add-to-cart.btn");
        addToHeartBtn = document.querySelector(".add-to-favorites.btn");
        addToCartBtn.addEventListener("click", () => {
          cartData.push(card);
          setLocalStorage();
        });
        addToHeartBtn.addEventListener("click", () => {
          favoritesData.push(card);
          setLocalStorage();
        });
        fac.getColorAsync(card.image[0]).then((color) => {
          hex = color.rgb;
          let nums = parseInt(hex.replace(/[^\d]/g, "")) + 30;
          hex = nums.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
          if (!tumbler) {
            getProductCard();
            tumbler = true;
          }
        });
      });
    });
};
getProductCard();