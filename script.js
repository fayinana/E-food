const categoryDisplayBtn = document.querySelector(".option-display");
const categoryLists = document.querySelector(".category-lists");

categoryDisplayBtn.addEventListener("click", () => {
  // categoryLists.style.display = 'flex'
  categoryLists.classList.toggle("disable");
});

categoryList = foods.filter((element) => {
  return element.type === "burger";
});
let innerText = "";
const foodsList = document.querySelector(".food-lists");
categoryList.forEach((element) => {
  innerText += `
        <div class="food-list">
                <img src="${element.imgPath}" alt="">
                <div class="info-product">
                    <span class="name">${element.name}</span>
                    <span class="price">${element.price}$</span>
                </div>
                <button class="add-to-cart sign-up">add to cart</button>
            </div>
           `;
});
foodsList.innerHTML = innerText;
