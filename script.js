const orders = new Map();

//-----------------------------------------------------------------------------------------------------------

// 1. Do modal first (animation,click handling,close and open modal)
const bill = document.querySelector(".bill");
const closeModalButton = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const openList = document.querySelector(".open-list");
const closeModalBtn = document.querySelector(".close-modal");
const openModal = function () {
  bill.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeModal = function () {
  bill.classList.add("hidden");
  overlay.classList.add("hidden");
};

openList.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !bill.classList.contains("hidden")) {
    closeModal();
  }
});

//-----------------------------------------------------------------------------------------------------------

// 2. opens quantity when 1 of the card is clicked
const quantityPart = document.querySelector(".quantity-part");
const subQuantity = document.querySelector(".subt");
const addQuantity = document.querySelector(".add");
const orderQuantity = document.querySelector(".order-quantity-type");
const orderName = document.querySelector(".order-name");
const orderQuantityTxt = document.querySelector(".order-quantity-txt");
const orderPriceTxt = document.querySelector(".order-price");
const itemsQty = document.querySelector(".items-quantity");
const priceTxt = Number(orderPriceTxt.textContent);
const quantity = Number(orderQuantity.value);
let temp = quantity;
let temp2 = 0;

//quantity up down button
subQuantity.addEventListener("click", function () {
  if (temp > 1) {
    temp--;
    orderQuantity.value = temp;
    // update for quantity text
    orderQuantityTxt.textContent = `X${temp}`;
    // update for price text
    orderPriceTxt.textContent = temp2 * temp;
  }
});
addQuantity.addEventListener("click", function () {
  if (temp < 20) {
    temp = temp + quantity;
    orderQuantity.value = temp;
    // update for quantity text
    orderQuantityTxt.textContent = `X${temp}`;
    // update for price text
    orderPriceTxt.textContent = temp2 * temp;
  }
});

// Dessert Cards------------------------------------------------------------------------------
const lavaCake = document.querySelector("#lavaCake ");
const tiramisu = document.querySelector("#tiramisu");
const cheeseCake = document.querySelector("#cheeseCake");
const pie = document.querySelector("#pie");
const mashedPotato = document.querySelector("#mashedPotato");
const salad1 = document.querySelector("#salad1");
const garlicBread = document.querySelector("#garlicBread");
const salad2 = document.querySelector("#salad2");
const addCartButton = document.querySelector(".add-button");
const dessertBtns = function () {
  quantityPart.classList.remove("hidden");
  addCartButton.classList.remove("hidden");
  orderQuantityTxt.textContent = `X${temp}`;
  orderQuantity.value = 1;
  orderQuantityTxt.textContent = `X1`;
  orderPriceTxt.textContent = temp2;
};
lavaCake.addEventListener("click", function () {
  orderName.textContent = `Lava Cake`;
  temp2 = 200;
  dessertBtns();
});
tiramisu.addEventListener("click", function () {
  orderName.textContent = `Tiramisu`;
  temp2 = 300;
  dessertBtns();
});
cheeseCake.addEventListener("click", function () {
  orderName.textContent = `Cheese Cake`;
  temp2 = 100;
  dessertBtns();
});
pie.addEventListener("click", function () {
  orderName.textContent = `Apple Pie`;
  temp2 = 400;
  dessertBtns();
});

mashedPotato.addEventListener("click", function () {
  orderName.textContent = `Mashed Potato`;
  temp2 = 50;
  dessertBtns();
});
salad1.addEventListener("click", function () {
  orderName.textContent = `Caesar Salad`;
  temp2 = 100;
  dessertBtns();
});
garlicBread.addEventListener("click", function () {
  orderName.textContent = `Garlic Bread`;
  temp2 = 20;
  dessertBtns();
});
salad2.addEventListener("click", function () {
  orderName.textContent = `Tomato Salad`;
  temp2 = 150;
  dessertBtns();
});

//-----------------------------------------------------------------------------------------------------------

// 3. when clicked combined with the quantity, when the add to order is clicked it will add to the food and quantity list
const orderListTxt = document.querySelector(".order-list");
const totalTxt = document.querySelector(".total");

// every click on add to cart adds the new order on the orders map
addCartButton.addEventListener("click", function () {
  const quantityTxt = Number(orderQuantityTxt.textContent.slice(1));
  orders.set(
    orderPriceTxt.textContent,
    `${quantityTxt}_${orderName.textContent}`
  );
  itemsQty.textContent = orders.size;
});

// view list of orders
openList.addEventListener("click", function () {
  let orderListTxts = "";
  let total = 0;
  for (const [price, name] of orders) {
    const [num, description] = name.split("_");
    orderListTxts += `${num} ${description} for ₱${price}<br>`;
    total += Number(price);
  }
  //   TIPS use innerHTML to make the <br> work
  orderListTxt.innerHTML = orderListTxts;
  totalTxt.textContent = total;
});

//-----------------------------------------------------------------------------------------------------------
//4. the item in the array and when cancel order, it will reset all the necessary values and text content
const cancelOrderBtn = document.querySelector(".cancel-button");
cancelOrderBtn.addEventListener("click", function () {
  orderPriceTxt.textContent = 0.0;
  orderQuantity.value = 1;
  orderQuantityTxt.textContent = `X1`;
  orderName.textContent = "...";
  quantityPart.classList.add("hidden");
  addCartButton.classList.add("hidden");

  itemsQty.textContent = 0;
  orders.clear();
});
