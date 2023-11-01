import { config, getToken } from "./config";

export const getDashboard = async (month, year) => {
  let data;
  try {
    const response = await fetch(
      config.url + "displaydashboard?" + `month=${"Sep"}&&year=${year}`,
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
