let cartItems = document.querySelector(".cart__row");

const showCartItems = () => {
    cartData.forEach((item) => {
      cartItems.innerHTML += `
          <div class="cart-card">${item.title}</div>
        `;
    });
  };

showCartItems();
