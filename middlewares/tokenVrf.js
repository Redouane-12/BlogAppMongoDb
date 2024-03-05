const jwt = require("jsonwebtoken");
const secret_key = "2g0j0w091u9w37";
function tokenVrf(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];

    req.token = bearerToken;

    jwt.verify(req.token, secret_key, (err, data) => {
      if (err) {
        return res.redirect("/login");
      }
      req.userId = data.userId;

      next();
    });
  } else {
    return res.redirect("/login");
  }
}
module.exports = tokenVrf;