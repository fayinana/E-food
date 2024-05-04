const categoryDisplayBtn = document.querySelector(".option-display");
const categoryLists = document.querySelectorAll(".category-list");
const categoryListsBtn = document.querySelector(".category-lists");
const slider = document.querySelector(".slider");
const leftSlide = document.querySelector(".left-slide");
const rightSlide = document.querySelector(".right-slide");
const dateElm = document.querySelector(".date");

const date = new Date();

dateElm.innerHTML = date.getFullYear();

const navLists = document.querySelectorAll(".list a");
navLists.forEach((navList) => {
  navList.addEventListener("click", (e) => {
    e.preventDefault();
    navLists.forEach((nav) => {
      nav.parentElement.classList.remove("active");
    });
    const id = e.currentTarget.getAttribute("href");
    const element = document.querySelector(id);
    navList.parentElement.classList.add("active");
    // console.log(navList);
    let position = element.offsetTop;
    window.scrollTo({
      left: 0,
      top: position - 70,
    });
  });
});

let category;
returnCategory(category);

categoryDisplayBtn.addEventListener("click", () => {
  categoryListsBtn.classList.toggle("disable");
});
categoryLists.forEach((categoryLis) => {
  categoryLis.addEventListener("click", () => {
    categoryLists.forEach((catLis) => {
      catLis.classList.remove("active");
    });
    categoryLis.classList.add("active");
    category = categoryLis.dataset.typeid;
    returnCategory(category);
  });
});

function returnCategory(category = "1") {
  let categoryList = foods.filter((element) => {
    slider.innerHTML = "";
    return element.category === category;
  });
  spanLength = Math.ceil(categoryList.length / 5);
  createSlider(categoryList, spanLength);
}

function createSlider(categoryList, spanLength) {
  for (let index = 0; index < spanLength; index++) {
    const spanElem = document.createElement("span");
    spanElem.dataset.idx = index;
    slider.appendChild(spanElem);
  }
  var index = 0;
  rightSlide.addEventListener("click", () => {
    index++;
    if (index >= spanLength) {
      index = spanLength - 1;
    }
    leftSlide.classList.remove("active");
    rightSlide.classList.add("active");
    slidingFunctionality(categoryList, slider, index);
  });
  leftSlide.addEventListener("click", () => {
    index--;
    if (index <= 0) {
      index = 0;
    }
    rightSlide.classList.remove("active");
    leftSlide.classList.add("active");

    slidingFunctionality(categoryList, slider, index);
  });

  slider.addEventListener("click", () => {
    const sliderSpan = slider.querySelectorAll(".slider span");
    sliderSpan.forEach((span) => {
      span.addEventListener("click", () => {
        index = span.dataset.idx;
        slidingFunctionality(categoryList, slider, index);
      });
    });
  });
  slidingFunctionality(categoryList, slider, index);
}

// this have to be changed
function slidingFunctionality(categoryList, slide, idx = 0) {
  const targetSpanElem = slide.querySelectorAll("span");
  targetSpanElem.forEach((element) => {
    if (element.dataset.idx == idx) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
    len = categoryList.length;
    start = idx * 5;
    end = start + 5;
    if (end > len) {
      end = len;
    }
    returnHtml(categoryList, start, end);
  });
}

function returnHtml(categoryList, start, end) {
  let innerText = "";
  const foodsList = document.querySelector(".food-lists");
  for (let index = start; index < end; index++) {
    innerText += `
        <div class="food-list">
        <img src="${categoryList[index].imgPath}" alt="">
                <div class="info-product">
                <span class="name">${categoryList[index].title}</span>
                <span class="price">${categoryList[index].price}$</span>
                </div>
                <button class="add-to-cart sign-up">add to cart</button>
                </div>
                `;
  }
  foodsList.innerHTML = innerText;
}
