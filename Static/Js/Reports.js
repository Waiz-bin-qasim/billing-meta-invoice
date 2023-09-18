const MetaInvoicemodal = document.getElementById("MetaInvoice");
const formSubmit = document.querySelector("form");
const span = document.getElementsByClassName("close")[0];
// Alerts
const successAlert = () => {
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
  return [year, month];
};

formSubmit.addEventListener("submit", function (event) {
  event.preventDefault();
  showProgressBar();
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
      hideProgressBar();
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
      errorAlert(err);
    });
});

const downloadFile = (value) => {
  console.log(value);
  const [month, year, _] = value.split(/(\d+)/);
  window.location.href = `/getcsv?param1=${month}&&param2=${year}`;
};
