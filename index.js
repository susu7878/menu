// ======================================================

const fixedSidbar = document.querySelector(".side-bar");
const sidebarTop = fixedSidbar.offsetTop;
const addButtons = document.querySelectorAll(".add-button");
let cartCounter = document.querySelector(".cart-counter");
let totalItems = 0;
const ordersContainer = document.querySelector(".orders");

// ======================================================
//                sidebar section
// ======================================================

window.addEventListener("scroll", () => {
  fixedSidbar.classList.toggle("fixed", window.scrollY >= sidebarTop);
});

// ======================================================
//                 order section
// ======================================================

addButtons.forEach((button) => {
  const card = button.closest(".card");
  const amount = card.querySelector(".amount-of-order");
  const img = card.querySelector(".img");
  const counter = card.querySelector(".counter");
  const decrement = card.querySelector(".decrement");
  const increment = card.querySelector(".increment");

  const name = card.dataset.name;
  const price = Number(card.dataset.price.replace("$", ""));

  const calcMenuSection1 = fixedSidbar.querySelector(".calc-menu-section1");
  const calcMenuSection2 = fixedSidbar.querySelector(".calc-menu-section2");

  let currentAmount = 0;

  // ================== ADD BUTTON ==================
  button.addEventListener("click", function () {
    const existingItem = ordersContainer.querySelector(`[data-name="${name}"]`);

    button.classList.add("hidden");
    amount.classList.remove("hidden");
    img.classList.add("imgs-border");

    calcMenuSection1.classList.add("hidden");
    calcMenuSection2.classList.remove("hidden");

    currentAmount++;
    totalItems++;

    counter.textContent = currentAmount;
    cartCounter.textContent = `(${totalItems})`;

    if (!existingItem) {
      ordersContainer.insertAdjacentHTML(
        "afterbegin",
        `<div class="order-item" data-name="${name}">
          <h5 class="food-name">${name}</h5>
          <div class="announce">
            <div class="food-info">
              <span class="amount red-color font-bold">${currentAmount}X</span>
              <span class="light-pink">@ $${price.toFixed(2)}</span>
              <span class="dark-color font-bold item-total">$${(
                price * currentAmount
              ).toFixed(2)}</span>
            </div>
            <div class="remove-button">
              <img src="./assets/images/icon-remove-item.svg" alt="" />
            </div>
          </div>
        </div>`,
      );
    } else {
      const amountSpan = existingItem.querySelector(".amount");
      const totalSpan = existingItem.querySelector(".item-total");

      amountSpan.textContent = `${currentAmount}X`;
      totalSpan.textContent = `$${(price * currentAmount).toFixed(2)}`;
    }
  });

  // ================== INCREMENT ==================
  increment.addEventListener("click", function () {
    const existingItem = ordersContainer.querySelector(`[data-name="${name}"]`);

    currentAmount++;
    totalItems++;

    counter.textContent = currentAmount;
    cartCounter.textContent = `(${totalItems})`;

    if (existingItem) {
      const amountSpan = existingItem.querySelector(".amount");
      const totalSpan = existingItem.querySelector(".item-total");

      amountSpan.textContent = `${currentAmount}X`;
      totalSpan.textContent = `$${(price * currentAmount).toFixed(2)}`;
    }
  });

  // ================== DECREMENT ==================
  decrement.addEventListener("click", function () {
    if (currentAmount === 0) return;

    const existingItem = ordersContainer.querySelector(`[data-name="${name}"]`);

    currentAmount--;
    totalItems--;

    counter.textContent = currentAmount;
    cartCounter.textContent = `(${totalItems})`;

    if (existingItem) {
      const amountSpan = existingItem.querySelector(".amount");
      const totalSpan = existingItem.querySelector(".item-total");

      if (currentAmount > 0) {
        amountSpan.textContent = `${currentAmount}X`;
        totalSpan.textContent = `$${(price * currentAmount).toFixed(2)}`;
      } else {
        existingItem.remove();
      }
    }

    if (currentAmount === 0) {
      amount.classList.add("hidden");
      button.classList.remove("hidden");
      img.classList.remove("imgs-border");

      // اگر کل سبد خالی شد
      if (totalItems === 0) {
        calcMenuSection2.classList.add("hidden");
        calcMenuSection1.classList.remove("hidden");
      }
    }
  });
});

// ================== REMOVE FROM SIDEBAR ==================

ordersContainer.addEventListener("click", function (e) {
  if (!e.target.closest(".remove-button")) return;

  const orderItem = e.target.closest(".order-item");
  const itemName = orderItem.dataset.name;

  const card = document.querySelector(`[data-name="${itemName}"]`);
  const counter = card.querySelector(".counter");
  const amountBox = card.querySelector(".amount-of-order");
  const button = card.querySelector(".add-button");
  const img = card.querySelector(".img");

  const removedAmount = Number(counter.textContent);

  totalItems -= removedAmount;
  cartCounter.textContent = `(${totalItems})`;

  counter.textContent = 0;
  amountBox.classList.add("hidden");
  button.classList.remove("hidden");
  img.classList.remove("imgs-border");

  orderItem.remove();

  const calcMenuSection1 = fixedSidbar.querySelector(".calc-menu-section1");
  const calcMenuSection2 = fixedSidbar.querySelector(".calc-menu-section2");

  if (totalItems === 0) {
    calcMenuSection2.classList.add("hidden");
    calcMenuSection1.classList.remove("hidden");
  }
});
