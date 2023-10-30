// import axios from "axios";
import axios from "axios";

const BaseUrl = "http://localhost:8090/";
const getToken = () => {
  return localStorage.getItem("token");
};

export const getUsers = async () => {
  let response;
  try {
    const options = {
      Headers: {
        token: getToken(),
      },
    };
    response = await axios.post('http://localhost:8090/adduser');
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  return response;
};
// (async () => await getUsers())();
