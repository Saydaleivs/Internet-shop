const wrapper = document.querySelector(".ordered-items");
const price = document.querySelector(".order-price");
const chosenItem = JSON.parse(localStorage.getItem("cart"))
const allInputs = document.querySelectorAll(".all-inputs")
let item;

for (item of chosenItem) {
    let fixedPrice = item.price * item.count
    let elements = `
    <div class="single-ordered-item">
       <div>
         <img class="ordered-items-picture" src="${item.image}" alt="">
       </div>
       <div class="manual-pl">
          <div class="item-amount">${item.amount}</div>
          <h1 class="ordered-item-description">${item.description}</h1>
          <h3><span class="ordered-item-price">${fixedPrice.toFixed(2)}
        </span> ₸</h3>
          <h5>${item.count} ta Dona</h5>
       </div>
    </div>
    `;
    wrapper.innerHTML += elements;

    function countTotalCost() {
        let total = 0
        for (let oneData of chosenItem) {
            total += oneData.price * oneData.count
            document.querySelector(".total-price").textContent = total.toFixed(2)
            price.textContent = total.toFixed(2)
            document.querySelector('.item-counter').textContent = chosenItem.length
        }
    }
    countTotalCost()
}

function getUserData() {
    const user = {
        name: allInputs[0].value,
        phone: allInputs[1].value,
        email:  allInputs[2].value,
        organization: allInputs[3].value,
        city:  allInputs[4].value,
        address: allInputs[5].value,
        Comment: allInputs[6].value,
    }
    console.log(user);
}
document.querySelector('.order-btn').addEventListener("click", getUserData)

