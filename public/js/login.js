let api = "http://localhost:3000/";
let form = document.getElementById("login-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let email = form.email.value;
  let password = form.password.value;
  // validate client
  // if else
  // tự làm :)))
  // coi như đã validate xong ở client

  let data = {
    email,
    password,
  };
  fetch(api + "auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("helskafjalsk");
      if (data.status === "success") {
        window.location.href = "/";
      }
    })
    .catch((err) => console.log(err));
});
