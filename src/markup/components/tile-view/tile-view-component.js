$(document).ready(function () {
  $.ajax({
    type: "GET",
    
    url: "../../../data/items.json",
    success: function (res) {
        var itemCountId = 0; 
        $.each(res.items, function(key, value) {
          $(".items-tile-section").append(`
            <div class="item-details-container" data-id = "itemId-` + itemCountId + `">
                <div class="item-image-section">
                    <div class="item-discount">` + value.discount + `% off</div>
                    <img src="` + value.image + `">
                </div>
                <div class="item-details-section">
                    <div class="item-name">` + value.name + `</div>
                    <div class="item-details">
                        <div class="item-price">
                            <span class="item-display-price" data-display="` + value.price.display +`">$` + value.price.display + `</span>
                            <span class="item-actual-price" data-actual="` + value.price.actual + `">$` + value.price.actual + `</span>
                        </div>
                        <button class="add-to-cart-btn"> Add to Cart </button>
                    </div>
                </div>
            </div>
        `)
          console.log(value.name)

        })
    },
  });
});
