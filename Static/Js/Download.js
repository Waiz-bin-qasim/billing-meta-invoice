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
  console.log(data);
  let count = 0;
  for (val of data) {
    tableRow.innerHTML += `<td>${count + 1}</td>
    <td>${val}</td>
    <td><button class = "btn" onclick = "downloadFile(this.value)" value = ${val}>Download</button></td>`;
    count++;
  }
};

window.onload = function fetchData() {
  const url = "http://127.0.0.1:8090/files";
  setLoading(true);
  const fetchOptions = {
    method: "GET",
  };
  fetch(url, fetchOptions)
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        addData(data);
        setLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      const data = ["helloworld ", "helloworld"];
      addData(data);
      setLoading(false);
    });
};

const downloadFile = (value) => {
  const [month, year, _] = value.split(/(\d+)/);
  // const month = "Jun";
  // const year = "23";
  // const url = `http://127.0.0.1:8090/getcsv?param1=${month}&&param2=${year}`;
  // setLoading(true);
  // const fetchOptions = {
  //   method: "GET",
  // };
  // fetch(url, fetchOptions)
  //   .then(async (res) => {
  //     if (res.ok) {
  //       const data = await res.json();
  //       console.log(data);
  //       addData(data);
  //     }
  //     setLoading(false);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     setLoading(false);
  //   });
  window.location.href = `http://127.0.0.1:8090/getcsv?param1=${month}&&param2=${year}`;
};
