require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (token) => {
  let toReturn = "";
  if (!token) {
    return { status: "no token" };
  } else {
    jwt.verify(token, "OOGGGGIIIEEEE", (err, decoded) => {
      if (err) {
        toReturn = err;
      } else {
        toReturn = decoded;
      }
    });
  }
  return toReturn;
};
