const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const PlantType = new GraphQLObjectType({
  name: "Plants",
  description: "This represents a users plant",
  fields: () => ({
    userID: { type: GraphQLNonNull(GraphQLInt) },
    id: { type: GraphQLNonNull(GraphQLInt) },
    nickname: { type: GraphQLNonNull(GraphQLString) },
    species: { type: GraphQLNonNull(GraphQLString) },
    h2oFrequency: { type: GraphQLNonNull(GraphQLString) },
    message: { type: GraphQLString },
    jwt: { type: GraphQLString },
  }),
});

module.exports = PlantType;
