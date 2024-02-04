const img = document.querySelector(`[data-img="0"]`);
const closeBtn = document.querySelector(".close");
const modal = document.querySelector(".modal");

img.addEventListener("click", function () {
  modal.classList.add("modal--active");
});

closeBtn.addEventListener("click", function () {
  modal.classList.remove("modal--active");
});
