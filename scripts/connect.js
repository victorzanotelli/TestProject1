function openForm() {
  document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

let fopen = document.querySelector(".open-button");
fopen.addEventListener("click", openForm);
