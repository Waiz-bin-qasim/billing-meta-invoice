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
  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (data.error) {
    errorContainer.textContent = data.error;
  } else {
    window.location.href = "/upload";
  }
});
