let paginationBtns = document.querySelector(".pagination_btns");
let page = 1;

const getProductsCount = () => {
  paginationBtns.innerHTML = "";
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((res) => {
      for (let i = 1; i <= Math.ceil(res.length / 5); i++) {
        paginationBtns.innerHTML += `<button class="btn">${i}</button>`;
      }
    });
};
getProductsCount();
