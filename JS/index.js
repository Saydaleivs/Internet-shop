import { items } from "./database.js"

let chosenItem
const totalPrice = document.querySelector(".total-price")
const itemCounter = document.querySelector(".item-counter")

let cart = []
function showAvailableItems(items) {
  console.log(21312)
  let wrapperDiv
  let item
  for (item of items) {
    wrapperDiv = document.querySelector(".items-row")
    let singleItem = `
    <div class="item" id="_${item.id}">
      <div class="item-showcontent">
        <div class="green-btn">
          <h4>ПОПУЛЯРНОЕ</h4>
        </div>
      </div>
      <div class="align-to-center">
        <img class="item-showcontent-img" src="${item.image}" alt="">
      </div>

      <div class="item-textcontent">
        <div class="item-amount">
          <img src="./Images/tide-box.svg" alt="">
          <h6 class="amount-ml-text">${item.amount}</h6>
        </div>

        <h2 class="item-description"> <span class="bold-text">ARIEL</span> ${item.description}</h2>

        <h3 class="item-description-titles">Штрихкод: <span
          class="item-code item-description-values">${item.code}</span></h3>
        <h3 class="item-description-titles">Производитель: <span
          class="item-code item-description-values">${item.manufacturer}</span></h3>
        <h3 class="item-description-titles">Бренд: <span
          class="item-code item-description-values">${item.brand}</span></h3>

        <div class="price-add-to-cart-btn padding-remover">
          <h2 class="item-price"><span class="price">${item.price}</span> ₸</h2>
          <div class="add-to-cart-btn" id="_${item.id}">
          <h2>В КОРЗИНУ</h2>
          <img src="./Images/small-white-cart-icon.svg" alt="">
        </div>
        </div>
      </div>
    </div>
    `
    wrapperDiv.innerHTML += singleItem
  }

  function addToCart(e) {
    const itemId = e.currentTarget.parentNode.parentNode.parentNode.id
    const itemIdAsNumber = +itemId.replaceAll("_", "") - 1

    // Changes the class of cart Button and then push items to localStorage
    if (e.currentTarget.className != "check-cart-btn") {
      cart.push(items[itemIdAsNumber])
      localStorage.setItem("cart", JSON.stringify(cart))
      e.currentTarget.className = "check-cart-btn"
      e.currentTarget.querySelector("h2").textContent = "Check the Cart"
    }
    chosenItem = JSON.parse(localStorage.getItem("cart"))

    // Move to cart in second click
    document.querySelectorAll(".check-cart-btn").forEach((btn) => {
      btn.addEventListener("click", () => (window.location = "cart.html"))
    })

    // Increase Price and count of cart length in every click
    function increasingNumbers() {
      itemCounter.textContent = chosenItem.length
      totalPrice.textContent = item.price * chosenItem.length + " ₸"
    }
    increasingNumbers()
  }

  let btns = document.querySelectorAll(".add-to-cart-btn")
  btns.forEach((btn) => btn.addEventListener("click", addToCart))

  // Display price, cart length, button added class after refreashing page
  function restoreData() {
    let chosenData = JSON.parse(localStorage.getItem("cart"))
    let total = 0
    for (let item of chosenData) {
      let btnId = item.id - 1
      btns[btnId].className = "check-cart-btn"
      itemCounter.textContent = chosenData.length
      const fixedPrice = item.price * chosenData.length
      totalPrice.textContent = fixedPrice.toFixed(2)
    }
  }
  restoreData()
}

window.addEventListener("DOMContentLoaded", showAvailableItems(items))

// cartBtns.forEach((btn) => btn.addEventListener('click', addToCart))

// function addToCart(e) {
//   console.log(e);
// }

// const cartBtns = document.querySelectorAll(".add-to-cart-btn"),
//   allItems = document.querySelectorAll(".item"),
//   itemCounter = document.querySelector(".item-counter");

// for (btn of cartBtns) btn.addEventListener("click", chooseCart);
// let arr = [];
// function chooseCart(e) {
//   const cart = e.currentTarget.parentNode.parentNode.parentNode;
//   const cartData = {
//     image: cart.querySelector(".item-showcontent-img").src,
//     description: cart.querySelector(".item-description").textContent,
//     price: cart.querySelector(".price").textContent,
//     amount: cart.querySelector(".amount-ml-text").textContent,
//     count: 1,
//   };
//   arr.push(cartData);

//   let totalPrice = cartData.price * arr.length + " ₸";
//   document.querySelector(".total-price").textContent = totalPrice;
//   itemCounter.textContent = arr.length;
//   localStorage.setItem("goods", JSON.stringify(arr));
// }

// let chosenData;
// function showContent() {
//   chosenData = JSON.parse(localStorage.getItem("goods"));
//   let deleteBtn;
//   let wrapper;
//   let count;
//   for (let data of chosenData) {
//     count = data.count;
//     let elememts = `
//     <div class="single-item">
//         <img class="item-picture" src="${data.image}" alt="">
//          <div class="cart-item-textcontent">
//            <div class="item-amount">${JSON.stringify(data.amount)}</div>
//            <h1 class="cart-item-description">${data.description}</h1>
//          </div>
//         <h1><span class="cart-item-price">${
//           data.price * data.count
//         }</span> ₸</h1>
//          <div class="count-item-wrapper">
//            <button class="plus-minus-symbols">-</button>
//            <h2 class="items-quantity">${data.count}</h2>
//            <button class="plus-minus-symbols">+</button>
//          </div>
//          <div class="delete-btn">
//           <img id="delete-btn-img" src="http://127.0.0.1:5500/Images/trash.svg" alt="">
//          </div>
//     </div>
//     `;
//     wrapper = document.querySelector(".items-container");
//     wrapper.innerHTML += elememts;

