const baseUrl = "https://c832-34-68-41-177.ngrok.io";
const form = document.getElementById("form");
const a = document.getElementById("answer");
const l = document.getElementById("loading");
const lat = document.getElementById("lat");
const lon = document.getElementById("lon");
const zoom = document.getElementById("zoom");
const tabcontent = document.getElementsByClassName("tabcontent");
const fileInput = document.querySelector("upload");


function get_image(event) {
  l.style.display = "flex";
  var reader = new FileReader();
  var reader_ = new FileReader();
  reader.onload = function () {
    var output = document.getElementById("output_image");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
  const options = {
    method: "POST",
    headers: {'Content-Type': "image/jpeg"},
    body: reader_.readAsDataURL(event.target.files[0]),
  };
  var formData = new FormData();
    var fileInput = document.getElementById('upload');
    if (fileInput.files[0]) {
      console.log("True");
        formData.append("file", fileInput.files[0]);
  fetch(baseUrl+"/", 
       {
                method: 'post',
                data: formData,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
        }
       )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      let ans = "Fire: \n\t".concat(json.answer.fire);
      let score = "\n\nNo Fire: \n\t".concat(json.answer.no_fire);
      let context = "\n\nStart Fire: \n\t".concat(json.answer.start_fire);
      a.value = ans.concat(score.concat(context));
    })
    .then(() => {
      l.style.display = "none";
    })
    .catch((e) => {
      l.style.display = "none";
      a.value = "Server Error";
    });
}
}

function get(lon, lat, zoom) {
  let query = baseUrl + "/" + lon + "/" + lat + "/" + zoom;
  fetch(query)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      let ans = "Fire: \n\t".concat(json.answer.fire);
      let score = "\n\nNo Fire: \n\t".concat(json.answer.no_fire);
      let context = "\n\nStart Fire: \n\t".concat(json.answer.start_fire);
      a.value = ans.concat(score.concat(context));
    })
    .then(() => {
      l.style.display = "none";
    })
    .catch((e) => {
      l.style.display = "none";
      a.value = "Server Error";
    });
}

form.addEventListener(
  "submit",
  function (e) {
    e.preventDefault();
    l.style.display = "flex";
    if (tabcontent[0].style.display == "block") {
      get(lon.value, lat.value, zoom.value);
    } else {
      get_image(e);
    }
  },
  false
);
