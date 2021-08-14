const db = require("../../data/dbConfig");

module.exports = {
  getAllUsers,
  getAllPlants,
  createUser,
  createPlant,
  updatePlant,
  getByUsername,
};

function getAllUsers() {
  const users = db("users");
  return users;
}
async function createUser(data) {
  await db("users").insert(data);
  return data;
}

function getAllPlants(id) {
  const plants = db("plants").where("userID", id);
  return plants;
}

async function createPlant(data) {
  await db("plants").insert(data);
  return data;
}

async function updatePlant(id, data) {
  await db("plants").where("id", id).update(data);
  return data;
}

async function getByUsername(name) {
  const user = await db("users").where("username", name).first();
  return user;
}
