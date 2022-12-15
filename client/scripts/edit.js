const usernameHeader = document.querySelector(".username");
const avatar = document.querySelector(".avatarimg");
const input_username = document.querySelector(".input_username");
const bio = document.querySelector("#bio");
const phno = document.querySelector("#phno");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const user_avt = document.querySelector("#user_avt");

let user;

function refresh() {
  user = JSON.parse(localStorage.getItem("auth"));
  usernameHeader.textContent = user.name ? user.name : "";
  avatar.setAttribute("src", user.avatar);
  user_avt.setAttribute("src", user.avatar);
  input_username.value = user.name ? user.name : "";
  bio.value = user.bio ? user.bio : "";
  phno.value = user.phone ? user.phone : "";
  email.value = user.email;
  password.value = user.OrignalPassword ? user.OrignalPassword : "";
}

refresh();

function handleChange() {
  const body = {
    email: email.value,
    phone: phno.value,
    password: password.value,
    bio: bio.value,
    name: input_username.value,
    uid: user.uid,
    avatar: user_avt.getAttribute("src"),
  };
  fetch("http://localhost:8000/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("auth", JSON.stringify(data));
      refresh();
      redirect("./login-view.html");
    })
    .catch((err) => console.err(err));
}

function redirect(path) {
  window.open(path, "_self");
}
