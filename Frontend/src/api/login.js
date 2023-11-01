import { config } from "./config";

export const login = async (username, password) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  let data;
  try {
    console.log(config.url);
    const response = await fetch(config.url, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      data = await response.json();
      console.log(data);
      const expires = new Date("2100-01-01");
      expires.toUTCString();
      localStorage.setItem("token", data.token);
      localStorage.setItem("roleName", data.roleName);
      document.cookie = `token=${data.token}; expires=${expires}; path=/; `;
      return (window.location.href = "/admin/default");
    } else {
      throw {
        message: "Incorrect Credentials",
      };
    }
  } catch (error) {
    // console.log(error);
    throw error;
  }
  return data;
};
