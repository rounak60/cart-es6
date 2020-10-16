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
    })
    .catch((error) => {
      console.log(error);
    });
}

// passing data into renderData() and rendering it into DOM
function renderData(renderItemData) {
  let itemList = renderItemData.map((data,index) => {
    return `<div class="item-details-container" id="${index}" data-id = "itemId-${index}">
                <div class="item-image-section">
                    <div class="item-discount"> ${data.discount}% off</div>
                    <img class="item-image" src="${data.image}">
                </div>
                <div class="item-details-section">
                    <div class="item-name"> ${data.name}</div>
                    <div class="item-details">
                        <div class="item-price">
                            <span class="item-display-price" data-display="${data.price.display}">$${data.price.display}</span>
                            <span class="item-actual-price" data-actual="${data.price.actual}">$${data.price.actual}</span>
                        </div>
                        <button class="add-to-cart-btn" id="btn-${index}" onClick="addToCart(this)"> Add to Cart </button>
                    </div>
                </div>
            </div>
        `}).join(' ');
    
  // Passing/appending list data for rendering
  document.querySelector(".items-tile-section").innerHTML = itemList;
}

function addToCart(itemData) {
  const id = itemData.getAttribute('id').split('-')[1];
  const selectedItem = itemData.parentElement.parentElement;
  const itemName = selectedItem.getElementsByClassName('item-name')[0].innerText;
  const imageUrl = selectedItem.parentElement.getElementsByClassName('item-image')[0].getAttribute('src');
  const itemDisplayPrice = parseInt(selectedItem.getElementsByClassName('item-display-price')[0].getAttribute('data-display'));
  const itemActualPrice = parseInt(selectedItem.getElementsByClassName('item-actual-price')[0].getAttribute('data-actual'));
  const itemTotal = parseInt(document.getElementsByClassName("item-total")[0].innerText);
  const discTotal = parseInt(document.getElementsByClassName("disc-total")[0].innerText);
  const grossTotal = parseInt(document.getElementsByClassName("gross-total")[0].innerText);
  const newDiscount = itemDisplayPrice - itemActualPrice;

  //Updating Total, Discounted Price, Gross Total
  document.getElementsByClassName("item-total")[0].innerText =  (itemTotal + itemDisplayPrice);
  document.getElementsByClassName("disc-total")[0].innerText =  (discTotal + newDiscount);
  document.getElementsByClassName("gross-total")[0].innerText =  (grossTotal + itemActualPrice);

  // Function for Cart Button properties change on click.
  cartBtnProp(id, itemName); 

  // Creating HTML for Item Added to Cart
  const htmlTable =  `<tr class="cart-item-block" id="${id}" data-display="${itemDisplayPrice}" data-actual="${itemActualPrice}" data-index="${id}"> 
  <td> 
    <div class="item-list-details">
      <div class="item--details">
        <div>
          <img class="item-list-image" src="${imageUrl}">
        </div>
        <div class="item-list-name">${itemName}</div>
      </div>
      <div class="item-list-remove" onClick="removeItem(this)">x</div>
    </div> 
  </td> 
  <td class="list-item-qty">
    <input type="button" value="-" class="sub-quant" onClick="changeQuantity(this,'remove')" disabled>
    <input type="text" size="10" value="1" class="totalCount" disabled>
    <input type="button" value="+" class="add-quant" onClick="changeQuantity(this,'add')">
  </td> 
  <td class="list-item-price">${itemDisplayPrice}</td> 
</tr>`;

//Updating DOM with new HTML for Cart
document.querySelector(".added-items-list").innerHTML += htmlTable;
}

function cartItemLength() {
  const cartItemCount = document.getElementsByClassName("cart-item-block").length;
  document.getElementsByClassName("total-item-number").innerHTML = "Items" + "(" + cartItemCount + ")"
}

