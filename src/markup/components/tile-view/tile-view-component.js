const { event } = require("grunt");

window.load(function() {

  $.ajax({
    type: "GET",
    url: "../../../data/items.json",
    success: function (res) {   
      console.log(res)
    }
  });

})

  

