const loginForm = document.getElementById("login-form");
const errorContainer = document.getElementById("error-container");
const loading = document.querySelector(".loading-modal");
const container = document.querySelector(".container");

const setLoading = (bool) => {
  if (bool) {
    loading.style.display = "block";
    container.style.display = "none";
  } else {
    loading.style.display = "none";
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
    const response = await fetch("http://127.0.0.1:8090/login", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setLoading(false);
    console.log(data.token);
    if (response.ok && data.token) {
      localStorage.setItem("token", data.token);
      console.log(data.token);
      document.cookie = `token=${data.token}`;
      return (window.location.href = "http://127.0.0.1:8090/downloadcsv");
    } else {
      errorContainer.textContent = data.message;
    }
  } catch (err) {
    setLoading(false);
    console.log(err);
    errorContainer.textContent = err.message;
  }
});
