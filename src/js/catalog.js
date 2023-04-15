let paginationBtns = document.querySelector(".pagination_btns");
let catalog = document.querySelector(".catalog");
let catalogTitle = document.querySelector(".catalog-title");
let catalogSearch = document.querySelector(".catalog_search-input");
let page = 1;
let category = location.href
  .split("=")[1]
  .replace(/%27/, "'")
  .replace(/%20/, " ");

const getProductsCount = () => {
  paginationBtns.innerHTML = "";
  fetch(
    `http://localhost:3000/products?${
      category !== "all" ? "category=" + category : ""
    }`
  )
    .then((res) => res.json())
    .then((res) => {
      for (let i = 1; i <= Math.ceil(res.length / 5); i++) {
        paginationBtns.innerHTML += `<button class="btn">${i}</button>`;
      }
      let btns = paginationBtns.querySelectorAll(".btn");
      getCards(
        catalog,
        `_page=${page}&${
          category !== "all" ? "category=" + category : ""
        }&_limit=5`
      );
      btns.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (page !== btn.innerHTML) {
            page = btn.innerHTML;
            getCards(
              catalog,
              `_page=${page}&${
                category !== "all" ? "category=" + category : ""
              }&_limit=5`
            );
          } else {
            console.log("Almost done");
          }
        });
      });
      catalogTitle.innerHTML = "All products";
    });
};

function debounce(func, timeout = 600) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
const processChange = debounce(() => {
  getCards(catalog, `_page=${page}&${category !== "all" ? "category=" + category : ""}&_limit=5&title_like=${String(catalogSearch.value)}`);
  // getProductsCount()
  // Проблема в том что внутри функции getProductsCount происходит повторный вызов функции getCards.
});

catalogSearch.addEventListener("input", () => {
  processChange();
});

getProductsCount();
