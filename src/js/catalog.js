let paginationBtns = document.querySelector(".pagination_btns");
let catalog = document.querySelector(".trending__items.catalog");
let page = 1;

const getProductsCount = (cardsOnScreen = 5) => {
  paginationBtns.innerHTML = "";
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((res) => {
      let arr = [];
      let el = [...catalog.querySelectorAll(".card")];
      for (let i = 1; i <= Math.ceil(res.length / 5); i++) {
        paginationBtns.innerHTML += `<button class="btn">${i}</button>`;
      }
      let btns = paginationBtns.querySelectorAll(".btn");
      for (let i = 0; i < el.length; i += 5) {
        arr.push(el.slice(i, i + cardsOnScreen));
      }
      btns.forEach((btn) => {
        btn.addEventListener("click", () => {
          arr[btn.innerHTML - 1].map((item) => item.scrollIntoView());
        });
      });
    });
};
getProductsCount();
