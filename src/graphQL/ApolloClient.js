import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';

const link = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
