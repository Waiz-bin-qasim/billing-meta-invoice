$("#example").DataTable({});

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

const downloadFile = (value) => {
  console.log(value);
  const [month, year, _] = value.split(/(\d+)/);
  window.location.href = `/finance/upload?param1=${month}&&param2=${year}`;
};
