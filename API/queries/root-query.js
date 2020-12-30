const { GraphQLObjectType, GraphQLList } = require("graphql");
const TestModel = require("../models/db-model");

const UserType = require("../Types/Users");
const PlantType = require("../Types/Plants");

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
  }),
});

module.exports = RootQueryType;
