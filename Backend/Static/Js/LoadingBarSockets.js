const progressBar = document.querySelector("#progress");
const progressBarContainer = document.querySelector(".container");
const progressBarPara = document.querySelector("p");
const progressBarHeader = document.querySelector(".container header");
const form = document.querySelector("#login-form");
let socketId;

const showProgressBar = (value) => {
  form.style.display = "none";
  progressBar.style.display = "block";
  document.querySelector(".progress-container ").style.display = "block";
  progressBarContainer.style.height = "256px";
  // progressBarPara.style.display = "none";
  progressBarHeader.innerText = value;
};

const hideProgressBar = (value) => {
  form.style.display = "block";
  document.querySelector(".progress-container ").style.display = "none";
  progressBar.style.display = "none";
  progressBarContainer.style.height = "";
  // progressBarPara.style.display = "";
  progressBarHeader.innerText = value;
};

const updateProgressBar = (value) => {
  const span = document.querySelector("#progressBar");
  span.style.width = value + "%";
  span.innerHTML = value + "%";
};

const initSocketsToAutoUpdateProgressBar = () => {
  const socket = io();
  socket.connect("/");

  socket.on("connect", () => {
    console.log("connected");
    socketId = socket.id;
    console.log(socketId);
  });
  return socket;
};
