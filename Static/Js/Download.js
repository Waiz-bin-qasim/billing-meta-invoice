const tableRow = document.querySelector("table");
const loading = document.querySelector(".loading-modal");
const container = document.querySelector(".con");
let dataSet;

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

// const setLoading = (bool) => {
//   if (bool) {
//     loading.style.display = "block";
//     container.style.display = "none";
//   } else {
//     loading.style.display = "none";
//     container.style.display = "";
//   }
// };

window.onload = function fetchData() {
  const url = "http://127.0.0.1:8090/files";
  // setLoading(true);
  const fetchOptions = {
    method: "GET",
  };
  fetch(url, fetchOptions)
    .then(async (res) => {
      if (res.ok) {
        dataSet = await res.json();
        console.log(dataSet);
        populateDataTable(dataSet);
      }
      // setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      dataSet = ["helloworld ", "helloworld"];
      populateDataTable(dataSet);
      // setLoading(false);
    });
};



const populateDataTable = (Data) => {
  $("#example").DataTable({
    columns: [{ title: "File Name" }, { title: "File Name" }],
    data: Data,
  });
};
