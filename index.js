const addButtons = document.querySelectorAll(".add-button");
const fixedSidebar = document.querySelector(".side-bar");

const section1 = fixedSidebar.querySelector(".calc-menu-section1");
const section2 = fixedSidebar.querySelector(".calc-menu-section2");

const cartContainer = fixedSidebar.querySelector(".orders");
const totalPriceElement = fixedSidebar.querySelector(".total-price");
const cartCountElements = fixedSidebar.querySelectorAll(".cart-count");

let cartTotal = 0;
let totalItems = 0;

addButtons.forEach((button) => {
  const card = button.closest(".card");
  const amountBox = card.querySelector(".amount-of-order");
  const img = card.querySelector(".img");
  const counter = card.querySelector(".counter");
  const decrement = card.querySelector(".decrement");
  const increment = card.querySelector(".increment");

  const price = Number(card.dataset.price);
  const name = card.dataset.name;

  let currentAmount = 0;

  button.addEventListener("click", () => {
    button.classList.add("hidden");
    amountBox.classList.remove("hidden");
    img.classList.add("imgs-border");

    currentAmount++;
    counter.textContent = currentAmount;

    addToCart(name, price);
    updateCartItem(name, currentAmount, price);
  });

  increment.addEventListener("click", () => {
    currentAmount++;
    counter.textContent = currentAmount;
    updateCartItem(name, currentAmount, price);
  });

  decrement.addEventListener("click", () => {
    if (currentAmount > 0) {
      currentAmount--;
      counter.textContent = currentAmount;
      updateCartItem(name, currentAmount, price);

      if (currentAmount === 0) {
        button.classList.remove("hidden");
        amountBox.classList.add("hidden");
        img.classList.remove("imgs-border");
      }
    }
  });
});

function addToCart(name, price) {
  if (!cartContainer.querySelector(`[data-cart-name="${name}"]`)) {
    cartContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="order-item" data-cart-name="${name}">
        <h5>${name}</h5>
        <div class="announce">
          <span class="amount">1X</span>
          <span class="light-pink">@ $${price.toFixed(2)}</span>
          <span class="dark-color font-bold item-total">$${price.toFixed(2)}</span>
        </div>
      </div>
      `,
    );
  }

  section1.classList.add("hidden");
  section2.classList.remove("hidden");
}

function updateCartItem(name, amount, price) {
  const orderItem = cartContainer.querySelector(`[data-cart-name="${name}"]`);

  if (!orderItem) return;

  const amountSpan = orderItem.querySelector(".amount");
  const itemTotal = orderItem.querySelector(".item-total");

  amountSpan.textContent = `${amount}X`;
  itemTotal.textContent = `$${(price * amount).toFixed(2)}`;

  calculateTotal();
}

function calculateTotal() {
  const allItems = cartContainer.querySelectorAll(".order-item");

  cartTotal = 0;
  totalItems = 0;

  allItems.forEach((item) => {
    const amountText = item.querySelector(".amount").textContent;
    const amount = Number(amountText.replace("X", ""));
    const priceText = item.querySelector(".item-total").textContent;
    const itemTotal = Number(priceText.replace("$", ""));

    totalItems += amount;
    cartTotal += itemTotal;

    if (amount === 0) {
      item.remove();
    }
  });

  totalPriceElement.textContent = `$${cartTotal.toFixed(2)}`;

  cartCountElements.forEach((el) => {
    el.textContent = `(${totalItems})`;
  });

  if (totalItems === 0) {
    section1.classList.remove("hidden");
    section2.classList.add("hidden");
  }
}

// ======================================================

// const fixedSidbar = document.querySelector(".side-bar");
// const sidebarTop = fixedSidbar.offsetTop;
// const addButtons = document.querySelectorAll(".add-button");

// //=====================================================
// //                sidebar section
// // ====================================================
// window.addEventListener("scroll", () => {
//   fixedSidbar.classList.toggle("fixed", window.scrollY >= sidebarTop);
// });
// // ====================================================
// //                 order section
// // ===================================================
// addButtons.forEach((button) => {
//   const card = button.closest(".card");
//   const amount = card.querySelector(".amount-of-order");
//   const img = card.querySelector(".img");
//   const counter = card.querySelector(".counter");
//   const decrement = card.querySelector(".decrement");
//   const increment = card.querySelector(".increment");
//   const foodCost = card.querySelector(".food-cost");
//   const calcMenuSection1 = fixedSidbar.querySelector(".calc-menu-section1");
//   const calcMenuSection2 = fixedSidbar.querySelector(".calc-menu-section2");
//   let currentAmount = 0;
//   let currentcost = Number(foodCost.textContent);
//   button.addEventListener("click", function () {
//     button.classList.add("hidden");
//     amount.classList.remove("hidden");
//     img.classList.add("imgs-border");

//     calcMenuSection1.classList.add("hidden");
//     calcMenuSection2.classList.remove("hidden");

//     currentAmount++;
//     counter.textContent = currentAmount;
//     button.insertAdjacentHTML(
//       "afterend",
//       `   <div class="calc-menu-section2 hidden">
//           <h1>Your Cart <span>(${currentAmount})</span></h1>
//           <div class="orders">
//             <h5>Waffle with Berries</h5>
//             <div class="announce">
//               <div class="food-info">
//                 <span class="amount red-color font-bold">1X</span>
//                 <span class="light-pink">@ $6.50</span>
//                 <span class="dark-color font-bold food-cost">$6.50</span>
//               </div>
//               <div class="button">
//                 <img src="./assets/images/icon-remove-item.svg" alt="" />
//               </div>
//             </div>
//             <div class="total">
//               <p>Order Total</p>
//               <p class="font-bold">$16.50</p>
//             </div>
//             <div class="carbon-neutral">
//               <img src="./assets/images/icon-carbon-neutral.svg" alt="" />
//               <p>This is a <span>carbon-neutral</span> delivery</p>
//             </div>
//             <button class="confirm-btn">Confirm Order</button>
//           </div>
//         </div>`,
//     );
//   });
//   increment.addEventListener("click", function () {
//     currentAmount++;
//     currentcost + currentAmount;
//     counter.textContent = currentAmount;
//     foodCost.textContent = currentcost;
//   });
//   decrement.addEventListener("click", function () {
//     if (currentAmount > 0) {
//       currentAmount--;
//       currentcost - currentAmount;
//       counter.textContent = currentAmount;
//       foodCost.textContent = currentcost;
//     }
//   });
// });
