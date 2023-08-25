const dropArea = document.querySelector("#drop-area");
const inputFile = document.querySelector("#input-file");
const imageView = document.querySelector("#img-view");
const newImage = document.createElement("img");

// const uploadFile = () => {
//   let imageLink = URL.createObjectURL(inputFile.files[0]);
//   console.log(imageLink);

// };

// inputFile.addEventListener("change", uploadFile);

const loadFile = function (event) {
  var image = document.getElementById("show-uploaded-image");
  if (event.target.files[0].type === "application/pdf") {
    image.src = "../Static/Img/pdf-icon.webp";
    document.querySelector(".para-text").innerHTML =
      "File has been Uploaded <br/> Click Submit";
    document.querySelector(".span-text").innerText = event.target.files[0].name;
  } else {
    alert("Incorrect File Type");
    event.target.files[0] = null;
  }
};
