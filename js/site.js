"use strict"

let $ = (id)=> {
  return document.getElementById(id);
}

let content = $("content");
let images = $("my-images");

//KEY TO ACCESS NASA API
const MyKEY = "dTs4iAhgxeAdnEtRhKiEhIYPt4mwptPjrofcSepz";

let fetchBySol = async () => {
  //the user can retrieve resources by SOL number
  let sol = $("sol").value;

  //prevents the app from crashing if the user enters 0
  if($("sol").value == 0) {
    alert("Input must be greater than 0.\nTry Again!");
  } else {
    $("feedback").innerHTML = "Finding data....\n Please wait.";
    let res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${MyKEY}`)

    try{

      let data = await res.json();
      
          content.innerHTML += `<strong>On Sol</strong> ${sol}, there are a total of ${data.photos.length} photos.<br>`;
          content.innerHTML += `<strong>Camera Used:</strong> ${data.photos[0].camera.full_name}.<br>`;
          content.innerHTML += `<strong>Date on earth:</strong> ${data.photos[0].earth_date}.<br>`;
          content.innerHTML += `<strong>Landing Date</strong> ${data.photos[0].rover.landing_date}.<br>`;
          content.innerHTML += `<strong>Rover Name:</strong> ${data.photos[0].rover.name}.<br>`;
          
          $("feedback").innerHTML = "";
          //using the map function we iterate over the photos array
          //and insert them inside an image element using the source
          //attribute
          data.photos.map((photo) => {
            images.innerHTML += `<img src="${photo.img_src}" id="my-image"><br>`;
          });
    } catch(err){
      content.innerHTML += `Try another Sol.`;
    }
  }
}


window.onload = function() {
  $("find").onclick = function() {
    content.innerHTML = "";
    images.innerHTML = "";
    fetchBySol();
  }
}
