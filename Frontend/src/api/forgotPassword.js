// import { config } from "./config";

import { config } from "./config";

export const forgetPassword = async (email) => {
  const formData = new FormData();
  formData.append("email", email);
  let data;
  try {
    const response = await fetch(config.url + "forgetpassword", {
      method: "POST",

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

export const resetPassword = async (
  email,
  token,
  newPassword,
  confirmPassword
) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("token", token);
  formData.append("newPassword", newPassword);
  formData.append("confirmPassword", confirmPassword);
  let data;
  try {
    const response = await fetch(config.url + "resetpassword", {
      method: "POST",

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

// const email = 'ahaziq526@gmail.com';
// const token = '955a496e7f7d892be4bbf46df869'
// const newPassword = 'ahmed123';
// const confirmPassword = 'ahmed123';
// resetPassword(email,token,newPassword,confirmPassword)
//   .then((response) => {
//     // Handle the response from the function
//     console.log('Password reset request response:', response);
//   })
//   .catch((error) => {
//     // Handle any errors that occurred during the request
//     console.error('Error:', error);
//   });
