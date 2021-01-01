const db = require("../../data/dbConfig");

module.exports = {
  getAllUsers,
  getAllPlants,
  createUser,
  createPlant,
  updatePlant,
};

function getAllUsers() {
  const users = db("users");
  return users;
}
async function createUser(data) {
  await db("users").insert(data);
  return data;
}

function getAllPlants() {
  const plants = db("plants");
  return plants;
}

async function createPlant(data) {
  await db("plants").insert(data);
  return data;
}

async function updatePlant(id, data) {
  await db("plants").update(data);
  return data;
}
