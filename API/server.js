const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const RootQueryType = require("./queries/root-query");
const RootMutationType = require("./mutations/root-mutation");
const { GraphQLSchema } = require("graphql");
const server = express();

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

server.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

module.exports = server;
