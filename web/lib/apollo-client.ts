import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3001/graphql', // ← NestJS 側のURL
    credentials: 'include', // Cookie付きリクエストが必要なら
  }),
  cache: new InMemoryCache(),
});