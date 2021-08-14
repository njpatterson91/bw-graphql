const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");
const DBModel = require("../models/db-model");
const UserType = require("../Types/Users");
const PlantType = require("../Types/Plants");
const bcrypt = require("bcryptjs");
const verifyToken = require("../middleware/verifyToken");
const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addUser: {
      type: UserType,
      description: "Add a user",
      args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        telephone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const hash = bcrypt.hashSync(args.password, 10);

        const newUser = {
          username: args.username,
          password: hash,
          telephone: args.telephone,
        };
        return DBModel.createUser(newUser);
      },
    },
    addPlant: {
      type: PlantType,
      description: "Add a plant",
      args: {
        nickname: { type: GraphQLNonNull(GraphQLString) },
        species: { type: GraphQLNonNull(GraphQLString) },
        h2oFrequency: { type: GraphQLNonNull(GraphQLString) },
        jwt: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const status = verifyToken(args.jwt);
        const newPlant = {
          userID: status.id,
          nickname: args.nickname,
          species: args.species,
          h2oFrequency: args.h2oFrequency,
        };

        const data = await DBModel.createPlant(newPlant);
        console.log(data);
        return data;
      },
    },
    updatePlant: {
      type: PlantType,
      description: "Updates existing plant",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        userID: { type: GraphQLNonNull(GraphQLInt) },
        nickname: { type: GraphQLNonNull(GraphQLString) },
        species: { type: GraphQLNonNull(GraphQLString) },
        h2oFrequency: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const newPlant = {
          userID: args.userID,
          nickname: args.nickname,
          species: args.species,
          h2oFrequency: args.h2oFrequency,
        };
        return DBModel.updatePlant(args.id, newPlant);
      },
    },
  }),
});

module.exports = RootMutationType;
