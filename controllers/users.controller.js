const db = require("../models/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
let strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

module.exports.getAll = (req, res) => {
  db.execute("SELECT * FROM tbl_users")
    .then((data) => {
      let [rows, cols] = data;
      // array destructuring
      // let rows = data[0];
      // let cols = data[1];
      res.render("users", {
        data: rows,
      });
    })
    .catch((err) => console.log(err));
};

module.exports.getById = (req, res) => {
  let id = req.params.id;
  db.execute("SELECT * FROM tbl_users WHERE id = ?", [id])
    .then((data) => {
      let [rows] = data;

      res.status(200).json({
        data: rows[0],
      });
    })
    .catch((err) => console.log(err));
};

module.exports.createUser = (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      message: "Invalid email or password",
    });
  }

  if (!strongRegex.test(password)) {
    return res.status(500).json({
      message: "Password is not strong enough",
    });
  }

  // generate password and id
  password = bcrypt.hashSync(password, saltRounds);
  let id = Math.floor(Math.random() * 1000000);

  // execute SQL query
  db.execute("SELECT * FROM tbl_users WHERE email = ?", [email])
    .then((data) => {
      let [rows] = data;
      // 1 mảng chứa 1 phần tử nếu tìm thấy user
      // [] nếu không tìm thấy
      if (rows.length > 0) {
        return Promise.reject("User already exist");
      } else {
        return db.execute("INSERT INTO tbl_users VALUES(?, ?, ?, ?, ?, ?, ?)", [
          id,
          null,
          null,
          email,
          null,
          null,
          password,
        ]);
      }
    })
    .then((data) => {
      return res.status(200).json({
        message: "create one successfully",
      });
      // redirect (/login) thay vì trả về json message
    })
    .catch((err) => {
      return res.status(500).json({
        err: err,
      });
    });
};

module.exports.updateUser = (req, res) => {
  let { id } = req.params;
  // let id = req.params.id;
  let { name, username, website, phone } = req.body;
  db.execute(
    "UPDATE tbl_users SET name = ?, username = ?, website = ?, phone = ? WHERE id = ?",
    [name, username, website, phone, id]
  )
    .then((data) => {
      console.log(data);
      res.status(200).json({
        message: "update one successfully",
      });
    })
    .catch((err) => console.log(err));
};

module.exports.deleteUser = (req, res) => {
  let { id } = req.params;
  db.execute("DELETE FROM tbl_users WHERE id = ?", [id])
    .then((data) => {
      console.log(data);
      res.status(200).json({
        message: "delete one successfully",
      });
    })
    .catch((err) => console.log(err));
};
