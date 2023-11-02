import { config, getToken } from "./config";


export const getDashboard = async(month,year)=>{
    let data;
  try {
    month = 'Sep';
    year = '2023'
    const response = await fetch(config.url + 'displaydashboard?' +`month=${month}&&year=${year}`, {
        method: "GET",
        headers:{
          token: getToken
        }
      });
        data = await response.json();
        console.log(data)
        
  } catch (error) {
        console.log(error);
        throw error
  }
  return data;
}