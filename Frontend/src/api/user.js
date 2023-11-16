import { config, getToken } from "./config";

export const getUser = async () => {
  let data;
  try {
    const response = await fetch(config.url + "adduser", {
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

export const getRole = async () => {
  let data;
  try {
    const response = await fetch(config.url + "displayrole", {
      method: "GET",
      headers: {
        token: getToken,
      },
    });
    data = await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
  return data;
};

export const userPOST = async (
  firstName,
  lastName,
  email,
  password,
  roleId
) => {
  const formData = new FormData();
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("roleId", roleId);
  let data;
  try {
    console.log(config.url);
    const response = await fetch(config.url + "adduser", {
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

export const deleteUser = async (user) => {
  let data;
  try {
    const response = await fetch(config.url + "adduser?" + `user=${user}`, {
      method: "DELETE",
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

export const updateUser = async (username, Columns, Values) => {
  let data;
  try {
    const formdata = new FormData();
    formdata.append("username", username);
    Columns.forEach((element, index) => {
      if (Values[index] == undefined || Values[index] === "") {
        console.log(element);
      } else {
        formdata.append("columns[]", element);
      }
    });
    Values.forEach((element) => {
      if (element == undefined || element === "") {
      } else {
        formdata.append("values[]", element);
      }
    });
    console.log(Columns, Values);
    const response = await fetch(config.url + "adduser", {
      method: "PATCH",
      headers: {
        token: getToken,
      },
      body: formdata,
    });
    data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
  return data;
};

export const getOneUser = async (email) => {
  let data;
  try {
    const response = await fetch(config.url + "user/" + email, {
      method: "GET",
      headers: {
        token: getToken,
      },
    });
    data = await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
  return data;
};
