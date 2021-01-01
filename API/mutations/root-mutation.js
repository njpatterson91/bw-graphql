const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");
const TestModel = require("../models/db-model");
const UserType = require("../Types/Users");
const PlantType = require("../Types/Plants");
const bcrypt = require("bcryptjs");
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
        return TestModel.createUser(newUser);
      },
    },
    addPlant: {
      type: PlantType,
      description: "Add a plant",
      args: {
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
        return TestModel.createPlant(newPlant);
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
        return TestModel.updatePlant(args.id, newPlant);
      },
    },
  }),
});

module.exports = RootMutationType;
