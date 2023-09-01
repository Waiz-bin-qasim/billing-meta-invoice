const container = document.querySelector(".con");
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
  console.log(parserType);
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
    document.querySelector("img").style.display = "none";
  } else {
    document.querySelector("img").style.display = "none";
    loading.style.display = "none";
    container.style.display = "block";
  }
};

function myFunction(message) {
  var x = document.getElementById("snackbar");
  x.innerText = message;
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 8000);
}

formSubmit.addEventListener("submit", function (event) {
  const form = event.currentTarget;
  if (form.file.files[0]) {
    const formData = new FormData(form);
    const url = "http://127.0.0.1:8090/upload";
    if (submitForm(form, "Old Parser")) {
      console.log("haziq");
      formData.append("parserChoice", 0);
    } else if (submitForm(form, "New Parser")) {
      formData.append("parserChoice", 1);
    }
    // formData.append("file", inputFile.files[0]);
    console.log(formData.get("parserChoice"));
    const fetchOptions = {
      method: "POST",
      body: formData,
    };
    setLoading(true);
    fetch(url, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        // const data = await res.json();
        console.log(data);
        console.log("Waiz");
        // setTimeout(() => {
        setLoading(false);
        myFunction(data.message);
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

function myAccFunc() {
  var x = document.getElementById("demoAcc");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

// Click on the "Jeans" link on page load to open the accordion for demo purposes
document.getElementById("myBtn").click();

// Open and close sidebar
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}
