function redirect() {
  console.log("Hello");
  window.open("./login-view.html", "_self");
}
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const btn = document.querySelector("#login_btn");
btn.addEventListener("click", (e) => {
  //   redirect();
  if (!email.value || !password.value) {
    return window.alert("Invalid Credintials");
  }
  const body = {
    email: email.value,
    password: password.value,
  };
  fetch("http://localhost:8000/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data.message) {
        return alert(data.message);
      }
      localStorage.setItem("auth", JSON.stringify(data));
      redirect();
    })
    .catch((err) => console.log(err));
});
