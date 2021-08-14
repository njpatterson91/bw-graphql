const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");
const DBModel = require("../models/db-model");
const UserType = require("../Types/Users");
const PlantType = require("../Types/Plants");
const token = require("../middleware/makeToken");
const bcrypt = require("bcryptjs");
const verifyToken = require("../middleware/verifyToken");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      description: "List of Users",
      resolve: async () => {
        const users = await DBModel.getAllUsers();
        return users;
      },
    },
    plants: {
      type: new GraphQLList(PlantType),
      description: "List of all plants",
      args: {
        jwt: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const status = verifyToken(args.jwt);
        if (status == "failed") {
          return [{ message: "invalid token" }];
        } else {
          const plants = await DBModel.getAllPlants(status.id);
          return plants;
        }
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
        const user = await DBModel.getByUsername(args.username);
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
