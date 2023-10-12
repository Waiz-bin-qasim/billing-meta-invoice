const MetaInvoicemodal = document.getElementById("MetaInvoice");
const formSubmit = document.querySelector("form");
const span = document.querySelector(".close");
const uploadReport = document.querySelector("#uploadReport");
const reportForm = document.getElementById("Report");
// Alerts
const successAlert = () => {
  MetaInvoicemodal.style.display = "none";
  Swal.fire("Successful", "Report Generated ", "success").then((e) => {
    window.location.href = "/downloadcsv";
  });
};
const errorAlert = (message) => {
  MetaInvoicemodal.style.display = "none";
  Swal.fire({
    icon: "error",
    title: "Error!",
    text: message,
  });
};

$("#example").DataTable({
  dom: "Bfrtip",
  buttons: [
    {
      // extend: "collection",
      text: "Generate",
      className: "btn",
      attr: {
        style:
          "background-color:#363a77;color:white;font-weight:400;border-radius:5px",
        className: "btn",
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

span.onclick = function () {
  uploadReport.style.display = "none";
  MetaInvoicemodal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == uploadReport) {
    uploadReport.style.display = "none";
  } else if (event.target == MetaInvoicemodal) {
    MetaInvoicemodal.style.display = "none";
  }
};

const parseDate = () => {
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = document.getElementById("date");
  let [year, month] = date.value.split("-");
  month = monthNames[parseInt(month - 1)];
  console.log(month);
  return [year, month];
};

formSubmit.addEventListener("submit", function (event) {
  event.preventDefault();
  showProgressBar("Generating Report");
  let socket = initSocketsToAutoUpdateProgressBar();
  const [year, month] = parseDate();
  const url = `/generatecsv/${socketId}?param1=${month}&&param2=${year}`;
  const fetchOptions = {
    method: "POST",
  };
  updateProgressBar(13);
  socket.on("Update Progress", (value) => {
    console.log(value);
    updateProgressBar(value);
  });

  fetch(url, fetchOptions)
    .then((res) => {
      hideProgressBar("Generate Report");
      if (res.ok) {
        successAlert();
        return;
      } else if (res.status === 400) {
        return res.json();
      } else {
        throw "an error occured";
      }
    })
    .then((e) => {
      if (e) {
        errorAlert(e.message);
      }
    })
    .catch((err) => {
      hideProgressBar("Upload Billing Report");
      errorAlert(err);
    });
});

const downloadFile = (value) => {
  console.log(value);
  const [month, year, _] = value.split(/(\d+)/);
  window.location.href = `/getcsv?param1=${month}&&param2=${year}`;
};

const uploadFile = () => {
  uploadReport.style.display = "block";
};

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
    document.querySelector(".span-text").innerText =
      "Upload any Report from Desktop";
    errorAlert("Incorrect File Type");
  }
};

reportForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showProgressBar("Uploading Report");
  let socket = initSocketsToAutoUpdateProgressBar();
  const form = event.currentTarget;
  if (form.file.files[0]) {
    const formData = new FormData(form);
    const url = "/finance/upload"; //-. yahan link ayega
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
        hideProgressBar("Upload Billing Report For Finance");
        if (res.ok) {
          successAlert();
        } else {
          let err = res.json();
          console.log(err.message);
          throw err.message;
        }
      })
      .catch((err) => {
        hideProgressBar("Upload Billing Report For Finance");
        errorALert(err);
      });
  } else {
    errorALert("No File Uploaded");
  }
});
