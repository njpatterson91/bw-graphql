require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT || "OOGGGGIIIEEEE";

module.exports = (token) => {
  let toReturn = "";
  if (!token) {
    return { status: "no token" };
  } else {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        toReturn = "failed";
      } else {
        toReturn = decoded;
      }
    });
  }
  return toReturn;
};
