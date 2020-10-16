// function which fetches JSON data
function fetchItemData() {
  fetch("../../../data/items.json")
    .then((res) => {
      if (!res.ok) {
        throw Error("ERROR IN API");
      }
      return res.json();
    })
    .then((itemData) => {
      renderData(itemData.items);
      addListener(itemData.items)
    })
    .catch((error) => {
      console.log(error);
    });
}

function addListener(data) {
  // console.log(data)
  addToCartListner(data);
  // removeFromCartListner(data);
}

function addToCartListner(data) {
   data.map((cartBtn,index) => {
    let htmlTable = "";
    // 
      const itemTotal = parseInt(document.getElementsByClassName("item-total")[0].innerText);
      const discTotal = parseInt(document.getElementsByClassName("disc-total")[0].innerText);
      const grossTotal = parseInt(document.getElementsByClassName("gross-total")[0].innerText);
      const newDiscount = cartBtn.price.display - cartBtn.price.actual;

    document.querySelector(`#btn-${index}`).addEventListener("click", function (e) {

      document.getElementsByClassName("item-total")[0].innerText =  (itemTotal + cartBtn.price.display);
      document.getElementsByClassName("disc-total")[0].innerText =  (discTotal + newDiscount);
      document.getElementsByClassName("gross-total")[0].innerText =  (grossTotal + cartBtn.price.actual);

      cartBtnProp(index, cartBtn.name); // Function for Cart Button properties change on click.

      htmlTable =  `<tr data-display="${cartBtn.price.display}" data-actual="${cartBtn.price.actual}" > 
                      <td> 
                        <div class="item-list-details">
                          <div class="item--details">
                            <div>
                              <img class="item-list-image" src="${cartBtn.image}">
                            </div>
                            <div class="item-list-name">${cartBtn.name}</div>
                          </div>
                          <div class="item-list-remove" onClick="removeItem(this)">x</div>
                        </div> 
                      </td> 
                      <td class="list-item-qty">
                        <input type="button" value="-" class="sub-quant" onClick="changeQuantity(this,'remove')">
                        <input type="text" size="10" value="1" class="totalCount" disabled>
                        <input type="button" value="+" class="add-quant" onClick="changeQuantity(this,'add')">
                      </td> 
                      <td class="list-item-price">$${cartBtn.price.display}</td> 
                    </tr>`
      document.querySelector(".added-items-list").innerHTML += htmlTable;
    });
  });
}

function cartBtnProp(index, name) {
  document.querySelector(`#btn-${index}`).setAttribute('disabled','true');
  document.querySelector(`#btn-${index}`).className += " " + "add-to-cart-btn--disabled";
  document.querySelector(`#btn-${index}`).innerHTML = "Added to Cart";
  document.querySelector(".header-toast-msg").style.display = "block";
  document.querySelector(".toast-msg-text").innerHTML = name + " is added to cart";
}


function changeQuantity(tr, type) {
  console.log(type)
  let selectedRow = tr.parentElement.parentElement;
  let displayVal = parseInt(selectedRow.getAttribute("data-display"));
  let actualVal = parseInt(selectedRow.getAttribute("data-actual"));
  const quantity = parseInt(document.getElementsByClassName("totalCount")[0].value);
  let orderTotalVal = parseInt(document.getElementsByClassName("gross-total")[0].innerText);
  let itemTotalVal = parseInt(document.getElementsByClassName("item-total")[0].innerText);
  let discountTotal = parseInt(document.getElementsByClassName("disc-total")[0].innerText);

  document.getElementsByClassName("gross-total")[0].innerText = type === "add" ? (orderTotalVal + actualVal): (orderTotalVal - actualVal);
  document.getElementsByClassName("item-total")[0].innerText = type === "add" ? (itemTotalVal + displayVal): (itemTotalVal - displayVal);
  document.getElementsByClassName("disc-total")[0].innerText = type === "add" ? (discountTotal + (displayVal - actualVal)) : (discountTotal - (displayVal - actualVal));

  document.getElementsByClassName("totalCount")[0].value =  type === "add" ? (quantity + 1) : (quantity - 1);

}

function removeItem(tr) {
  let selectedRow = tr.parentElement.parentElement.parentElement;
  let displayVal = selectedRow.getAttribute("data-display");
  let actualVal = selectedRow.getAttribute("data-actual");
  const removedQty = parseInt(document.getElementsByClassName("totalCount")[0].value);
  let orderTotalVal = parseInt(document.getElementsByClassName("gross-total")[0].innerText);
  let itemTotalVal = parseInt(document.getElementsByClassName("item-total")[0].innerText);
  let discountTotal = parseInt(document.getElementsByClassName("disc-total")[0].innerText);

  document.getElementsByClassName("gross-total")[0].innerText = orderTotalVal - (actualVal * removedQty);
  document.getElementsByClassName("item-total")[0].innerText = itemTotalVal - (displayVal * removedQty);
  document.getElementsByClassName("disc-total")[0].innerText = discountTotal - ((displayVal - actualVal) * removedQty);
  document.getElementById("cartTable").deleteRow(selectedRow.rowIndex);

}


// passing data into renderData() and rendering it into DOM
function renderData(renderItemData) {
  let itemList = renderItemData.map((data,index) => {
    return `<div class="item-details-container" data-id = "itemId-${index}">
                <div class="item-image-section">
                    <div class="item-discount"> ${data.discount}% off</div>
                    <img src="${data.image}">
                </div>
                <div class="item-details-section">
                    <div class="item-name"> ${data.name}</div>
                    <div class="item-details">
                        <div class="item-price">
                            <span class="item-display-price" data-display="${data.price.display}">$${data.price.display}</span>
                            <span class="item-actual-price" data-actual="${data.price.actual}">$${data.price.actual}</span>
                        </div>
                        <button class="add-to-cart-btn" id="btn-${index}"> Add to Cart </button>
                    </div>
                </div>
            </div>
        `}).join(' ');
    
  // Passing/appending list data for rendering
  document.querySelector(".items-tile-section").innerHTML = itemList;
}

// Calling the function which fetches JSON data on window load
window.addEventListener('load', (event) => {
  fetchItemData();

});

document.addEventListener("DOMContentLoaded", function(){

  
});
