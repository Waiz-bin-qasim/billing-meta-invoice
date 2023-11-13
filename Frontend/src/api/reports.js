import { config, getToken } from "./config";

export const reportsGet = async () => {
  let data;
  try {
    const response = await fetch(config.url + "downloadcsv", {
      method: "GET",
      headers: {
        token: getToken,
      },
    });
    data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
  return data;
};

export const reportsPOST = async (parserChoice, file) => {
  const formData = new FormData();
  formData.append("parserChoice", parserChoice);
  formData.append("file", file);
  let data;
  try {
    console.log(config.url);
    const response = await fetch(config.url + `/upload`, {
      method: "POST",
      headers: {
        token: getToken,
      },

      body: formData,
    });
    data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
  return data;
};

export const reportsDownload = async (value) => {
  let data;
  try {
    console.log(value);
    const [month, year, _] = value.split(/(\d+)/);
    // const response = await fetch(
    //   config.url + "getpdf?" + `param1=${month}&&param2=${year}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       token: getToken,
    //     },
    //   }
    // );
    // data = await response.json();
    // console.log(data);
    // window.location.href = `${config.url}/getpdf?param1=${month}&&param2=${year}`;
    data = await fetch(`${config.url}/getcsv?param1=${month}&&param2=${year}`, {
      method: "GET",
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        token: getToken,
      },
    });
    const blob = await data.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));

    const link = document.createElement("a");
    link.href = url;
    link.download = value + ".xlsx";

    document.body.appendChild(link);

    link.click();

    link.parentNode.removeChild(link);
    link.click();
  } catch (error) {
    console.log(error);
    throw error;
  }
  return data;
};
export const reportsDelete = async (filename) => {
  let data;
  try {
    const [month, year, _] = filename.split(/(\d+)/);
    console.log(month, year);
    const response = await fetch(
      config.url + `reports?param1=${month}&&param2=${year}`,
      {
        method: "DELETE",
        headers: {
          token: getToken,
        },
      }
    );
    data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
  return data;
};

export const generateReport = async (val) => {
  let response;
  try {
    console.log(val);
    const [year, month] = parseDate(val);
    const url = config.url + `generatecsv?param1=${month}&&param2=${year}`;
    const fetchOptions = {
      method: "POST",
      headers: {
        token: getToken,
      },
    };
    response = await fetch(url, fetchOptions);
    console.log(response);
    if (response.ok) {
      return response.json;
    }
    throw "an error occured";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const parseDate = (val) => {
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
  let [year, month] = val.split("-");
  month = monthNames[parseInt(month - 1)];
  console.log(month);
  return [year, month];
};
