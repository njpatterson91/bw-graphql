const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const LoginType = new GraphQLObjectType({
  name: "Users",
  description: "This represents a user",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    username: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    jwt: { type: GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = LoginType;
