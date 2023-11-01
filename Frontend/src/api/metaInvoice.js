import { config, getToken } from "./config";

export const metaInvoiceGet = async () => {
  let data;
  try {
    const response = await fetch(config.url + "upload", {
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

export const metaInvoicePOST = async (parserChoice, file) => {
  const formData = new FormData();
  formData.append("parserChoice", parserChoice);
  formData.append("file", file);
  let data;
  try {
    console.log(config.url);
    const response = await fetch(config.url, {
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

export const metaInvoiceDownload = async (month, year) => {
  let data;
  try {
    const response = await fetch(
      config.url + "getpdf?" + `param1=${month}&&param2=${year}`,
      {
        method: "GET",
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
