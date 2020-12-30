const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");

const TestModel = require("../models/test-model");
const UserType = require("../Types/Users");

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
        return TestModel.create(newUser);
      },
    },
  }),
});

module.exports = RootMutationType;
