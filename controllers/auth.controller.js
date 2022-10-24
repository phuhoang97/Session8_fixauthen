const db = require("../models/db");
const bcrypt = require("bcrypt");
module.exports.renderRegister = (req, res) => {
  res.send("<h1>This is register page</h1>");
};

module.exports.renderLogin = (req, res) => {
  res.render("login");
};

module.exports.login = (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      message: "Invalid email or password",
    });
  }

  db.execute("SELECT * FROM tbl_users WHERE email = ?", [email])
    .then((data) => {
      let [rows] = data;
      let find = rows[0];
      if (!find) {
        res.status(404).json({
          message: "User is not exist",
        });
      } else {
        // check password
        let passValid = bcrypt.compareSync(password, find.password);
        console.log(passValid);
        console.log(find.password);

        if (!passValid) {
          res.status(404).json({
            message: "Wrong password",
          });
        } else {
          res.cookie("userId", find.id, { signed: true });
          res.status(200).json({
            status: "success",
            message: "Login successfully",
          });
          // điều hướng người dùng sang trang "/"

          // set heaers
          // res.redirect // not working after set cookie
          // res.redirect not working after res.cookie (google)
        }
      }
    })
    .catch((err) => console.log(err));
};

module.exports.logout = (req, res) => {
  // Clear cookie
  res.clearCookie("userId", {
    signed: true,
  });
  //  res.clearCookie()
  res.status(200).json({
    message: "Logout successfully",
  });
  // Logout successfully (JSON)
  // Front-end take message and redirect
};

// Authentication (xac thuc)
// Session (Phien dang nhap)
// Cookie
// Token (JWT - Json web token, Bearer, ...)

// Authentication with Session [Cookie, JWT...] (ExpressJS)
