const container = document.querySelector(".container");
const dropArea = document.querySelector("#drop-area");
const inputFile = document.querySelector("#input-file");
const imageView = document.querySelector("#img-view");
const newImage = document.createElement("img");
const formSubmit = document.querySelector("form");
const oldParserbtn = document.querySelector("#oldParser");
const newParserbtn = document.querySelector("#newParser");
const loading = document.querySelector(".loading-modal");

const loadFile = function (event) {
  var image = document.getElementById("show-uploaded-image");
  if (
    event.target.files[0] &&
    event.target.files[0].type === "application/pdf"
  ) {
    image.src = "/static/Img/pdf-icon.webp";
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
  if (document.activeElement.value == parserType) {
    console.log("Have one.");
    return true;
  }
  return false;
}

const setLoading = (bool) => {
  if (bool) {
    loading.style.display = "block";
    container.style.display = "none";
  } else {
    loading.style.display = "none";
    container.style.display = "block";
  }
};

formSubmit.addEventListener("submit", function (event) {
  const form = event.currentTarget;
  if (form.file.files[0]) {
    const formData = new FormData(form);
    const url = "http://127.0.0.1:8090/upload";
    if (submitForm(form, "Old Parser")) {
      formData.append(parserChoice, 0);
    } else if (submitForm(form, "New Parser")) {
      formData.append(parserChoice, 1);
    }
    const fetchOptions = {
      method: "POST",
      // Headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: formData,
    };
    setLoading(true);
    fetch(url, fetchOptions)
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        // setTimeout(() => {
        setLoading(false);
        // }, 5000);
      })
      .catch((err) => {
        console.log(err);
        // setTimeout(() => {
        setLoading(false);
        // }, 5000);
      });
  } else {
    alert("No File Uploaded");
  }
  event.preventDefault();
});
