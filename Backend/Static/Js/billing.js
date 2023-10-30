const MetaInvoicemodal = document.getElementById("MetaInvoice");
const BillingReportModal = document.getElementById("BillingReportModal");
const formSubmit = document.querySelector("form");
const oldParserbtn = document.querySelector("#oldParser");
const newParserbtn = document.querySelector("#newParser");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

// ALerts
const successAlert = () => {
  MetaInvoicemodal.style.display = "none";
  Swal.fire("Successful", "Billing MAU uploaded", "success").then((e) => {
    loading.style.display = "block";
    loading.style.backgroundColor = "#f0f8fe";
    sideBar.style.display = "none";
    section.style.display = "none";
    window.location.href = "/mau/upload";
  });
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
    image.src = "/static/img/download.png";
    document.querySelector(".para-text").innerHTML =
      "File has been Uploaded <br/> Select The Parser";
    document.querySelector(".span-text").innerText = event.target.files[0].name;
  } else {
    image.src = "/static/img/508-icon.png";
    event.target.files[0] = null;
    document.querySelector(".span-text").innerText = "";
    errorALert("Incorrect File Type");
  }
};

formSubmit.addEventListener("submit", function (event) {
  event.preventDefault();
  showProgressBar("Uploading Billing MAU");
  let socket = initSocketsToAutoUpdateProgressBar();
  const form = event.currentTarget;
  if (form.file.files[0]) {
    const formData = new FormData(form);
    const url = "/mau/upload";
    const fetchOptions = {
      method: "POST",
      body: formData,
    };
    updateProgressBar(15);
    socket.on("Update Progress", (value) => {
      console.log(value);
      updateProgressBar(value);
    });
    fetch(url, fetchOptions)
      .then((res) => {
        hideProgressBar("Upload Billing Report");
        if (res.ok) {
          successAlert();
        } else {
          let err = res.json();
          console.log(err.message);
          throw err.message;
        }
      })
      .catch((err) => {
        hideProgressBar("Upload Billing Report");
        errorALert(err);
      });
  } else {
    errorALert("No File Uploaded");
  }
});

const downloadFile = (value) => {
  console.log(value);
  const [month, year, _] = value.split(/(\d+)/);
  // Yahan maha ka link ayega
  window.location.href = `/getmau?param1=${month}&&param2=${year}`;
};
