const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const TestModel = require("../models/db-model");
const UserType = require("../Types/Users");
const PlantType = require("../Types/Plants");

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
        const newUser = {
          username: args.username,
          password: args.password,
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
  }),
});

module.exports = RootMutationType;
