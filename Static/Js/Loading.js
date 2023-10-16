const sideBar = document.querySelector(".sidebar");
const section = document.querySelector("section");
const myLink = document.getElementsByTagName("a");
const loading = document.querySelector(".loading-modal");

for (let index = 0; index < myLink.length; index++) {
  myLink[index].onclick = function (event) {
    debugger;
    event.preventDefault(); // Prevent the default behavior (navigating to the link)
    const link = myLink[index].getAttribute("href");
    console.log(link);
    loading.style.display = "block";
    loading.style.backgroundColor = "#f0f8fe";
    sideBar.style.display = "none";
    section.style.display = "none";
    if (link === null) {
      localStorage.clear();
      document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      sessionStorage.clear();
      window.location.href = "/";
      return;
    }
    document.location.href = link;
  };
}
