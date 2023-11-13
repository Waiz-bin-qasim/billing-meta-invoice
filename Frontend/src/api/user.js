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
    const concatenatedColumns = Columns.map((value) => `columns=${value}`).join(
      "&&"
    );
    const concatenatedValues = Values.map((value) => `columns=${value}`).join(
      "&&"
    );
    const response = await fetch(
      config.url +
        "adduser?" +
        `username=${username}` +
        "&&" +
        concatenatedColumns +
        "&&" +
        concatenatedValues,
      {
        method: "PATCH",
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
