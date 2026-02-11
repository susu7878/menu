const fixedSidbar = document.querySelector(".side-bar");
const sidebarTop = fixedSidbar.offsetTop;
const addButtons = document.querySelectorAll(".add-button");

//=====================================================
//                sidebar section
// ====================================================
window.addEventListener("scroll", () => {
  fixedSidbar.classList.toggle("fixed", window.scrollY >= sidebarTop);
});
// ====================================================
//                 order section
// ===================================================
addButtons.forEach((button) => {
  const card = button.closest(".card");
  const amount = card.querySelector(".amount-of-order");
  const img = card.querySelector(".img");
  const calcMenuSection1 = fixedSidbar.querySelector(".calc-menu-section1");
  const calcMenuSection2 = fixedSidbar.querySelector(".calc-menu-section2");

  button.addEventListener("click", function () {
    button.classList.add("hidden");
    amount.classList.remove("hidden");
    img.classList.add("imgs-border");

    calcMenuSection1.classList.add("hidden");
    calcMenuSection2.classList.remove("hidden");
  });
});
