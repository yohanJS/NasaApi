"use strict"


let content = document.getElementById("content");


function fetchData() {
  const MyKEY = "dTs4iAhgxeAdnEtRhKiEhIYPt4mwptPjrofcSepz";
  let myData = fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=${MyKEY}`)
      .then(response => response.json())
      .then(data => {
        content.innerHTML += data.photos[0].camera.full_name;
        content.innerHTML += `<br>Date on earth ${data.photos[0].earth_date} when the photo was taken`;
        content.innerHTML += `<img src="${data.photos[0].img_src}" id="my-image">`;
      });
}

window.onload = function() {
  fetchData();
}
