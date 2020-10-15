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
  var itemCountId = 0;
  var itemList = renderItemData.map((data,index) => {
    return `<div class="item-details-container" data-id = "itemId-` + itemCountId + `">
                <div class="item-image-section">
                    <div class="item-discount"> ${data.discount} % off</div>
                    <img src="${data.image}">
                </div>
                <div class="item-details-section">
                    <div class="item-name"> ${data.name}</div>
                    <div class="item-details">
                        <div class="item-price">
                            <span class="item-display-price" data-display="${data.price.display}">$${data.price.display}</span>
                            <span class="item-actual-price" data-actual="${data.price.actual}">$${data.price.actual}</span>
                        </div>
                        <button class="add-to-cart-btn"> Add to Cart </button>
                    </div>
                </div>
            </div>
        `}).join(' ');
      itemCountId++;
    
  // Passing/appending list data for rendering
  document.querySelector(".items-tile-section").innerHTML = itemList;
}

// Calling the function which fetches JSON data on window load
window.addEventListener('load', (event) => {
  fetchItemData();
});