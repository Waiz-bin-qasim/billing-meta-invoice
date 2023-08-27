const dropArea = document.querySelector("#drop-area");
const inputFile = document.querySelector("#input-file");
const imageView = document.querySelector("#img-view");
const newImage = document.createElement("img");
const formSubmit = document.querySelector("form");
const oldParserbtn = document.querySelector("#oldParser");
const newParserbtn = document.querySelector("#newParser");

const loadFile = function (event) {
  var image = document.getElementById("show-uploaded-image");
  if (
    event.target.files[0] &&
    event.target.files[0].type === "application/pdf"
  ) {
    image.src = "../Static/Img/pdf-icon.webp";
    document.querySelector(".para-text").innerHTML =
      "File has been Uploaded <br/> Select The Parser";
    document.querySelector(".span-text").innerText = event.target.files[0].name;
  } else {
    image.src = "../Static/Img/508-icon.png";
    event.target.files[0] = null;
  }
};

function submitForm(form, parserType) {
  console.log(document.activeElement.value);
  console.log("waiz");
  if (document.activeElement.value == parserType) {
    console.log("Have one.");
    return true;
  }
  return false;
}

formSubmit.addEventListener("submit", function (event) {
  const form = event.currentTarget;
  if (form.file.files[0]) {
    const formData = new FormData(form);
    const url = "";
    if (submitForm(form, "Old Parser")) {
      formData.parserChoice = 0;
    } else if (submitForm(form, "New Parser")) {
      formData.parserChoice = 1;
    }
    const fetchOptions = {
      method: "POST",
      body: formData,
    };
    fetch(url, fetchOptions);
  } else {
    alert("No File Uploaded");
  }
  event.preventDefault();
});
