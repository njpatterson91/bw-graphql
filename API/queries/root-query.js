const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");
const TestModel = require("../models/db-model");
const UserType = require("../Types/Users");
const PlantType = require("../Types/Plants");
const token = require("../middleware/makeToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      description: "List of Users",
      resolve: async () => {
        const users = await TestModel.getAllUsers();
        return users;
      },
    },
    plants: {
      type: new GraphQLList(PlantType),
      description: "List of all plants",
      resolve: async () => {
        const plants = await TestModel.getAllPlants();
        return plants;
      },
    },
    leTest: {
      type: PlantType,
      description: "you know what it is",
      args: {
        jwt: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const status = verifyToken(args.jwt);
        // console.log(verifyToken(args.jwt));
        return status;
      },
    },
    login: {
      type: UserType,
      description: "Logs a user in",
      args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const user = await TestModel.getByUsername(args.username);
        if (bcrypt.compareSync(args.password, user.password)) {
          user.jwt = token(user);
        } else {
          console.log("whoops");
        }
        console.log;
        return user;
      },
    },
  }),
});

module.exports = RootQueryType;
