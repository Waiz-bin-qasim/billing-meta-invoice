import { config, getToken } from "./config";

export const financeReportsGet = async () => {
  let data;
  try {
    const response = await fetch(config.url + "finance/reports", {
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

export const financeReportsPOST = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  let data;
  try {
    console.log(config.url);
    const response = await fetch(config.url + `finance/upload`, {
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

export const financeReportsDownload = async (value) => {
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
    data = await fetch("${config.url}/getpdf?param1=${month}&&param2=${year}", {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
        token: getToken,
      },
    });
    const blob = await data.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.download = value + ".pdf";
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

export const financeReportsDelete = async (filename) => {
  let data;
  try {
    const response = await fetch(config.url + "finance/reports", {
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
