const loginForm = document.getElementById("login-form");
const errorContainer = document.getElementById("error-container");

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    errorContainer.textContent = "Please fill in all fields.";
    return;
  }
  errorContainer.textContent = "";
  try {
    const response = await fetch("http://127.0.0.1:8090/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password: password }),
    });
    const data = await response.json();
    console.log(data.token);
    if (response.ok && data.token) {
      document.cookie = `${data.token}; Expires=Mon, 28 Aug 2023 22:32:52 GMT; Max-Age=3600; HttpOnly; Path=/`
      localStorage.setItem("token", data.token);
      return (window.location.href = "http://127.0.0.1:8090/upload");
    } else {
      errorContainer.textContent = data.message;
    }
  } catch (err) {
    console.log(err);
    errorContainer.textContent = err.message;
  }
});
