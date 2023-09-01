const tableRow = document.querySelector("table");
const loading = document.querySelector(".loading-modal");
const container = document.querySelector(".con");

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

const setLoading = (bool) => {
  if (bool) {
    loading.style.display = "block";
    container.style.display = "none";
  } else {
    loading.style.display = "none";
    container.style.display = "";
  }
};

const addData = (data) => {
  console.log(tableRow);
  let count = 0;
  for (val of data) {
    count++;
    tableRow.innerHTML += `<td>${count}</td>
    <td>${val.fileName}</td>
    <td><button class = "btn">Download</button></td>`;
  }
};

window.onload = function fetchData() {
  const url = "";
  setLoading(true);
  const fetchOptions = {
    method: "GET",
  };
  setTimeout(() => {
    fetch(url, fetchOptions)
      .then((res) => {
        if (res.ok) {
          const data = res.json();
          addData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        const data = [
          { fileName: "helloworld", Download: "Link" },
          { fileName: "helloworld", Download: "Link" },
        ];
        addData(data);
        setLoading(false);
      });
  }, 5000);
};
