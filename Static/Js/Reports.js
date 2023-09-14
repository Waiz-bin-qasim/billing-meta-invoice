const MetaInvoicemodal = document.getElementById("MetaInvoice");
const BillingReportModal = document.getElementById("BillingReportModal");
const formSubmit = document.querySelector("form");
const oldParserbtn = document.querySelector("#oldParser");
const newParserbtn = document.querySelector("#newParser");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

// Alerts
const successAlert = () => {
  Swal.fire("Successful", "Report Generated ", "success");
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
  year = year.slice(-2);
  return [year, month];
};

const showProgressBar = () => {
  const progressBar = document.querySelector("#progress");
  const date = document.getElementById("date");
  const genBtn = document.getElementById("Generate");
  date.style.display = "none";
  genBtn.style.display = "none";
  console.log(progressBar);
  progressBar.style.display = "block";
};

const hideProgressBar = () => {
  const progressBar = document.querySelector("#progress");
  const date = document.getElementById("date");
  const genBtn = document.getElementById("Generate");
  date.style.display = "block";
  genBtn.style.display = "block";
  progressBar.style.display = "none";
};

const updateProgressBar = (value) => {
  const span = document.querySelector("#progressBar");
  span.style.width = value + "%";
  span.innerHTML = value + "%";
};

formSubmit.addEventListener("submit", function (event) {
  event.preventDefault();
  showProgressBar();
  updateProgressBar(20);
  const [year, month] = parseDate();
  const url = `http://localhost:8090/generatecsv?param1=${month}&&param2=${year}`;
  const fetchOptions = {
    method: "POST",
  };
  updateProgressBar(40);
  fetch(url, fetchOptions)
    .then((res) => {
      updateProgressBar(60);
      updateProgressBar(80);
      if (res.ok) {
        updateProgressBar(100);
        successAlert();
        hideProgressBar();
      } else {
        updateProgressBar(100);
        const err = res.json();
        hideProgressBar();
        throw err.message;
      }
    })
    .catch((err) => {
      updateProgressBar(100);
      hideProgressBar();
      console.log(err);
      errorAlert(err);
    });
});

const downloadFile = (value) => {
  const [month, year, _] = value.split(/(\d+)/);
  window.location.href = `http://127.0.0.1:8090/getcsv?param1=${month}&&param2=${year}`;
};
