const signupbtn = document.querySelector("#signup");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

signupbtn.addEventListener("click", (e) => {
  //   window.location.replace("./login-edit.html");
  if (!email.value || !password.value) return alert("Enter all credentials");
  fetch(`https://auth-3vba.onrender.com/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.value, password: password.value }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("auth", JSON.stringify(data));
      window.open("./login-edit.html", "_self");
    });
});
