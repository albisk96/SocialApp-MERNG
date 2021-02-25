import { ApolloServer, PubSub } from "apollo-server";

import { connect } from "./config/db.js";

import resolvers from "./graphql/resolvers/index.js";
import { typeDefs } from "./graphql/typeDefs.js";

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

connect();

server
  .listen({ port: 5000 })
  .then((res) => console.log(`Server running at ${res.url} `));
