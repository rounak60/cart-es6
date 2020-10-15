
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

function renderData(renderItemData) {
  var itemCountId = 0;
  var itemList = renderItemData.map((data,index) => {
    return `<div class="item-details-container" data-id = "itemId-` + itemCountId + `">
                <div class="item-image-section">
                    <div class="item-discount"> + ${data.discount} + % off</div>
                    <img src=" ${data.image}  ">
                </div>
                <div class="item-details-section">
                    <div class="item-name"> ${data.name}</div>
                    <div class="item-details">
                        <div class="item-price">
                            <span class="item-display-price" data-display="${data.price.display}">$ ${data.price.display}</span>
                            <span class="item-actual-price" data-actual="${data.price.actual}">$ ${data.price.actual}</span>
                        </div>
                        <button class="add-to-cart-btn"> Add to Cart </button>
                    </div>
                </div>
            </div>
        `}).join(' ');
      itemCountId++;

  document.querySelector(".items-tile-section").innerHTML = itemList;
}

// window.onload
fetchItemData();
