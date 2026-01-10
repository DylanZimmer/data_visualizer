import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import GraphQLJSON from 'graphql-type-json';

let datasets = {};
let nextId = 1;

const typeDefs = `
  scalar JSON

  type Dataset {
    id: ID!
    name: String!
    rows: JSON!
  }

  type Query {
    dataset(id: ID!): Dataset
  }

  type Mutation {
    uploadDataset(name: String!, rows: JSON!): Dataset!
  }
`;

const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    dataset: (_, { id }) => datasets[id] ?? null,
  },
  Mutation: {
    uploadDataset: (_, { name, rows }) => {
      const id = String(nextId++);
      const dataset = { id, name, rows };
      datasets[id] = dataset;
      return dataset;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 GraphQL ready at ${url}`);
