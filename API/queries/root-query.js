const { GraphQLObjectType, GraphQLList } = require("graphql");
const TestModel = require("../models/test-model");

const UserType = require("../Types/Users");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      description: "List of Users",
      resolve: async () => {
        const users = await TestModel.getAll();
        return users;
      },
    },
  }),
});

module.exports = RootQueryType;
