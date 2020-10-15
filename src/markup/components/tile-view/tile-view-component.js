function fetchItemData() {
  fetch("../../../data/items.json")
  .then(res => console.log(res));
}

fetchItemData();



// window.load(function() {

//   $.ajax({
//     type: "GET",
//     url: "../../../data/items.json",
//     success: function (res) {   
//       console.log(res)
//     }
//   });

// })

  

// fetch('../../../data/items.json')
//   .then(res => res.json())
//   .then(data =>{
//     console.log(data)
//     if(data.length > 0) {
//       var test = '';

//       //-- start for loop

//       data.forEach((itemData) => {
         
//         test +="<div>"
//         test +="<div>"+ itemData.items.name +"</div></div>";
//       });

//       //-- end for loop 
//       console.log("data test",test);
//       document.getElementById("testData").innerHTML = test;
//     }

//   });