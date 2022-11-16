let chosenItem
let itemCounter = document.querySelector(".item-counter")
console.log(123)
function showChosenItems() {
  chosenItem = JSON.parse(localStorage.getItem("cart"))

  for (let item of chosenItem) {
    let elememts = `
    <div class="single-item" id="_${item.id}">
        <img class="item-picture" src="${item.image}" alt="">
        <div class="cart-item-textcontent">
        <div class="item-amount">${JSON.stringify(item.amount)}</div>
        <h1 class="cart-item-description">${item.description}</h1>
        </div>
        <h1><span class="cart-item-price">${item.price * item.count} 
        </span> ₸</h1>
      <div class="count-item-wrapper">
        <button class="plus-minus-symbols">-</button>
        <h2 class="items-quantity">${item.count}</h2>
        <button class="plus-minus-symbols">+</button>
      </div>
      <div id="_${item.id}" class="delete-btn">
        <img id="delete-btn-img" src="http://127.0.0.1:5500/Images/trash.svg" alt="">
      </div>
    </div>  
    `
    let wrapper = document.querySelector(".items-container")
    wrapper.innerHTML += elememts
  }

  let deleteBtn = document.querySelectorAll(".delete-btn")
  deleteBtn.forEach((btns) => btns.addEventListener("click", deleteItem))

  function deleteItem(e) {
    let wrapperDiv = e.currentTarget.parentNode
    let wrapperDivId = +wrapperDiv.id.replaceAll("_", "")

    let indexOfObject = chosenItem.findIndex((index) => {
      return wrapperDivId === index.id
    })

    chosenItem.splice(indexOfObject, 1)
    wrapperDiv.style.display = "none"

    localStorage.setItem("cart", JSON.stringify(chosenItem))
    itemCounter.textContent = chosenItem.length

    getSumOfPrice()
  }

  let plusMinusBtns = document.querySelectorAll(".plus-minus-symbols")
  plusMinusBtns.forEach((btns) => btns.addEventListener("click", addRemoveItem))
  function addRemoveItem(e) {
    let objId = +e.target.parentNode.parentNode.id.replaceAll("_", "")

    const indexOfObject = chosenItem.findIndex((item) => {
      return item.id === objId
    })

    if (e.currentTarget.textContent === "+") {
      chosenItem[indexOfObject].count += 1
    }
    if (e.currentTarget.textContent === "-") {
      chosenItem[indexOfObject].count -= 1
    }
    if (chosenItem[indexOfObject].count === 0) {
      chosenItem[indexOfObject].count = 1
    }

    localStorage.setItem("cart", JSON.stringify(chosenItem))
    getSumOfPrice()

    let multiplication =
      chosenItem[indexOfObject].price * chosenItem[indexOfObject].count
    multiplication = multiplication.toFixed(2)

    e.path[2].querySelector(".cart-item-price").textContent = multiplication
    e.target.parentNode.querySelector("h2").textContent =
      chosenItem[indexOfObject].count
  }

  function getSumOfPrice() {
    let gatheredItems = document.querySelector(".submitBtn-totalPrice-wrapper")

    let total = 0
    for (let oneItem of chosenItem) {
      total += oneItem.price * oneItem.count
    }

    gatheredItems.innerHTML = `
    <a href="order.html">
      <button class="submit-btn" >Оформить заказ</button>
    </a>
      <h1 class="overall-price">${total.toFixed(2)} ₸</h1> `
    document.querySelector(".total-price").textContent = total.toFixed(2)
  }

  itemCounter.textContent = chosenItem.length
  getSumOfPrice()
}

window.addEventListener("DOMContentLoaded", showChosenItems)
