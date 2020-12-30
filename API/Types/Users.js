const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "Users",
  description: "This represents a user",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    username: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    telephone: { type: GraphQLNonNull(GraphQLString) },
    message: { type: GraphQLString },
  }),
});

module.exports = UserType;