function cartBtnProp(index, name) {
  document.querySelector(`#btn-${index}`).setAttribute('disabled',true);
  document.querySelector(`#btn-${index}`).className += " " + "add-to-cart-btn--disabled";
  document.querySelector(`#btn-${index}`).innerHTML = "Added to Cart";
  document.querySelector(".header-toast-msg").style.display = "block";
  document.querySelector(".toast-msg-text").innerHTML = name + " is added to cart";
  setTimeout(() => {
    document.querySelector(".header-toast-msg").style.display = "none";
  }, 3000);
}

function cartBtnProRemoveItem(index) {
  document.querySelector(`#btn-${index}`).removeAttribute('disabled');
  document.querySelector(`#btn-${index}`).classList.remove("add-to-cart-btn--disabled") ;
  document.querySelector(`#btn-${index}`).innerHTML = "Add to Cart";
}

function changeQuantity(tr, type) {
  const selectedRow = tr.parentElement.parentElement;
  const displayVal = parseInt(selectedRow.getAttribute("data-display"));
  const actualVal = parseInt(selectedRow.getAttribute("data-actual"));
  const indexVal = parseInt(selectedRow.rowIndex) - 1;
  const quantity = parseInt(document.getElementsByClassName("totalCount")[indexVal].value);
  const orderTotalVal = parseInt(document.getElementsByClassName("gross-total")[0].innerText);
  const itemTotalVal = parseInt(document.getElementsByClassName("item-total")[0].innerText);
  const discountTotal = parseInt(document.getElementsByClassName("disc-total")[0].innerText);
  const singleItemTotal = parseInt(document.getElementsByClassName("list-item-price")[indexVal].innerText);
  const updatedQuantity = type === "add" ? (quantity + 1) : (quantity - 1);

  document.getElementsByClassName("list-item-price")[indexVal].innerText = type === "add" ? (displayVal*updatedQuantity) : (singleItemTotal - displayVal);
  document.getElementsByClassName("gross-total")[0].innerText = type === "add" ? (orderTotalVal + actualVal): (orderTotalVal - actualVal);
  document.getElementsByClassName("item-total")[0].innerText = type === "add" ? (itemTotalVal + displayVal): (itemTotalVal - displayVal);
  document.getElementsByClassName("disc-total")[0].innerText = type === "add" ? (discountTotal + (displayVal - actualVal)) : (discountTotal - (displayVal - actualVal));
  document.getElementsByClassName("totalCount")[indexVal].value =  updatedQuantity;
  
  if(updatedQuantity === 1) {
    document.getElementsByClassName("sub-quant")[indexVal].setAttribute('disabled',true);
  }else {
    document.getElementsByClassName("sub-quant")[indexVal].removeAttribute('disabled');
  }
}

function removeItem(tr) {
  const selectedRow = tr.parentElement.parentElement.parentElement;
  const displayVal = parseInt(selectedRow.getAttribute("data-display"));
  const actualVal = parseInt(selectedRow.getAttribute("data-actual"));
  const dataIndex = parseInt(selectedRow.getAttribute("data-index"));
  const removedQty = parseInt(selectedRow.getElementsByClassName("totalCount")[0].value);
  const orderTotalVal = parseInt(document.getElementsByClassName("gross-total")[0].innerText);
  const itemTotalVal = parseInt(document.getElementsByClassName("item-total")[0].innerText);
  const discountTotal = parseInt(document.getElementsByClassName("disc-total")[0].innerText);
  const getItemContainer = document.getElementsByClassName("item-details-container")[dataIndex];
  document.getElementsByClassName("item-total")[0].innerText = itemTotalVal - (displayVal * removedQty);
  document.getElementsByClassName("disc-total")[0].innerText = discountTotal - ((displayVal - actualVal) * removedQty);
  document.getElementsByClassName("gross-total")[0].innerText = orderTotalVal - (actualVal * removedQty);
  document.getElementById("cartTable").deleteRow(selectedRow.rowIndex);

  if(getItemContainer) {
    cartBtnProRemoveItem(dataIndex);
  }
}

// Calling the function which fetches JSON data on window load
window.addEventListener('load', (event) => {
  fetchItemData();
});