const name = document.querySelectorAll(".username");
const bio = document.querySelector("#bio");
const phno = document.querySelector("#phno");
const email = document.querySelector("#email");
const avatar = document.querySelectorAll(".avatarimg");
const editbtn = document.querySelector("#edit_btn");
const user = JSON.parse(localStorage.getItem("auth"));

name.forEach((item) => {
  item.textContent = user.name;
});
avatar.forEach((item) => {
  item.setAttribute("src", user.avatar);
});
bio.textContent = user.bio ? user.bio : "-";
phno.textContent = user.phone ? user.phone : "-";
email.textContent = user.email;

editbtn.addEventListener("click", () => {
  window.open("./login-edit.html", "_self");
});
