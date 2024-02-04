const getElement = function (ele) {
  const element = document.querySelector(ele);

  if (element) {
    return element;
  } else {
    throw new Error(
      `Something went wrong! Please check your selector "${ele}"`
    );
  }
};

class Gallery {
  constructor(element) {
    this.container = element;
    this.list = [...this.container.querySelectorAll(".section__img")];

    this.modalWindow = getElement(".modal");
    this.modalImg = getElement(".modal__main-img");
    this.restImgs = getElement(".rest");
    this.closeBtn = getElement(".close");
    this.leftBtn = getElement(".left");
    this.rightBtn = getElement(".right");

    this.closeModal = this.closeModal.bind(this);
    this.prevImg = this.prevImg.bind(this);
    this.nextImg = this.nextImg.bind(this);
    this.chooseImg = this.chooseImg.bind(this);

    this.container.addEventListener(
      "click",
      function (e) {
        if (!e.target.classList.contains("section__img")) return;
        this.openModal(e.target, this.list);
      }.bind(this)
    );

    this.closeBtn.addEventListener("click", this.closeModal);
    this.leftBtn.addEventListener("click", this.prevImg);
    this.rightBtn.addEventListener("click", this.nextImg);
    this.restImgs.addEventListener("click", this.chooseImg);
  }

  openModal(target, arrayImg) {
    this.modalWindow.classList.add("modal--active");
    this.setImgToMain(target);

    this.restImgs.innerHTML = arrayImg
      .map((item) => {
        return `<img src="${item.src}" title="${item.title}" alt="${item.alt}"
      data-image=${item.dataset.img}
       class="${
         target.dataset.img === item.dataset.img
           ? "rest__img selected"
           : "rest__img"
       }" />
      `;
      })
      .join("");
  }

  setImgToMain(item) {
    this.modalImg.src = item.src;
  }

  closeModal() {
    this.modalWindow.classList.remove("modal--active");
  }

  prevImg() {
    const selected = this.restImgs.querySelector(".selected");

    const prev =
      selected.previousElementSibling || this.restImgs.lastElementChild;

    selected.classList.remove("selected");
    prev.classList.add("selected");
    this.setImgToMain(prev);
  }

  nextImg() {
    const selected = this.restImgs.querySelector(".selected");

    const next = selected.nextElementSibling || this.restImgs.firstElementChild;

    selected.classList.remove("selected");
    next.classList.add("selected");
    this.setImgToMain(next);
  }

  chooseImg(e) {
    const selected = this.restImgs.querySelector(".selected");
    if (!e.target.classList.contains("rest__img")) return;
    selected.classList.remove("selected");
    e.target.classList.add("selected");
    this.setImgToMain(e.target);
  }
}

const car = new Gallery(getElement(".car"));
const space = new Gallery(getElement(".space"));
const mountain = new Gallery(getElement(".mountain"));
