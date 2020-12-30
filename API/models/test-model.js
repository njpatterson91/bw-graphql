const db = require("../../data/dbConfig");

module.exports = {
  getAll,
  create,
};

function getAll() {
  const users = db("users");
  return users;
}
async function create(data) {
  await db("users").insert(data);
  return data;
}
