const MetaInvoicemodal = document.getElementById("MetaInvoice");
const BillingReportModal = document.getElementById("BillingReportModal");
const formSubmit = document.querySelector("form");
const oldParserbtn = document.querySelector("#oldParser");
const newParserbtn = document.querySelector("#newParser");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];
let parserChoice;
// Alerts
const successAlert = () => {
  MetaInvoicemodal.style.display = "none";
  Swal.fire("Successful", "Meta Invoice Uploaded", "success").then((e) => {
    window.location.href = "/upload";
  });
};
const errorAlert = (message) => {
  MetaInvoicemodal.style.display = "none";
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Error!",
    text: message,
  });
};

new DataTable("#example", {
  dom: "Bfrtip",
  buttons: [
    {
      // extend: "collection",
      text: "Upload",
      attr: {
        style:
          "background-color:#363a77;color:white;font-weight:400;border-radius:5px",
      },
      action: function (e, node, config) {
        MetaInvoicemodal.style.display = "block";
      },
    },
  ],
});
// Get the modal
span.onclick = function () {
  MetaInvoicemodal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == MetaInvoicemodal) {
    MetaInvoicemodal.style.display = "none";
  }
};

// Meta Invoice Upload
const loadFile = function (event) {
  const image = document.getElementById("show-uploaded-image");
  console.log(event.target.files[0].type);

  if (
    event.target.files[0] &&
    event.target.files[0].type === "application/pdf"
  ) {
    image.src = "/static/Img/pdf-icon.webp";
    document.querySelector(".para-text").innerHTML =
      "File has been Uploaded <br/> Select The Parser";
    document.querySelector(".span-text").innerText = event.target.files[0].name;
  } else {
    image.src = "/static/Img/508-icon.png";
    event.target.files[0] = null;
    errorAlert("Incorrect File Type");
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

const setParserChoice = (value) => {
  parserChoice = value;
};

// showProgressBar();
formSubmit.addEventListener("submit", function (event) {
  event.preventDefault();
  let socket = initSocketsToAutoUpdateProgressBar();
  showProgressBar("Uploading Meta Invoice");
  const form = event.currentTarget;
  if (form.file.files[0]) {
    const formData = new FormData(form);
    console.log(parserChoice);
    formData.append("parserChoice", parserChoice);
    const url = "/upload";
    const fetchOptions = {
      method: "POST",
      body: formData,
    };
    updateProgressBar(13);
    socket.on("Update Progress", (value) => {
      console.log(value);
      updateProgressBar(value);
    });
    fetch(url, fetchOptions)
      .then((res) => {
        console.log(res);
        hideProgressBar("Upload MEta Invoice");
        if (res.status == 200) {
          return successAlert();
        } else if (res.status === 400) {
          return res.json();
        } else {
          throw "An Error Occurred";
        }
      })
      .then((data) => {
        if (data && data.message) {
          errorAlert(data.message);
        }
      })
      .catch((err) => {
        hideProgressBar("Upload MEta Invoice");
        console.log(err);
        errorAlert(err);
      });
  } else {
    errorAlert("No File Uploaded");
  }
});
