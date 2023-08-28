const tableBody = document.querySelector("#table-data");
const loading = document.querySelector(".loading-modal");
const container = document.querySelector(".container");

const addData = (data) => {
  console.log(tableBody);
  let count = 0;
  for (val of data) {
    count++;
    tableBody.innerHTML += `<tr class="row100">
<td class="column100 column1" data-column="column1">${count}</td>
<td class="column100 column2" data-column="column2">${val.fileName}</td>
<td class="column100 column3" data-column="column3"><a>${val.Download}</a></td>
</tr>`;
  }
};

const setLoading = (bool) => {
  if (bool) {
    loading.style.display = "block";
    container.style.display = "none";
  } else {
    loading.style.display = "none";
    container.style.display = "block";
  }
};

window.onload = function exampleFunction() {
  const url = "";
  setLoading(true);
  const fetchOptions = {
    method: "GET",
  };
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
};