//     function deleteItem(e) {
//       let imageSrcToRemove =
//         e.currentTarget.parentNode.querySelector(".item-picture").src;
//       e.currentTarget.parentNode.style.display = "none";

//       const indexOfObject = chosenData.findIndex((object) => {
//         return object.image === imageSrcToRemove;
//       });

//       chosenData.splice(indexOfObject, 1);
//       localStorage.setItem("goods", JSON.stringify(chosenData));
//       itemCounter.textContent = chosenData.length;

//       getSum();
//     }

//     function addRemoveItem(e) {
//       let image = e.target.parentNode.parentNode.querySelector("img").src;
//       const indexOfObject = chosenData.findIndex((object) => {
//         return object.image === image;
//       });

//       if (e.currentTarget.textContent === "+") {
//         chosenData[indexOfObject].count += 1;
//       } else {
//         chosenData[indexOfObject].count -= 1;
//       }
//       if (chosenData[indexOfObject].count === 0) {
//         chosenData[indexOfObject].count = 1;
//       }

//       localStorage.setItem("goods", JSON.stringify(chosenData));
//       getSum();

//       let liveNumbers = JSON.parse(localStorage.getItem("goods"));
//       let multiplication =
//         liveNumbers[indexOfObject].price * liveNumbers[indexOfObject].count;
//       multiplication = multiplication.toFixed(2);
//       e.path[2].querySelector(".cart-item-price").textContent = multiplication;
//       e.target.parentNode.querySelector("h2").textContent =
//         liveNumbers[indexOfObject].count;
//     }
//   }

//   let plusMinusBtns = document.querySelectorAll(".plus-minus-symbols");
//   plusMinusBtns.forEach((btns) =>
//     btns.addEventListener("click", addRemoveItem)
//   );

//   deleteBtn = document.querySelectorAll(".delete-btn");
//   deleteBtn.forEach((btns) => btns.addEventListener("click", deleteItem));

//   let gatheredItems = document.querySelector(".submitBtn-totalPrice-wrapper");

//   function getSum() {
//     allPrices = [];
//     chosenData.forEach((obj) => allPrices.push(obj.price * obj.count));
//     const valueAsNumber = allPrices.map(Number);
//     const sum = valueAsNumber.reduce((acc, val) => {
//       return acc + val;
//     }, 0);

//     gatheredItems.innerHTML = `
//     <a href="order.html">
//       <button class="submit-btn" >Оформить заказ</button>
//     </a>
//       <h1 class="overall-price">${sum.toFixed(2)} ₸</h1> `;
//     document.querySelector(".total-price").textContent = sum.toFixed(2);
//   }

//   getSum();
//   itemCounter.textContent = chosenData.length;
// }
// itemCounter.textContent = JSON.parse(localStorage.getItem("goods")).length;

// function showOrderedContent() {
//   let items = JSON.parse(localStorage.getItem("goods"));
//   let wrapper = document.querySelector(".ordered-items");
//   let price = document.querySelector(".order-price");
//   let item;
//   for (item of items) {
//     let elements = `
//     <div class="single-ordered-item">
//        <div>
//          <img class="ordered-items-picture" src="${item.image}" alt="">
//        </div>
//        <div class="manual-pl">
//           <div class="item-amount">${item.amount}</div>
//           <h1 class="ordered-item-description">${item.description}</h1>
//           <h3><span class="ordered-item-price">${
//             item.price * item.count
//           }</span> ₸</h3>
//           <h5>${item.count} ta Dona</h5>
//        </div>
//     </div>
//     `;

//     let prices = [];
//     items.forEach((obj) => prices.push(obj.price * obj.count));
//     const valueAsNumber = prices.map(Number);
//     const sum = valueAsNumber.reduce((acc, val) => {
//       return acc + val;
//     }, 0);
//     wrapper.innerHTML += elements;
//     price.textContent = sum.toFixed(2);
//     document.querySelector(".total-price").textContent = sum.toFixed(2);
//   }

//   const userName = document.querySelector(".user-name"),
//     userEmail = document.querySelector(".user-email"),
//     userPhone = document.querySelector(".user-phone"),
//     userOrganization = document.querySelector(".user-organization"),
//     userCity = document.querySelector(".user-city"),
//     userAddress = document.querySelector(".user-address"),
//     userMessage = document.querySelector(".user-message");

//   document.querySelector(".order-btn").addEventListener("click", () => {
//     const customer = {
//       userName: userName.value,
//       userEmail: userEmail.value,
//       userPhone: userPhone.value,
//       userCity: userCity.value,
//       userOrganization: userOrganization.value,
//       userAddress: userAddress.value,
//       userMessage: userMessage.value,
//     };
//     console.log(customer);
//   });
// }
