module.exports.logout = (req, res) => {
  res.clearCookie("userId", { signed: true });
  res.status(200).json({
    message: "kkkkkkk",
  });
};
