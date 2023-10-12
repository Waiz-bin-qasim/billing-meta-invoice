const loginForm = document.getElementById("login-form");
const errorContainer = document.getElementById("error-container");
const loading = document.querySelector(".loading-modal");
const container = document.querySelector(".container");

const setLoading = (bool) => {
  if (bool) {
    loading.style.display = "block";
    loading.style.backgroundColor = "#f0f8fe";
    container.style.display = "none";
  } else {
    loading.style.display = "none";
    loading.style.backgroundColor = "#fff";
    container.style.display = "block";
  }
};

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);
  if (!email || !password) {
    errorContainer.textContent = "Please fill in all fields.";
    return;
  }
  errorContainer.textContent = "";
  try {
    setLoading(true);
    const response = await fetch("/", {
      method: "POST",
      body: formData,
    });
    console.log(response);
    const data = await response.json();
    setLoading(false);
    console.log(data.token);
    if (response.ok && data.token) {
      console.log(data.roleName);
      localStorage.setItem("token", data.token);
      console.log(data.token);
      document.cookie = `token=${data.token}`;
      if (data.roleName === "admin") {
        return (window.location.href = "/downloadcsv");
      } else if (data.roleName === "finance") {
        return (window.location.href = "/finance/reports");
      }
    } else {
      errorContainer.textContent = data.message;
    }
  } catch (err) {
    setLoading(false);
    console.log(err);
    errorContainer.textContent = "Incorrect Credentials";
  }
});
