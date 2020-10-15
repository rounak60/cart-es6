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
      addListner(itemData.items);
    })
    .catch((error) => {
      console.log(error);
    });
}

function addListner(data) {
  data.map((btn,index) => {

    document.querySelector(`#btn-${index}`).addEventListener("click", function (e) {

      const grossTotal = parseInt(document.getElementsByClassName("gross-total")[0].innerText);
      const discTotal = parseInt(document.getElementsByClassName("disc-total")[0].innerText);
      const itemTotal = parseInt(document.getElementsByClassName("item-total")[0].innerText);
      const newDiscount = btn.price.display - btn.price.actual;

      document.getElementsByClassName("disc-total")[0].innerText = discTotal + newDiscount;
      document.getElementsByClassName("gross-total")[0].innerText = grossTotal + btn.price.actual;
      document.getElementsByClassName("item-total")[0].innerText = itemTotal + btn.price.display;

    });
  });
}

function addQty() {

}

function removeQty() {

}

function removeItem() {

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
