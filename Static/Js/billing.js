const MetaInvoicemodal = document.getElementById("MetaInvoice");
const BillingReportModal = document.getElementById("BillingReportModal");
const formSubmit = document.querySelector("form");
const oldParserbtn = document.querySelector("#oldParser");
const newParserbtn = document.querySelector("#newParser");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

// ALerts
const successAlert = () => {
  Swal.fire("Successful", "Billing MAU uploaded", "success");
};
const errorALert = (message) => {
  MetaInvoicemodal.style.display = "none";
  Swal.fire({
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

// modal Js
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
  var image = document.getElementById("show-uploaded-image");
  console.log(event.target.files[0].type);
  if (
    event.target.files[0] &&
    (event.target.files[0].type === ".xlsx" ||
      event.target.files[0].type === "application/vnd.openx" ||
      event.target.files[0].type ===
        "mlformats-officedocument.spreadsheetml.sheet" ||
      event.target.files[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
  ) {
    image.src = "/static/Img/download.png";
    document.querySelector(".para-text").innerHTML =
      "File has been Uploaded <br/> Select The Parser";
    document.querySelector(".span-text").innerText = event.target.files[0].name;
  } else {
    image.src = "/static/Img/508-icon.png";
    event.target.files[0] = null;
    document.querySelector(".span-text").innerText = "";
    errorALert("Incorrect File Type");
  }
};

formSubmit.addEventListener("submit", function (event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (form.file.files[0]) {
    const formData = new FormData(form);
    const url = "http://localhost:8090/mau/upload";
    const fetchOptions = {
      method: "POST",
      body: formData,
    };
    fetch(url, fetchOptions)
      .then((res) => {
        if (res.ok) {
          successAlert();
        } else {
          let err = res.json();
          console.log(err.message);
          throw err.message;
        }
      })
      .catch((err) => {
        errorALert(err);
      });
  } else {
    errorALert("No File Uploaded");
  }
});
