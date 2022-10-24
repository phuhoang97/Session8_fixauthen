module.exports.requireAuth = (req, res, next) => {
  if (Object.keys(req.signedCookies).length === 0) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

module.exports.notRequireAuth = (req, res, next) => {
  if (Object.keys(req.signedCookies).length !== 0) {
    res.redirect("/");
  } else {
    next();
  }
};
