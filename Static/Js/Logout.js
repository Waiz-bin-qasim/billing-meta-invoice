const handleLogout = () => {
  localStorage.clear();
  document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  sessionStorage.clear();
  window.location.href = "/";
};

window.onload = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
  }
  console.log(History);
};
